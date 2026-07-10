import { LegalPage, LegalSection, LegalSubsection } from "@/components/marketing/LegalPage";

export function PrivacyContent() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="We're committed to protecting your privacy and being transparent about how we collect, use, and protect your personal information."
      lastUpdated="January 15, 2024"
    >
      <LegalSection heading="1. Information We Collect">
        <LegalSubsection heading="Personal Information">
          <p>
            We collect information you provide directly to us, such as when you create an account,
            upload your resume, or contact us for support. This includes:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Name, email address, and contact information</li>
            <li>Resume content and career information</li>
            <li>Payment information (processed securely by our payment providers)</li>
            <li>Communication preferences and support inquiries</li>
          </ul>
        </LegalSubsection>
        <LegalSubsection heading="Usage Information">
          <p>
            We automatically collect certain information about your use of our services, including:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Device information and browser type</li>
            <li>IP address and location data</li>
            <li>Usage patterns and feature interactions</li>
            <li>Performance and error logs</li>
          </ul>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="2. How We Use Your Information">
        <p>
          We use the information we collect to provide, maintain, and improve our services.
          Specifically, we use your information to:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Analyze and optimize your resume content</li>
          <li>Provide personalized job recommendations and career advice</li>
          <li>Process payments and manage your subscription</li>
          <li>Send you important updates about our services</li>
          <li>Provide customer support and respond to your inquiries</li>
          <li>Improve our AI algorithms and service quality</li>
          <li>Ensure security and prevent fraud</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Information Sharing and Disclosure">
        <p>
          We do not sell, trade, or otherwise transfer your personal information to third parties.
          We may share your information only in the following circumstances:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-rr-text">Service Providers:</strong> With trusted third-party
            service providers who assist us in operating our platform
          </li>
          <li>
            <strong className="text-rr-text">Legal Requirements:</strong> When required by law or to
            protect our rights and safety
          </li>
          <li>
            <strong className="text-rr-text">Business Transfers:</strong> In connection with a
            merger, acquisition, or sale of assets
          </li>
          <li>
            <strong className="text-rr-text">With Your Consent:</strong> When you explicitly
            authorize us to share your information
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. Data Security">
        <p>
          We implement industry-standard security measures to protect your personal information:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>End-to-end encryption for data transmission</li>
          <li>Secure data storage with regular backups</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Access controls and employee training on data protection</li>
          <li>Compliance with SOC 2 Type II standards</li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Your Rights and Choices">
        <p>You have several rights regarding your personal information:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-rr-text">Access:</strong> Request a copy of the personal
            information we hold about you
          </li>
          <li>
            <strong className="text-rr-text">Correction:</strong> Update or correct inaccurate
            personal information
          </li>
          <li>
            <strong className="text-rr-text">Deletion:</strong> Request deletion of your personal
            information
          </li>
          <li>
            <strong className="text-rr-text">Portability:</strong> Request a copy of your data in a
            portable format
          </li>
          <li>
            <strong className="text-rr-text">Opt-out:</strong> Unsubscribe from marketing
            communications
          </li>
        </ul>
        <p>
          To exercise these rights, please contact us at{" "}
          <a href="mailto:privacy@resumerocket.com" className="text-rr-accent hover:underline">
            privacy@resumerocket.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="6. Cookies and Tracking">
        <p>We use cookies and similar tracking technologies to enhance your experience:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-rr-text">Essential Cookies:</strong> Required for basic site
            functionality
          </li>
          <li>
            <strong className="text-rr-text">Analytics Cookies:</strong> Help us understand how you
            use our services
          </li>
          <li>
            <strong className="text-rr-text">Preference Cookies:</strong> Remember your settings and
            preferences
          </li>
        </ul>
        <p>You can control cookie settings through your browser preferences.</p>
      </LegalSection>

      <LegalSection heading="7. International Data Transfers">
        <p>
          Your information may be transferred to and processed in countries other than your own. We
          ensure appropriate safeguards are in place to protect your data in accordance with this
          privacy policy and applicable laws.
        </p>
      </LegalSection>

      <LegalSection heading="8. Children's Privacy">
        <p>
          Our services are not intended for children under 13 years of age. We do not knowingly
          collect personal information from children under 13. If you become aware that a child has
          provided us with personal information, please contact us immediately.
        </p>
      </LegalSection>

      <LegalSection heading="9. Changes to This Policy">
        <p>
          We may update this privacy policy from time to time. We will notify you of any material
          changes by posting the new policy on this page and updating the &quot;Last updated&quot;
          date. We encourage you to review this policy periodically.
        </p>
      </LegalSection>

      <LegalSection heading="10. Contact Us">
        <p>
          If you have any questions about this privacy policy or our privacy practices, please
          contact us:
        </p>
        <div className="rounded-xl bg-rr-bg-elevated p-4">
          <p>
            <strong className="text-rr-text">Email:</strong>{" "}
            <a href="mailto:privacy@resumerocket.com" className="text-rr-accent hover:underline">
              privacy@resumerocket.com
            </a>
            <br />
            <strong className="text-rr-text">Address:</strong> 123 Innovation Drive, Suite 100, San
            Francisco, CA 94105
            <br />
            <strong className="text-rr-text">Phone:</strong> +1 (555) 123-4567
          </p>
        </div>
      </LegalSection>
    </LegalPage>
  );
}
