import { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Humanly Staffing Inc. website and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
        <p className="mt-4 text-gray-600">Last updated: January 1, 2025</p>

        <div className="mt-12 prose prose-lg max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the {siteConfig.name} website and services, you agree to be
            bound by these Terms of Service. If you do not agree to these terms, please do
            not use our services.
          </p>

          <h2>Description of Services</h2>
          <p>
            {siteConfig.name} provides staffing and recruitment services, connecting job seekers
            with employers. Our services include but are not limited to executive search,
            contract staffing, direct hire placement, and recruitment process outsourcing.
          </p>

          <h2>User Responsibilities</h2>
          <h3>For Job Seekers</h3>
          <ul>
            <li>Provide accurate and truthful information in applications and resumes</li>
            <li>Notify us of any changes to your employment status or availability</li>
            <li>Maintain professional conduct in all interactions with potential employers</li>
            <li>Comply with all applicable employment laws and regulations</li>
          </ul>

          <h3>For Employers</h3>
          <ul>
            <li>Provide accurate job descriptions and requirements</li>
            <li>Comply with all employment and anti-discrimination laws</li>
            <li>Maintain confidentiality of candidate information</li>
            <li>Pay agreed-upon fees in a timely manner</li>
          </ul>

          <h2>Placement Fees and Guarantees</h2>
          <p>
            Employer fees for our services are established through individual service agreements.
            Our standard placement guarantee provides a replacement candidate at no additional
            cost if a placement does not work out within 90 days, subject to the terms of
            your service agreement.
          </p>

          <h2>No Employment Guarantee</h2>
          <p>
            While we work diligently to match candidates with suitable opportunities, we do
            not guarantee employment for any job seeker. Similarly, we do not guarantee that
            employers will find a suitable candidate for every position.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, and software, is the
            property of {siteConfig.name} and is protected by intellectual property laws. You
            may not reproduce, distribute, or create derivative works without our written consent.
          </p>

          <h2>Confidentiality</h2>
          <p>
            We treat all candidate and employer information as confidential. We will not
            disclose your information to third parties without your consent, except as
            required by law or as necessary to provide our services.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {siteConfig.name} shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages arising
            from your use of our services.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {siteConfig.name} and its affiliates from
            any claims, damages, or expenses arising from your use of our services or
            violation of these terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with
            the laws of the State of Wyoming, without regard to its conflict of law provisions.
          </p>

          <h2>Dispute Resolution</h2>
          <p>
            Any disputes arising from these terms or our services shall first be addressed
            through good-faith negotiation. If negotiation fails, disputes shall be resolved
            through binding arbitration in accordance with Wyoming state law.
          </p>

          <h2>Modifications</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Changes will
            be effective immediately upon posting to our website. Continued use of our
            services constitutes acceptance of modified terms.
          </p>

          <h2>Severability</h2>
          <p>
            If any provision of these terms is found to be unenforceable, the remaining
            provisions shall continue in full force and effect.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at:
          </p>
          <p>
            {siteConfig.name}<br />
            {siteConfig.contact.address.full}<br />
            Email: {siteConfig.contact.email}<br />
            Phone: {siteConfig.contact.phone}
          </p>
        </div>
      </div>
    </div>
  );
}
