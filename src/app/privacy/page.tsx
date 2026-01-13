import { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Humanly Staffing Inc. collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-4 text-gray-600">Last updated: January 1, 2025</p>

        <div className="mt-12 prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide, including:</p>
          <ul>
            <li>Name, email address, and phone number</li>
            <li>Resume and employment history</li>
            <li>Educational background and certifications</li>
            <li>Professional references</li>
            <li>Social Security Number (for employment verification purposes only)</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>IP address and browser type</li>
            <li>Device information</li>
            <li>Pages visited and time spent on site</li>
            <li>Referring website addresses</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Match candidates with employment opportunities</li>
            <li>Communicate with you about job openings and applications</li>
            <li>Verify your identity and qualifications</li>
            <li>Improve our services and website functionality</li>
            <li>Comply with legal obligations</li>
            <li>Send newsletters and marketing communications (with your consent)</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Potential employers (with your consent)</li>
            <li>Background check providers</li>
            <li>Service providers who assist our operations</li>
            <li>Legal authorities when required by law</li>
          </ul>
          <p>We never sell your personal information to third parties.</p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your
            personal information against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent for data processing</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience on our website.
            You can control cookie settings through your browser preferences.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for
            the privacy practices of these external sites.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for individuals under 18 years of age. We do not
            knowingly collect information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on
            this page with an updated revision date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices,
            please contact us at:
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
