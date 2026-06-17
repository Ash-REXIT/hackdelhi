import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import useMetaTags from '../hooks/useMetaTags';

export default function PrivacyPolicy() {
  useMetaTags(
    'How We Keep Your Information Safe | 60 Plus India',
    'We promise to keep your parents\' health details and personal information private and safe. Read here to see how we protect your family\'s data.',
    'privacy policy, data safety, medical record privacy'
  );
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={styles.page}>
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />
      <div style={styles.container}>
        <div style={styles.docHeader}>
          <h1 style={styles.docTitle}>Privacy Policy</h1>
          <p style={styles.docIntro}>
            60Plus India ("60Plus," "we," "us," or "our") values your privacy. This Privacy Policy explains how we collect, use, store, share, and protect your personal information when you visit our website, submit an enquiry, book or use our services, communicate with us, or otherwise interact with us.
          </p>
          <p style={styles.docIntro}>
            By using our website or services, you agree to this Privacy Policy. If you do not agree, please do not use our website or services.
          </p>
          <div style={styles.divider} />
        </div>

        <Section title="1. Who We Are">
          <p><strong>Business Name:</strong> NURA AI LABS PRIVATE LIMITED</p>
          <p><strong>Registered Address:</strong> Nura AI Labs (Incubated at ITEL), Plot No. 22, Rajalakshmi Nagar, 3rd Main Road, Velachery, Chennai – 600 042, Tamil Nadu, India.</p>
          <p><strong>Email:</strong> <a href="mailto:reach@nurahub.com" style={styles.link}>reach@nurahub.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
          <p>If you have questions about this Privacy Policy or your personal information, you may contact us using the details above.</p>
        </Section>

        <Section title="2. Scope of This Policy">
          <p>This Privacy Policy applies to personal information collected through:</p>
          <ul style={styles.list}>
            <li>our website</li>
            <li>booking forms and consultation forms</li>
            <li>payment and checkout flows</li>
            <li>email, phone, WhatsApp, and support interactions</li>
            <li>appointment scheduling and service coordination</li>
            <li>subscriptions, memberships, packages, and recurring plans</li>
            <li>any other official communication or service channel operated by us</li>
          </ul>
          <p>This Privacy Policy should be read together with our Terms &amp; Conditions.</p>
        </Section>

        <Section title="3. Information We Collect">
          <p>We may collect the following categories of information:</p>

          <h3 style={styles.subsectionTitle}>A. Identity and Contact Information</h3>
          <ul style={styles.list}>
            <li>full name</li>
            <li>patient name</li>
            <li>age or date of birth, where necessary</li>
            <li>email address</li>
            <li>phone number</li>
            <li>WhatsApp number</li>
            <li>postal address</li>
            <li>city, state, pin code</li>
            <li>emergency contact details</li>
            <li>caregiver or family representative details</li>
          </ul>

          <h3 style={styles.subsectionTitle}>B. Service and Booking Information</h3>
          <ul style={styles.list}>
            <li>service requested</li>
            <li>appointment details</li>
            <li>booking history</li>
            <li>care preferences</li>
            <li>location for service delivery</li>
            <li>communications regarding scheduling, rescheduling, cancellation, and fulfilment</li>
          </ul>

          <h3 style={styles.subsectionTitle}>C. Payment and Transaction Information</h3>
          <p><strong>Important:</strong> We do not store your full card details, CVV, or complete banking credentials on our systems unless expressly stated and lawfully permitted. Payments are processed through authorized third-party payment partners.</p>
          <ul style={styles.list}>
            <li>order or booking ID</li>
            <li>payment amount</li>
            <li>payment status</li>
            <li>payment method</li>
            <li>transaction reference number</li>
            <li>invoice details</li>
          </ul>

          <h3 style={styles.subsectionTitle}>D. Health or Care-Related Information</h3>
          <p>Where relevant to providing or coordinating services, we may collect limited health, wellness, mobility, support, or care-related information that you or your authorized representative provide to us, including:</p>
          <ul style={styles.list}>
            <li>basic care needs</li>
            <li>symptoms or service requirements shared during booking</li>
            <li>mobility or accessibility requirements</li>
            <li>patient condition details reasonably required for coordination of service</li>
          </ul>
          <p>You should provide only the information necessary for us to deliver or coordinate the requested service.</p>

          <h3 style={styles.subsectionTitle}>E. Technical and Usage Information</h3>
          <p>When you use our website, we may automatically collect:</p>
          <ul style={styles.list}>
            <li>IP address</li>
            <li>browser type</li>
            <li>device type</li>
            <li>operating system</li>
            <li>pages visited</li>
            <li>time spent on pages</li>
            <li>referral source</li>
            <li>approximate location based on IP</li>
            <li>cookies and session identifiers</li>
          </ul>

          <h3 style={styles.subsectionTitle}>F. Communication Records</h3>
          <p>We may keep records of:</p>
          <ul style={styles.list}>
            <li>emails</li>
            <li>customer support requests</li>
            <li>call logs</li>
            <li>WhatsApp or chat messages</li>
            <li>complaints, feedback, and dispute-resolution communications</li>
          </ul>
        </Section>

        <Section title="4. How We Collect Information">
          <p>We collect information:</p>
          <ul style={styles.list}>
            <li>directly from you when you fill out a form, make a booking, request a consultation, contact us, or make a payment</li>
            <li>from the patient or authorized representative</li>
            <li>from caregivers or family members acting on behalf of a patient</li>
            <li>from our service partners or providers, where necessary to coordinate a booked service</li>
            <li>automatically through cookies, analytics tools, and standard website technologies</li>
            <li>from payment gateway partners regarding payment status and transaction confirmation</li>
          </ul>
        </Section>

        <Section title="5. How We Use Your Information">
          <p>We may use your personal information for the following purposes:</p>

          <h3 style={styles.subsectionTitle}>A. To Provide and Coordinate Services</h3>
          <ul style={styles.list}>
            <li>to receive and process enquiries</li>
            <li>to create and manage bookings</li>
            <li>to coordinate consultations, visits, care support, or related services</li>
            <li>to communicate appointment details and service updates</li>
            <li>to provide customer support</li>
          </ul>

          <h3 style={styles.subsectionTitle}>B. To Process Payments and Transactions</h3>
          <ul style={styles.list}>
            <li>to confirm orders and payments</li>
            <li>to generate invoices and receipts</li>
            <li>to manage refunds, cancellations, and disputes</li>
            <li>to detect suspicious or unauthorized transactions</li>
          </ul>

          <h3 style={styles.subsectionTitle}>C. To Improve Operations and Service Quality</h3>
          <ul style={styles.list}>
            <li>to understand demand, service performance, and operational issues</li>
            <li>to improve our website, service delivery, workflows, and support</li>
            <li>to maintain internal records and audit trails</li>
          </ul>

          <h3 style={styles.subsectionTitle}>D. To Communicate With You</h3>
          <ul style={styles.list}>
            <li>to respond to enquiries</li>
            <li>to send service confirmations, reminders, updates, and support messages</li>
            <li>to notify you about changes to our policies or services</li>
            <li>to send marketing or promotional communications only where permitted or where you have opted in</li>
          </ul>

          <h3 style={styles.subsectionTitle}>E. To Protect Rights and Prevent Misuse</h3>
          <ul style={styles.list}>
            <li>to prevent fraud, abuse, misuse, spam, and unauthorized activity</li>
            <li>to investigate complaints or disputes</li>
            <li>to protect our customers, personnel, partners, systems, and legal rights</li>
          </ul>

          <h3 style={styles.subsectionTitle}>F. To Comply With Law</h3>
          <ul style={styles.list}>
            <li>to comply with applicable legal, regulatory, tax, accounting, law-enforcement, or contractual obligations</li>
          </ul>
        </Section>

        <Section title="6. Basis on Which We Process Information">
          <p>Depending on the nature of the interaction, we may process your information because:</p>
          <ul style={styles.list}>
            <li>it is necessary to provide or coordinate the service you requested</li>
            <li>you provided consent</li>
            <li>it is necessary to communicate with you regarding your booking or enquiry</li>
            <li>it is necessary for payment processing, fraud prevention, or record-keeping</li>
            <li>it is required under applicable law</li>
            <li>it is necessary for our legitimate operational, safety, support, or compliance purposes, to the extent permitted by law</li>
          </ul>
        </Section>

        <Section title="7. Consent">
          <p>When you provide personal information for a booking, consultation request, transaction, service coordination, or support request, you consent to our using that information for that purpose.</p>
          <p>Where we rely on consent for optional communications, marketing, or particular data uses, you may withdraw that consent at any time by contacting us.</p>
          <p>Withdrawal of consent does not affect processing already carried out lawfully before withdrawal and may affect our ability to provide certain services where the information is necessary for service delivery.</p>
        </Section>

        <Section title="8. Information Shared on Behalf of a Patient">
          <p>If you provide personal or care-related information about a patient, parent, family member, or dependent, you represent that you are authorized to do so and that the information provided is accurate to the best of your knowledge.</p>
        </Section>

        <Section title="9. How We Share Information">
          <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>

          <h3 style={styles.subsectionTitle}>A. With Service Providers and Operational Partners</h3>
          <p>We may share information with our employees, contractors, partner professionals, logistics or coordination teams, and service providers only to the extent necessary to deliver, support, or coordinate the requested service.</p>

          <h3 style={styles.subsectionTitle}>B. With Payment Partners</h3>
          <p>Payments may be processed through third-party payment gateways, banks, or payment service providers. These third parties may receive transaction-related information necessary to process the payment, confirm the status, handle reversals, and manage fraud checks.</p>

          <h3 style={styles.subsectionTitle}>C. With Technology and Support Vendors</h3>
          <p>We may use third-party vendors for hosting, analytics, messaging, customer support, scheduling, CRM, or communications infrastructure. They receive access only as needed to perform services for us.</p>

          <h3 style={styles.subsectionTitle}>D. With Regulators, Law Enforcement, or Legal Authorities</h3>
          <p>We may disclose information if required by law, court order, lawful government request, or where necessary to protect rights, safety, or legal claims.</p>

          <h3 style={styles.subsectionTitle}>E. Business Transfers</h3>
          <p>If our business is reorganized, merged, acquired, or transferred, information may be transferred as part of that transaction, subject to applicable law.</p>
        </Section>

        <Section title="10. Payment Gateway and Third-Party Websites">
          <p>Our website may integrate with or redirect you to third-party services, including payment gateways and other service platforms. Once you leave our website or submit data to a third-party service, that party's own privacy policy and terms apply.</p>
          <p>We encourage you to review the privacy policies of payment gateways and third-party platforms before completing a transaction.</p>
        </Section>

        <Section title="11. Cookies and Similar Technologies">
          <p>We may use cookies, session tools, analytics tools, and similar technologies to:</p>
          <ul style={styles.list}>
            <li>keep the website functioning properly</li>
            <li>remember user preferences</li>
            <li>understand traffic and usage</li>
            <li>improve performance and user experience</li>
            <li>secure sessions and detect suspicious activity</li>
          </ul>
          <p>You can control cookies through your browser settings. Disabling cookies may affect website functionality.</p>
        </Section>

        <Section title="12. Analytics">
          <p>We may use analytics tools such as Google Analytics or similar services to understand website traffic, user behavior, and performance. These tools may collect technical and usage data such as page views, session duration, device type, and referral source.</p>
          <p>These tools help us improve our website and service experience.</p>
        </Section>

        <Section title="13. Data Retention">
          <p>We retain personal information only for as long as reasonably necessary for:</p>
          <ul style={styles.list}>
            <li>providing services</li>
            <li>customer support and follow-up</li>
            <li>internal record-keeping</li>
            <li>refunds, disputes, and complaint handling</li>
            <li>tax, audit, accounting, and legal compliance</li>
            <li>fraud prevention and security review</li>
          </ul>
          <p>Retention periods may vary depending on the type of information, the service involved, and legal requirements.</p>
        </Section>

        <Section title="14. Data Security">
          <p>We take reasonable technical, administrative, and organizational measures to protect personal information against unauthorized access, misuse, alteration, disclosure, or destruction.</p>
          <p>These measures may include:</p>
          <ul style={styles.list}>
            <li>SSL or secure transmission protocols</li>
            <li>restricted access controls</li>
            <li>password and system security practices</li>
            <li>vendor access limitations</li>
            <li>operational review and monitoring</li>
          </ul>
          <p>However, no method of transmission or storage is completely secure. We therefore cannot guarantee absolute security.</p>
        </Section>

        <Section title="15. Cross-Border Storage or Processing">
          <p>Some of our service providers, vendors, analytics providers, messaging tools, or payment partners may store or process information outside your state or country. Where this happens, we will seek to ensure that the information is handled with reasonable safeguards and in accordance with applicable law.</p>
        </Section>

        <Section title="16. Your Rights">
          <p>Subject to applicable law, you may have the right to:</p>
          <ul style={styles.list}>
            <li>request access to the personal information we hold about you</li>
            <li>request correction of inaccurate or incomplete information</li>
            <li>request deletion of information where deletion is legally permitted</li>
            <li>withdraw consent for certain processing</li>
            <li>object to or restrict certain uses, where applicable</li>
            <li>opt out of promotional communications</li>
          </ul>
          <p>To exercise any of these rights, contact us using the details in this Policy. We may need to verify your identity before acting on your request.</p>
        </Section>

        <Section title="17. Marketing Communications">
          <p>We may send you service-related messages without separate marketing consent where necessary for bookings, transactions, reminders, support, and customer care.</p>
          <p>We will send promotional or marketing communications only where permitted by law or where you have opted in. You may opt out of marketing messages at any time using the unsubscribe option or by contacting us.</p>
        </Section>

        <Section title="18. Children and Minors">
          <p>Our services are not intended to be independently contracted online by children. Where information relating to a minor is provided in connection with a service, it must be provided by a parent, guardian, or authorized representative.</p>
        </Section>

        <Section title="19. Sensitive Information">
          <p>Please do not send us more medical or sensitive personal information than is reasonably necessary for the requested service. Where sensitive or care-related information is shared with us, you acknowledge that it is being shared for the purpose of enabling, coordinating, supporting, or assessing the requested service.</p>
        </Section>

        <Section title="20. Complaints and Grievances">
          <p>If you have a complaint regarding privacy, data use, or misuse of your information, please contact us first so we can investigate and respond.</p>
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>Privacy / Grievance Contact:</strong></p>
            <p style={styles.contactLine}>60Plus India</p>
            <p style={styles.contactLine}>Nura AI Labs  (Incubated at ITEL),<br /> Plot No. 22,<br />
        Rajalakshmi Nagar, 3rd Main Road,<br />
        Velachery, Chennai – 600 042,<br />
        Tamil Nadu, India.</p>
            <p style={styles.contactLine}>Email: <a href="mailto:reach@nurahub.com" style={styles.link}>reach@nurahub.com</a></p>
            <p style={styles.contactLine}>Phone: <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
          </div>
        </Section>

        <Section title="21. Changes to This Privacy Policy">
          <p>We may update this Privacy Policy from time to time. The latest version will always be posted on this page with the revised effective date. Your continued use of our website or services after any update constitutes acceptance of the revised Policy, to the extent permitted by law.</p>
        </Section>

        <Section title="22. Contact Us" isLast>
          <p>If you would like to access, correct, update, or request deletion of your information, or if you have any questions about this Privacy Policy, please contact:</p>
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>60Plus India</strong></p>
            <p style={styles.contactLine}>Nura AI Labs  (Incubated at ITEL),<br /> Plot No. 22,<br />
        Rajalakshmi Nagar, 3rd Main Road,<br />
        Velachery, Chennai – 600 042,<br />
        Tamil Nadu, India.</p>
            <p style={styles.contactLine}>Email: <a href="mailto:reach@nurahub.com" style={styles.link}>reach@nurahub.com</a></p>
            <p style={styles.contactLine}>Phone: <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
          </div>
        </Section>

        <div style={styles.footer}>
          <div style={styles.footerLinks}>
            {/* <Link to="/cancellation-refund-policy" style={styles.footerLink}>Cancellation & Refund</Link>
            <Link to="/service-fulfilment-policy" style={styles.footerLink}>Service Fulfilment</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, isLast = false }) {
  const sectionStyle = isLast
    ? { ...styles.section, borderBottom: 'none' }
    : styles.section;

  return (
    <div style={sectionStyle}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.sectionBody}>{children}</div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
    color: '#1a0a2e',
  },
  topBar: {
    borderBottom: '1px solid rgba(130,53,208,0.15)',
    padding: '14px 40px',
    backgroundColor: '#fafafa',
  },
  backLink: {
    fontSize: '14px',
    color: '#8235d0',
    textDecoration: 'none',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
    letterSpacing: '0.01em',
    fontWeight: '700',
  },
  container: {
    maxWidth: '760px',
    margin: '0 auto',
    padding: '56px 24px 40px',
  },
  docHeader: {
    marginBottom: '48px',
  },
  docMeta: {
    fontSize: '12px',
    color: '#888',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  docTitle: {
    fontSize: '46px',
    fontWeight: '500',
    color: '#1a0a2e',
    margin: '0 0 18px 0',
    letterSpacing: '-0.5px',
    lineHeight: 1.2,
    fontFamily: "'Gambarino-Regular', serif",
  },
  docIntro: {
    fontSize: '19px',
    color: 'rgba(26,10,46,0.8)',
    lineHeight: 1.75,
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
    marginBottom: '12px',
  },
  divider: {
    borderTop: '2px solid #8235d0',
    width: '48px',
    marginTop: '4px',
  },
  section: {
    marginBottom: '40px',
    paddingBottom: '40px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a0a2e',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '14px',
  },
  subsectionTitle: {
    fontSize: '19px',
    fontWeight: '700',
    color: '#1a0a2e',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
    marginTop: '18px',
    marginBottom: '8px',
  },
  sectionBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  list: {
    paddingLeft: '20px',
    margin: '4px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
  },
  contactBox: {
    border: '1px solid rgba(130,53,208,0.15)',
    borderRadius: '6px',
    padding: '18px 22px',
    marginTop: '10px',
    backgroundColor: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  contactLine: {
    fontSize: '16px',
    color: '#333',
    margin: '3px 0',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
  },
  link: {
    color: '#8235d0',
    textDecoration: 'underline',
  },
  footer: {
    marginTop: '20px',
    paddingTop: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
    fontSize: '14px',
    color: 'rgba(26,10,46,0.5)',
  },
  footerLinks: {
    display: 'flex',
    gap: '24px',
  },
  footerLink: {
    color: '#8235d0',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '700',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
  },
};