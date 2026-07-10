import { LegalPage, LegalSection, LegalSubsection } from "@/components/marketing/LegalPage";

export function TermsContent() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="Please read these terms and conditions carefully before using our services. By accessing ResumeRocket, you agree to be bound by these terms."
      lastUpdated="January 15, 2024"
    >
      <LegalSection heading="1. Acceptance of Terms">
        <p>
          By accessing and using ResumeRocket (&quot;the Service&quot;), you accept and agree to be
          bound by the terms and provision of this agreement. If you do not agree to abide by the
          above, please do not use this service.
        </p>
      </LegalSection>

      <LegalSection heading="2. Description of Service">
        <p>
          ResumeRocket provides AI-powered resume optimization services, including but not limited
          to:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Resume analysis and scoring</li>
          <li>ATS (Applicant Tracking System) optimization</li>
          <li>Job-specific resume tailoring</li>
          <li>Cover letter generation</li>
          <li>Career guidance and recommendations</li>
          <li>GitHub project analysis and integration</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. User Accounts and Registration">
        <LegalSubsection heading="Account Creation">
          <p>
            To access certain features of our service, you must register for an account. You agree
            to provide accurate, current, and complete information during the registration process.
          </p>
        </LegalSubsection>
        <LegalSubsection heading="Account Security">
          <p>
            You are responsible for safeguarding your account credentials and for all activities
            that occur under your account. You must notify us immediately of any unauthorized use of
            your account.
          </p>
        </LegalSubsection>
        <LegalSubsection heading="Account Termination">
          <p>
            We reserve the right to terminate or suspend your account at any time for violations of
            these terms or for any other reason at our sole discretion.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="4. Subscription and Payment Terms">
        <LegalSubsection heading="Subscription Plans">
          <p>
            We offer both free and paid subscription plans. Paid subscriptions provide access to
            premium features and enhanced service capabilities.
          </p>
        </LegalSubsection>
        <LegalSubsection heading="Payment Processing">
          <p>
            Payments are processed securely through third-party payment processors. By providing
            payment information, you authorize us to charge the applicable fees.
          </p>
        </LegalSubsection>
        <LegalSubsection heading="Automatic Renewal">
          <p>
            Paid subscriptions automatically renew unless cancelled before the renewal date. You can
            cancel your subscription at any time through your account settings.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="5. User Content and Data">
        <LegalSubsection heading="Content Ownership">
          <p>
            You retain ownership of all content you upload to our service, including resumes, cover
            letters, and personal information.
          </p>
        </LegalSubsection>
        <LegalSubsection heading="License to Use">
          <p>
            By uploading content, you grant us a limited license to use, process, and analyze your
            content solely for the purpose of providing our services.
          </p>
        </LegalSubsection>
        <LegalSubsection heading="Content Standards">
          <p>
            You agree not to upload content that is illegal, harmful, threatening, abusive,
            defamatory, or otherwise objectionable.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="6. Acceptable Use Policy">
        <p>
          You agree not to use our service for any unlawful purpose or in any way that could damage,
          disable, or impair our service. Prohibited activities include:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Attempting to gain unauthorized access to our systems</li>
          <li>Using automated tools to access our service without permission</li>
          <li>Uploading malicious code or viruses</li>
          <li>Interfering with other users&apos; use of the service</li>
          <li>Violating any applicable laws or regulations</li>
          <li>Impersonating others or providing false information</li>
        </ul>
      </LegalSection>

      <LegalSection heading="7. Intellectual Property Rights">
        <LegalSubsection heading="Our Intellectual Property">
          <p>
            The service, including all software, algorithms, designs, and content, is protected by
            copyright, trademark, and other intellectual property laws.
          </p>
        </LegalSubsection>
        <LegalSubsection heading="Limited License">
          <p>
            We grant you a limited, non-exclusive, non-transferable license to use our service in
            accordance with these terms.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="8. Privacy and Data Protection">
        <p>
          Your privacy is important to us. Our collection and use of personal information is
          governed by our Privacy Policy, which is incorporated into these terms by reference.
          Please review our Privacy Policy to understand our practices.
        </p>
      </LegalSection>

      <LegalSection heading="9. Disclaimers and Limitations">
        <LegalSubsection heading="Service Availability">
          <p>
            We strive to maintain high service availability but cannot guarantee uninterrupted
            access. We may temporarily suspend service for maintenance or updates.
          </p>
        </LegalSubsection>
        <LegalSubsection heading="AI-Generated Content">
          <p>
            Our AI-powered recommendations are provided as guidance only. We do not guarantee job
            placement or interview success based on our recommendations.
          </p>
        </LegalSubsection>
        <LegalSubsection heading="Limitation of Liability">
          <p>
            To the maximum extent permitted by law, we shall not be liable for any indirect,
            incidental, special, or consequential damages arising from your use of our service.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="10. Termination">
        <p>Either party may terminate this agreement at any time. Upon termination:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Your access to the service will be immediately suspended</li>
          <li>You may download your data within 30 days of termination</li>
          <li>We may delete your data after the 30-day period</li>
          <li>No refunds will be provided for unused subscription periods</li>
        </ul>
      </LegalSection>

      <LegalSection heading="11. Changes to Terms">
        <p>
          We reserve the right to modify these terms at any time. We will notify users of material
          changes via email or through our service. Continued use of the service after changes
          constitutes acceptance of the new terms.
        </p>
      </LegalSection>

      <LegalSection heading="12. Governing Law and Disputes">
        <p>
          These terms are governed by the laws of the State of California, United States. Any
          disputes arising from these terms or your use of our service will be resolved through
          binding arbitration in accordance with the rules of the American Arbitration Association.
        </p>
      </LegalSection>

      <LegalSection heading="13. Contact Information">
        <p>If you have any questions about these terms and conditions, please contact us:</p>
        <div className="rounded-xl bg-rr-bg-elevated p-4">
          <p>
            <strong className="text-rr-text">Email:</strong>{" "}
            <a href="mailto:legal@resumerocket.com" className="text-rr-accent hover:underline">
              legal@resumerocket.com
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
