// Job Aggregator Service
// Combines multiple job APIs into a unified feed

import type { ExternalJob, JobSearchParams, JobApiResponse } from './types';
import { searchAdzunaJobs } from './adzuna';
import { searchUSAJobs } from './usajobs';
import { searchRemotiveJobs } from './remotive';
import { searchArbeitnowJobs } from './arbeitnow';
import { jobs as mockJobs } from '@/data/jobs';
import { supabaseAdmin } from '@/lib/supabase';

// Configuration for which APIs to use
const API_CONFIG = {
  database: { enabled: true, weight: 1.5 }, // Database jobs get highest priority
  adzuna: { enabled: false, weight: 1.0 }, // Disabled - we have DB jobs
  usajobs: { enabled: false, weight: 0.8 }, // Disabled - we have DB jobs
  remotive: { enabled: false, weight: 0.9 }, // Disabled - we have DB jobs
  arbeitnow: { enabled: false, weight: 0.7 }, // Disabled - we have DB jobs
  internal: { enabled: false, weight: 1.2 }, // Disabled - using DB instead
};

// Simple in-memory cache for aggregated results
const jobCache = new Map<string, { data: JobApiResponse; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

function getCacheKey(params: JobSearchParams): string {
  return JSON.stringify(params);
}

// Fetch jobs from database
async function fetchDatabaseJobs(params: JobSearchParams): Promise<ExternalJob[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('your-project')) {
      console.log('Database not configured, skipping DB fetch');
      return [];
    }

    let query = supabaseAdmin
      .from('humanly_jobs')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    // Apply filters
    if (params.query) {
      query = query.or(`title.ilike.%${params.query}%,company.ilike.%${params.query}%,description.ilike.%${params.query}%`);
    }
    if (params.location) {
      query = query.ilike('location', `%${params.location}%`);
    }
    if (params.industry) {
      query = query.eq('industry', params.industry);
    }
    if (params.type) {
      query = query.eq('job_type', params.type);
    }
    if (params.remote) {
      query = query.eq('remote', true);
    }

    const limit = params.limit || 100;
    const page = params.page || 1;
    const offset = (page - 1) * limit;

    query = query.range(offset, offset + limit - 1);

    const { data: jobs, error } = await query;

    if (error) {
      console.error('Database fetch error:', error);
      return [];
    }

    // Convert to ExternalJob format
    return (jobs || []).map(job => ({
      id: `db_${job.id}`,
      source: 'database' as const,
      externalId: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      locationType: job.remote ? 'remote' : 'onsite',
      type: job.job_type || 'full-time',
      salary: job.salary_min && job.salary_max
        ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
        : null,
      salaryMin: job.salary_min,
      salaryMax: job.salary_max,
      currency: 'USD',
      industry: job.industry || 'general',
      description: job.description || '',
      requirements: job.requirements || [],
      benefits: job.benefits || [],
      skills: [],
      applyUrl: `/jobs/${job.id}/apply`,
      companyLogo: null,
      postedDate: job.created_at,
      expiresDate: job.expires_at,
      featured: job.featured || false,
    }));
  } catch (error) {
    console.error('Error fetching database jobs:', error);
    return [];
  }
}

// Convert internal mock jobs to ExternalJob format
function convertMockJobs(): ExternalJob[] {
  return mockJobs.map(job => ({
    id: `internal_${job.id}`,
    source: 'internal' as const,
    externalId: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    locationType: job.location.toLowerCase().includes('remote') ? 'remote' : 'onsite',
    type: job.type,
    salary: job.salary,
    salaryMin: null,
    salaryMax: null,
    currency: 'USD',
    industry: job.industry,
    description: job.description,
    requirements: job.requirements,
    benefits: job.benefits,
    skills: [],
    applyUrl: `/jobs/${job.id}/apply`,
    companyLogo: null,
    postedDate: job.postedDate,
    expiresDate: null,
    featured: job.featured,
  }));
}

// Deduplicate jobs based on title and company similarity
function deduplicateJobs(jobs: ExternalJob[]): ExternalJob[] {
  const seen = new Map<string, ExternalJob>();

  for (const job of jobs) {
    // Create a normalized key for deduplication
    const key = `${job.title.toLowerCase().trim()}_${job.company.toLowerCase().trim()}`;

    if (!seen.has(key)) {
      seen.set(key, job);
    } else {
      // Prefer jobs with more complete data
      const existing = seen.get(key)!;
      const existingScore = (existing.salary ? 1 : 0) + (existing.requirements.length > 0 ? 1 : 0) + (existing.companyLogo ? 1 : 0);
      const newScore = (job.salary ? 1 : 0) + (job.requirements.length > 0 ? 1 : 0) + (job.companyLogo ? 1 : 0);

      if (newScore > existingScore) {
        seen.set(key, job);
      }
    }
  }

  return Array.from(seen.values());
}

// Sort jobs by relevance and recency
function sortJobs(jobs: ExternalJob[], query?: string): ExternalJob[] {
  return jobs.sort((a, b) => {
    // Featured jobs first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // Internal jobs get priority
    if (a.source === 'internal' && b.source !== 'internal') return -1;
    if (a.source !== 'internal' && b.source === 'internal') return 1;

    // If query provided, prioritize title matches
    if (query) {
      const queryLower = query.toLowerCase();
      const aMatches = a.title.toLowerCase().includes(queryLower);
      const bMatches = b.title.toLowerCase().includes(queryLower);
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
    }

    // Sort by posted date (most recent first)
    const dateA = new Date(a.postedDate).getTime();
    const dateB = new Date(b.postedDate).getTime();
    return dateB - dateA;
  });
}

