import { LegalPage, LegalSection, LegalSubsection } from "@/components/marketing/LegalPage";

export function RefundContent() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      intro="We stand behind our service with a comprehensive refund policy. Your satisfaction is our priority, and we make returns simple and hassle-free."
      lastUpdated="January 15, 2024"
    >
      <LegalSection heading="1. Refund Eligibility">
        <p>
          We offer a 14-day money-back guarantee for all paid subscriptions. You are eligible for a
          full refund if:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>You request a refund within 14 days of your initial purchase</li>
          <li>You have not violated our Terms of Service</li>
          <li>Your account is in good standing</li>
          <li>You provide a valid reason for the refund request</li>
        </ul>
        <p>
          <strong className="text-rr-text">Note:</strong> Free accounts are not eligible for refunds
          as no payment was made.
        </p>
      </LegalSection>

      <LegalSection heading="2. Refund Process">
        <LegalSubsection heading="How to Request">
          <p>You can request a refund through any of the following methods:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Email us at{" "}
              <a href="mailto:refunds@resumerocket.com" className="text-rr-accent hover:underline">
                refunds@resumerocket.com
              </a>
            </li>
            <li>Use the &quot;Request Refund&quot; option in your account settings</li>
            <li>Contact our support team through live chat</li>
            <li>Call our customer service at +1 (555) 123-4567</li>
          </ul>
        </LegalSubsection>
        <LegalSubsection heading="Required Information">
          <p>When requesting a refund, please provide:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Your account email address</li>
            <li>Order/transaction ID</li>
            <li>Reason for refund request</li>
            <li>Date of purchase</li>
          </ul>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="3. Processing Timeline">
        <LegalSubsection heading="Review Period">
          <p>
            We will review your refund request within 24 hours of submission. Most requests are
            approved automatically if they meet our eligibility criteria.
          </p>
        </LegalSubsection>
        <LegalSubsection heading="Processing Time">
          <p>
            Once approved, refunds are processed within 1-2 business days. The time it takes for the
            refund to appear in your account depends on your payment method:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-rr-text">Credit/Debit Cards:</strong> 3-5 business days
            </li>
            <li>
              <strong className="text-rr-text">PayPal:</strong> 1-2 business days
            </li>
            <li>
              <strong className="text-rr-text">Bank Transfer:</strong> 5-7 business days
            </li>
            <li>
              <strong className="text-rr-text">Digital Wallets:</strong> 1-3 business days
            </li>
          </ul>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="4. Refund Amount">
        <LegalSubsection heading="Full Refund">
          <p>
            You will receive a 100% refund of the amount paid for your subscription. This includes:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Monthly subscription fees</li>
            <li>Annual subscription fees (prorated if applicable)</li>
            <li>Any applicable taxes paid</li>
          </ul>
        </LegalSubsection>
        <LegalSubsection heading="Processing Fees">
          <p>
            We absorb all processing fees associated with refunds. You will not be charged any
            additional fees for processing your refund.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="5. Account Access After Refund">
        <p>Once a refund is processed:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Your paid subscription will be immediately cancelled</li>
          <li>You will lose access to premium features</li>
          <li>Your account will revert to the free plan</li>
          <li>You can download your data for 30 days after the refund</li>
          <li>You may re-subscribe at any time in the future</li>
        </ul>
      </LegalSection>

      <LegalSection heading="6. Exceptions and Special Cases">
        <LegalSubsection heading="Non-Refundable Items">
          <p>The following are not eligible for refunds:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Requests made after the 14-day period</li>
            <li>Accounts terminated for Terms of Service violations</li>
            <li>Fraudulent or chargeback transactions</li>
            <li>Gift subscriptions (refund goes to original purchaser)</li>
          </ul>
        </LegalSubsection>
        <LegalSubsection heading="Partial Refunds">
          <p>
            In exceptional circumstances, we may offer partial refunds for annual subscriptions
            based on unused time. These are evaluated on a case-by-case basis.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="7. Dispute Resolution">
        <p>If you&apos;re not satisfied with our refund decision:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Contact our customer service manager for review</li>
          <li>Provide additional documentation if requested</li>
          <li>We will respond within 48 hours with a final decision</li>
          <li>All decisions are made in good faith and customer satisfaction</li>
        </ul>
      </LegalSection>

      <LegalSection heading="8. Chargebacks and Payment Disputes">
        <p>Before initiating a chargeback with your bank or credit card company:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Please contact us first to resolve the issue</li>
          <li>We can often resolve disputes faster than the chargeback process</li>
          <li>Chargebacks may result in account suspension</li>
          <li>We reserve the right to dispute illegitimate chargebacks</li>
        </ul>
      </LegalSection>

      <LegalSection heading="9. Changes to This Policy">
        <p>
          We may update this refund policy from time to time. Changes will be posted on this page
          with an updated &quot;Last modified&quot; date. Continued use of our service after changes
          constitutes acceptance of the new policy.
        </p>
      </LegalSection>

      <LegalSection heading="10. Contact Information">
        <p>For refund requests or questions about this policy, contact us:</p>
        <div className="rounded-xl bg-rr-bg-elevated p-4">
          <p>
            <strong className="text-rr-text">Refund Email:</strong>{" "}
            <a href="mailto:refunds@resumerocket.com" className="text-rr-accent hover:underline">
              refunds@resumerocket.com
            </a>
            <br />
            <strong className="text-rr-text">Support Email:</strong>{" "}
            <a href="mailto:support@resumerocket.com" className="text-rr-accent hover:underline">
              support@resumerocket.com
            </a>
            <br />
            <strong className="text-rr-text">Phone:</strong> +1 (555) 123-4567
            <br />
            <strong className="text-rr-text">Address:</strong> 123 Innovation Drive, Suite 100, San
            Francisco, CA 94105
            <br />
            <strong className="text-rr-text">Business Hours:</strong> Monday - Friday, 9:00 AM -
            6:00 PM PST
          </p>
        </div>
      </LegalSection>
    </LegalPage>
  );
}