// Main aggregation function
export async function searchAllJobs(params: JobSearchParams = {}): Promise<JobApiResponse> {
  const cacheKey = getCacheKey(params);

  // Check cache
  const cached = jobCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('Returning cached job results');
    return cached.data;
  }

  console.log('Fetching jobs from all APIs...');

  // Fetch from database first (primary source)
  let databaseJobs: ExternalJob[] = [];
  if (API_CONFIG.database.enabled) {
    databaseJobs = await fetchDatabaseJobs(params);
    console.log(`Fetched ${databaseJobs.length} jobs from database`);
  }

  // Fetch from external APIs in parallel (if enabled)
  const apiPromises: Promise<JobApiResponse>[] = [];

  if (API_CONFIG.adzuna.enabled) {
    apiPromises.push(searchAdzunaJobs(params).catch(err => {
      console.error('Adzuna fetch failed:', err);
      return { jobs: [], total: 0, page: 1, totalPages: 0, source: 'adzuna' };
    }));
  }

  if (API_CONFIG.usajobs.enabled) {
    apiPromises.push(searchUSAJobs(params).catch(err => {
      console.error('USAJobs fetch failed:', err);
      return { jobs: [], total: 0, page: 1, totalPages: 0, source: 'usajobs' };
    }));
  }

  if (API_CONFIG.remotive.enabled) {
    apiPromises.push(searchRemotiveJobs(params).catch(err => {
      console.error('Remotive fetch failed:', err);
      return { jobs: [], total: 0, page: 1, totalPages: 0, source: 'remotive' };
    }));
  }

  if (API_CONFIG.arbeitnow.enabled) {
    apiPromises.push(searchArbeitnowJobs(params).catch(err => {
      console.error('Arbeitnow fetch failed:', err);
      return { jobs: [], total: 0, page: 1, totalPages: 0, source: 'arbeitnow' };
    }));
  }

  // Also include internal jobs (if enabled)
  const internalJobs = API_CONFIG.internal.enabled ? convertMockJobs() : [];
  let filteredInternalJobs = internalJobs;

  // Apply filters to internal jobs
  if (params.query) {
    const query = params.query.toLowerCase();
    filteredInternalJobs = filteredInternalJobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
    );
  }

  if (params.location) {
    const loc = params.location.toLowerCase();
    filteredInternalJobs = filteredInternalJobs.filter(job =>
      job.location.toLowerCase().includes(loc)
    );
  }

  if (params.industry) {
    filteredInternalJobs = filteredInternalJobs.filter(job =>
      job.industry === params.industry
    );
  }

  if (params.type) {
    filteredInternalJobs = filteredInternalJobs.filter(job =>
      job.type === params.type
    );
  }

  if (params.remote) {
    filteredInternalJobs = filteredInternalJobs.filter(job =>
      job.locationType === 'remote'
    );
  }

  // Wait for all APIs
  const results = await Promise.all(apiPromises);

  // Combine all jobs - database jobs first (primary source)
  let allJobs = [...databaseJobs, ...filteredInternalJobs];
  let totalCount = databaseJobs.length + filteredInternalJobs.length;

  for (const result of results) {
    allJobs = allJobs.concat(result.jobs);
    totalCount += result.total;
  }

  // Log source distribution
  const sourceCount: Record<string, number> = {};
  for (const job of allJobs) {
    sourceCount[job.source] = (sourceCount[job.source] || 0) + 1;
  }
  console.log('Jobs by source:', sourceCount);

  // Deduplicate and sort
  allJobs = deduplicateJobs(allJobs);
  allJobs = sortJobs(allJobs, params.query);

  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 50;
  const startIndex = (page - 1) * limit;
  const paginatedJobs = allJobs.slice(startIndex, startIndex + limit);

  const response: JobApiResponse = {
    jobs: paginatedJobs,
    total: allJobs.length,
    page,
    totalPages: Math.ceil(allJobs.length / limit),
    source: 'aggregated',
  };

  // Cache the results
  jobCache.set(cacheKey, { data: response, timestamp: Date.now() });

  return response;
}

// Get featured jobs for homepage
export async function getFeaturedJobs(limit: number = 12): Promise<ExternalJob[]> {
  const response = await searchAllJobs({ limit: 100 });

  // Get featured jobs first, then fill with recent jobs
  const featured = response.jobs.filter(j => j.featured);
  const recent = response.jobs.filter(j => !j.featured);

  return [...featured, ...recent].slice(0, limit);
}

// Get jobs by industry
export async function getJobsByIndustry(industry: string, limit: number = 20): Promise<ExternalJob[]> {
  const response = await searchAllJobs({ industry, limit });
  return response.jobs;
}

// Get job statistics
export async function getJobStats(): Promise<{
  totalJobs: number;
  byIndustry: Record<string, number>;
  byType: Record<string, number>;
  bySource: Record<string, number>;
}> {
  const response = await searchAllJobs({ limit: 500 });

  const stats = {
    totalJobs: response.total,
    byIndustry: {} as Record<string, number>,
    byType: {} as Record<string, number>,
    bySource: {} as Record<string, number>,
  };

  for (const job of response.jobs) {
    stats.byIndustry[job.industry] = (stats.byIndustry[job.industry] || 0) + 1;
    stats.byType[job.type] = (stats.byType[job.type] || 0) + 1;
    stats.bySource[job.source] = (stats.bySource[job.source] || 0) + 1;
  }

  return stats;
}

// Clear the cache (useful for manual refresh)
export function clearJobCache(): void {
  jobCache.clear();
  console.log('Job cache cleared');
}
