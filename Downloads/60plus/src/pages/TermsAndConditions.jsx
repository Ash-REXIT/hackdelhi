import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import useMetaTags from '../hooks/useMetaTags';

export default function TermsAndConditions() {
  useMetaTags(
    'Our Simple Service Rules | 60 Plus India',
    'This page explains how we provide our services. We keep our rules simple so you know exactly how we look after your family and your health.',
    'service rules, 60 plus india terms, care agreement'
  );
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={styles.page}>
      <Breadcrumb items={[{ label: "Terms & Conditions" }]} />
      <div style={styles.container}>
        <div style={styles.docHeader}>
          <h1 style={styles.docTitle}>Terms &amp; Conditions</h1>
          <p style={styles.docIntro}>
            These Terms &amp; Conditions ("Terms") govern your access to and use of the website, mobile interfaces, communication channels, and services made available by 60Plus India ("60Plus," "we," "us," or "our").
          </p>
          <p style={styles.docIntro}>
            By accessing our website, booking a service, making a payment, registering an account, subscribing to a plan, or otherwise using our services, you agree to be bound by these Terms, our Privacy Policy, and our Cancellation, Rescheduling &amp; Refund Policy. If you do not agree, do not use our website or services.
          </p>
          <div style={styles.divider} />
        </div>

        <Section title="1. About Us">
          <p>60Plus India provides senior care support, care coordination, wellness support services, and, where applicable, facilitation and scheduling of consultations, visits, assessments, or related support services through our internal team and/or independent partner professionals and service providers.</p>
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>Registered Business Name:</strong>NURA AI LABS PRIVATE LIMITED</p>
            <p style={styles.contactLine}><strong>Registered Address:</strong>Nura AI Labs (Incubated at ITEL), Plot No. 22, Rajalakshmi Nagar, 3rd Main Road, Velachery, Chennai – 600 042, Tamil Nadu, India.</p>
            <p style={styles.contactLine}><strong>Email:</strong> <a href="mailto:reach@nurahub.com" style={styles.link}>reach@nurahub.com</a></p>
            <p style={styles.contactLine}><strong>Phone:</strong> <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
          </div>
        </Section>

        <Section title="2. Eligibility">
          <p>You may use our website and services only if:</p>
          <ul style={styles.list}>
            <li>you are at least 18 years old and legally capable of entering into a binding contract; or</li>
            <li>you are using the services on behalf of a patient, family member, dependent, or another person with valid authority to do so.</li>
          </ul>
          <p>You agree that all information provided by you is true, complete, and up to date.</p>
        </Section>

        <Section title="3. Scope of Services">
          <p>60Plus may offer, directly or through partner providers, services including but not limited to:</p>
          <ul style={styles.list}>
            <li>senior care support and coordination</li>
            <li>home visit coordination</li>
            <li>consultations, assessments, and wellness support</li>
            <li>care plans, subscriptions, or service packages</li>
            <li>appointment scheduling and related support services</li>
          </ul>
          <p>The exact nature, scope, timing, pricing, and availability of services may vary by city, provider availability, patient condition, service category, and operational constraints.</p>
          <p>Nothing on the website shall be interpreted as a guarantee that every listed service is available at all times or in all locations.</p>
        </Section>

        <Section title="4. No Emergency Service">
          <p>Our platform and services are <strong>not emergency services</strong>. If you believe a patient is experiencing a medical emergency, immediately contact local emergency services or go to the nearest hospital.</p>
        </Section>

        <Section title="5. Independent Professional Judgment">
          <p>Where services are rendered by doctors, nurses, therapists, care staff, diagnostic providers, or other professionals, such professionals remain responsible for their own professional judgment, advice, and conduct within the scope of applicable law and professional standards.</p>
          <p>60Plus may facilitate scheduling, coordination, communication, collection, and support, but does not override or control the independent medical or professional judgment of licensed providers.</p>
        </Section>

        <Section title="6. User Responsibilities">
          <p><strong>You agree to:</strong></p>
          <ul style={styles.list}>
            <li>provide accurate patient, booking, and contact information</li>
            <li>disclose material facts relevant to service delivery</li>
            <li>ensure that the patient and/or authorized representative is available at the scheduled time</li>
            <li>maintain respectful conduct toward our staff, partner providers, and support teams</li>
            <li>comply with all instructions reasonably required for safe service delivery</li>
            <li>use the website and services only for lawful purposes</li>
          </ul>
          <p><strong>You must not:</strong></p>
          <ul style={styles.list}>
            <li>misuse the platform</li>
            <li>submit false or misleading information</li>
            <li>interfere with platform security or functionality</li>
            <li>make fraudulent bookings or payments</li>
            <li>use abusive, threatening, defamatory, or unlawful language or conduct toward our staff or providers</li>
          </ul>
        </Section>

        <Section title="7. Bookings and Service Requests">
          <p>A booking or service request is treated as confirmed only after:</p>
          <ul style={styles.list}>
            <li>required information has been received,</li>
            <li>applicable payment or authorization has been completed, and</li>
            <li>we issue a confirmation by website, app, email, SMS, WhatsApp, phone, or other official communication channel.</li>
          </ul>
          <p>We reserve the right to decline, reschedule, modify, or cancel a booking where necessary due to provider unavailability, incomplete information, operational limitations, safety concerns, suspected fraud, legal restrictions, force majeure events, or other legitimate reasons.</p>
        </Section>

        <Section title="8. Pricing">
          <p>All prices displayed on the website or otherwise communicated by us are in <strong>Indian Rupees </strong> or <strong>USD</strong> unless expressly stated otherwise.</p>
          <p>Pricing may vary depending on:</p>
          <ul style={styles.list}>
            <li>service type</li>
            <li>duration</li>
            <li>location</li>
            <li>provider category</li>
            <li>urgency</li>
            <li>add-on services</li>
            <li>taxes and statutory levies</li>
            <li>subscription plan or package terms</li>
          </ul>
          <p>Applicable taxes, government levies, platform fees, or convenience fees, if any, will be disclosed at or before checkout.</p>
        </Section>

        <Section title="9. Payments">
          <p>Payments may be collected through third-party payment gateways, banking partners, UPI, cards, net banking, links, recurring mandates, or other approved payment methods.</p>
          <p><strong>By making a payment, you:</strong></p>
          <ul style={styles.list}>
            <li>authorize the applicable payment transaction</li>
            <li>confirm that you are legally entitled to use the chosen payment instrument</li>
            <li>agree to pay all charges, taxes, and applicable fees disclosed at checkout or otherwise agreed with us</li>
          </ul>
          <p>Payment authorization does not by itself guarantee service completion. Service remains subject to confirmation, provider availability, and these Terms.</p>
        </Section>

        <Section title="10. Recurring Plans and Auto-Renewals">
          <p>If you enroll in a recurring subscription, membership, package, or auto-renewal plan:</p>
          <ul style={styles.list}>
            <li>you authorize us or our payment partner to charge the recurring amount as disclosed at sign-up</li>
            <li>the billing frequency, plan benefits, and renewal terms will be displayed at the time of subscription</li>
            <li>you may cancel future renewals before the next billing date in accordance with the applicable plan rules</li>
            <li>cancellation of auto-renewal prevents future billing but does not automatically entitle you to a refund for the current billing cycle unless expressly stated in the applicable refund policy or required by law</li>
          </ul>
        </Section>

        <Section title="11. Cancellation, Rescheduling, and Refunds">
          <p>All cancellations, rescheduling requests, failed service cases, duplicate payments, and refunds are governed by the policy set forth in Section 25 of these Terms.</p>
        </Section>

        <Section title="12. Service Fulfilment and Timelines">
          <p>Service timing is subject to operational conditions, provider availability, location, patient readiness, traffic, weather, and unforeseen events. Any time slot or ETA is an estimate unless explicitly guaranteed in writing.</p>
          <p>We will make commercially reasonable efforts to deliver services within the confirmed slot or revised slot communicated to you.</p>
        </Section>

        <Section title="13. Third-Party Providers and Tools">
          <p>Our services may involve third-party providers, communication channels, software tools, logistics support, diagnostic partners, payment gateways, or other service partners. We are not responsible for the independent policies, systems, downtime, or acts/omissions of third parties except to the extent required by law.</p>
        </Section>

        <Section title="14. Accuracy of Website Information">
          <p>We try to ensure that all information on the website is accurate and current. However, website content may contain errors, omissions, or outdated information relating to services, pricing, availability, or descriptions. We reserve the right to correct, update, suspend, or withdraw content or services without prior notice.</p>
        </Section>

        <Section title="15. Intellectual Property">
          <p>All content on the website, including text, graphics, logos, designs, service marks, software, media, and brand elements, is owned by or licensed to 60Plus and is protected by applicable intellectual property laws.</p>
          <p>You may not copy, reproduce, distribute, modify, reverse engineer, publish, or commercially exploit any content without our prior written permission.</p>
        </Section>

        <Section title="16. Privacy">
          <p>Your use of the website and services is also governed by our Privacy Policy. By using our services, you consent to the collection, use, storage, and disclosure of information as described in that policy.</p>
        </Section>

        <Section title="17. Disclaimers">
          <p>To the fullest extent permitted by law:</p>
          <ul style={styles.list}>
            <li>the website and services are provided on an "as is" and "as available" basis</li>
            <li>we do not guarantee uninterrupted, error-free, or always-available service</li>
            <li>we do not guarantee that every service will be suitable for every user or patient</li>
            <li>informational content on the website is for general informational purposes only and does not replace a direct professional evaluation where required</li>
          </ul>
        </Section>

        <Section title="18. Limitation of Liability">
          <p>To the fullest extent permitted by law, 60Plus, its affiliates, directors, officers, employees, contractors, agents, and partners shall not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages, including loss of profits, loss of data, business interruption, or loss arising out of or related to:</p>
          <ul style={styles.list}>
            <li>use or inability to use the website or services</li>
            <li>delays, rescheduling, or service interruptions</li>
            <li>actions or omissions of independent third-party providers</li>
            <li>unauthorized access, system failures, or third-party technical issues</li>
          </ul>
          <p>Nothing in these Terms excludes liability that cannot be excluded under applicable law.</p>
        </Section>

        <Section title="19. Indemnity">
          <p>You agree to indemnify and hold harmless 60Plus, its affiliates, personnel, and partners from claims, liabilities, losses, damages, costs, and expenses arising out of:</p>
          <ul style={styles.list}>
            <li>your breach of these Terms</li>
            <li>false information submitted by you</li>
            <li>your misuse of the website or services</li>
            <li>your violation of applicable law or third-party rights</li>
          </ul>
        </Section>

        <Section title="20. Suspension or Termination">
          <p>We may suspend, restrict, or terminate access to the website or services, or refuse a booking or user, at our discretion, where we reasonably believe there is:</p>
          <ul style={styles.list}>
            <li>fraud or payment risk</li>
            <li>abuse or misuse</li>
            <li>legal or compliance risk</li>
            <li>safety risk</li>
            <li>repeated cancellation or operational disruption</li>
            <li>breach of these Terms</li>
          </ul>
        </Section>

        <Section title="21. Force Majeure">
          <p>We shall not be liable for failure or delay caused by events beyond our reasonable control, including natural disasters, strikes, disease outbreaks, provider disruptions, transport failures, internet outages, government action, civil unrest, or other force majeure events.</p>
        </Section>

        <Section title="22. Governing Law and Jurisdiction">
          <p>These Terms shall be governed by the laws of India. Subject to applicable law, courts located in Chennai, Tamil Nadu shall have exclusive jurisdiction over disputes arising out of or relating to these Terms or our services.</p>
        </Section>

        <Section title="23. Changes to These Terms">
          <p>We may update these Terms from time to time. The revised version will be posted on this page with the updated effective date. Continued use of the website or services after such update constitutes acceptance of the revised Terms.</p>
        </Section>

        <Section title="25. Cancellation, Rescheduling &amp; Refund Policy">
          <p>We aim to provide fair and transparent cancellation and refund handling. Refund outcomes depend on:</p>
          <ul style={styles.list}>
            <li>the nature of the service booked</li>
            <li>whether the service was scheduled, assigned, or already initiated</li>
            <li>whether a provider was dispatched or time was reserved</li>
            <li>whether the request concerns duplicate payment, technical failure, provider unavailability, or customer cancellation</li>
            <li>applicable law and payment partner rules</li>
          </ul>

          <h3 style={styles.subsectionTitle}>A. Rescheduling by Customer</h3>
          <p>Customers may request a reschedule by contacting us through our official support channels.</p>

          <p><strong>Standard rule:</strong></p>
          <ul style={styles.list}>
            <li><strong>Reschedule request made at least 6 hours before the scheduled service time:</strong> one reschedule is permitted at no additional charge, subject to provider availability.</li>
            <li><strong>Reschedule request made less than 6 hours before the scheduled service time:</strong> rescheduling may be permitted subject to operational feasibility and may attract an administrative or provider-blocking charge, if disclosed at the time of confirmation.</li>
          </ul>
          <p>Where the service is urgent, same-day, or on-demand, rescheduling is always subject to availability.</p>

          <h3 style={styles.subsectionTitle}>B. Cancellation by Customer</h3>
          <h4 style={styles.subSubsectionTitle}>i. Cancellation at least 6 hours before the scheduled service time</h4>
          <p>If you cancel at least 6 hours before the confirmed service time, you are eligible for:</p>
          <ul style={styles.list}>
            <li>a full refund, or</li>
            <li>one no-cost reschedule, if preferred by you and operationally feasible</li>
          </ul>

          <h4 style={styles.subSubsectionTitle}>ii. Cancellation less than 6 hours before the scheduled service time</h4>
          <p>If you cancel less than 6 hours before the confirmed service time but before service commencement, you are eligible for:</p>
          <ul style={styles.list}>
            <li>a 50% refund, and</li>
            <li>the remaining amount may be retained toward administrative, coordination, and provider allocation costs</li>
          </ul>

          <h4 style={styles.subSubsectionTitle}>iii. Cancellation after service commencement or provider dispatch</h4>
          <p>If the service has already commenced, or if a provider has already been dispatched to the service location, no refund will ordinarily be available, except where required by law or where we determine that the service could not be delivered due to reasons solely attributable to us.</p>

          <h4 style={styles.subSubsectionTitle}>iv. No-show / Patient unavailable / Access denied</h4>
          <p>No refund will ordinarily be available if:</p>
          <ul style={styles.list}>
            <li>the patient or authorized contact is unavailable at the scheduled time</li>
            <li>the address or access details provided are materially incorrect</li>
            <li>the provider is unable to render the booked service because access was denied or conditions at the location made delivery impossible despite reasonable efforts</li>
          </ul>

          <h3 style={styles.subsectionTitle}>C. Cancellation by 60Plus</h3>
          <p>If we cancel a confirmed booking due to provider unavailability, operational inability, internal error, location constraints, or other reasons attributable to us, you will be offered:</p>
          <ul style={styles.list}>
            <li>a full refund, or</li>
            <li>a rescheduled slot, at your choice, subject to availability</li>
          </ul>

          <h3 style={styles.subsectionTitle}>D. Service Not Delivered / Material Service Failure</h3>
          <p>You may be eligible for a full or partial refund if:</p>
          <ul style={styles.list}>
            <li>a confirmed service was not delivered at all for reasons attributable to us</li>
            <li>the wrong service was delivered due to our clear operational error</li>
            <li>there was duplicate billing</li>
            <li>a payment was captured but the booking was not confirmed and no service was provided</li>
            <li>there was a demonstrable technical or processing error resulting in wrongful charge</li>
          </ul>
          <p>Refunds for dissatisfaction that do not involve non-delivery or material service failure are assessed case by case, but are not automatic.</p>

          <h3 style={styles.subsectionTitle}>E. Subscription Plans / Packages</h3>
          <p>If you are enrolled in a subscription, care plan, or package:</p>
          <ul style={styles.list}>
            <li>you may cancel future renewals at any time before the next billing date</li>
            <li>cancellation stops future billing but does not automatically entitle you to a refund for the current billing cycle</li>
            <li>amounts for already-consumed services, completed visits, used credits, or elapsed subscription periods are non-refundable unless otherwise required by law</li>
            <li>where a package is partially used, any refund may be adjusted for services already consumed, benefits already availed, taxes, gateway charges where legally permissible, and non-recoverable third-party costs</li>
          </ul>

          <h3 style={styles.subsectionTitle}>F. Non-Refundable Items</h3>
          <p>Unless required by law or expressly approved by us, the following are ordinarily non-refundable once incurred or consumed:</p>
          <ul style={styles.list}>
            <li>completed consultations or visits</li>
            <li>provider dispatch costs after dispatch</li>
            <li>charges for services already rendered</li>
            <li>charges relating to no-show or failed customer-side access</li>
            <li>taxes or statutory levies already remitted, where not recoverable</li>
            <li>any clearly disclosed non-refundable administrative or convenience fee</li>
          </ul>

          <h3 style={styles.subsectionTitle}>G. Duplicate / Failed / Pending Payments</h3>
          <p><strong>Duplicate payment:</strong> If the same transaction is charged more than once for the same order or booking, the excess amount will be refunded after verification.</p>

          <p><strong>Failed payment with debit:</strong> If your bank account is debited but the booking is not confirmed, the amount may either be automatically reversed by the bank/payment network, or be refunded after reconciliation and verification.</p>

          <h3 style={styles.subsectionTitle}>H. How to Request a Cancellation or Refund</h3>
          <p>To request cancellation, rescheduling, or refund, contact:</p>
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>Email:</strong> <a href="mailto:reach@nurahub.com" style={styles.link}>reach@nurahub.com</a></p>
            <p style={styles.contactLine}><strong>Phone / WhatsApp:</strong> <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
          </div>
          <p>Please include:</p>
          <ul style={styles.list}>
            <li>customer name</li>
            <li>patient name, if different</li>
            <li>booking ID / order ID / invoice number</li>
            <li>payment date and amount</li>
            <li>registered mobile number / email</li>
            <li>reason for cancellation or refund request</li>
            <li>supporting screenshots or proof, if relevant</li>
          </ul>

          <h3 style={styles.subsectionTitle}>I. Refund Processing Timelines</h3>
          <p>Where a refund is approved:</p>
          <ul style={styles.list}>
            <li>we aim to initiate the refund within 3 business days of approval and verification</li>
            <li>once initiated, the refund typically reflects in the original payment source within 5 to 10 working days, depending on the payment mode, issuing bank, and payment network</li>
          </ul>
          <p>Refunds will generally be credited back to the original payment instrument unless otherwise required by law or specifically agreed by us.</p>

          <h3 style={styles.subsectionTitle}>J. Abuse Prevention</h3>
          <p>We reserve the right to deny refund or rescheduling requests that are fraudulent, abusive, repetitive, inconsistent with records, or otherwise violate these Terms &amp; Conditions.</p>

          <h3 style={styles.subsectionTitle}>K. Chargebacks and Payment Disputes</h3>
          <p>We encourage customers to contact us first for a faster resolution of cancellation, refund, or service issues. Initiating a chargeback without first seeking resolution may delay final settlement while the dispute is reviewed by the payment ecosystem.</p>
        </Section>

        <Section title="26. Contact Us" isLast>
          <p>For questions, complaints, cancellations, support requests, or legal notices, contact:</p>
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
    borderBottom: '1px solid rgba(130,53,208,0.1)',
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
    maxWidth: '800px',
    margin: '0 auto',
    padding: '56px 24px 40px',
  },
  docHeader: {
    marginBottom: '48px',
  },
  docMeta: {
    fontSize: '14px',
    color: '#8235d0',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    marginBottom: '12px',
    fontWeight: '700',
  },
  docTitle: {
    fontSize: '36px',
    fontWeight: '500',
    color: '#1a0a2e',
    margin: '0 0 18px 0',
    letterSpacing: '-0.5px',
    lineHeight: 1.2,
    fontFamily: "'Gambarino', 'Gambarino-Regular', serif",
  },
  docIntro: {
    fontSize: '18px',
    color: '#1a0a2e',
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
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a0a2e',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
    marginBottom: '14px',
    lineHeight: 1.4,
  },
  subsectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a0a2e',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
    marginTop: '18px',
    marginBottom: '8px',
  },
  subSubsectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a0a2e',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
    marginTop: '12px',
    marginBottom: '6px',
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
    border: '1px solid rgba(130,53,208,0.2)',
    borderRadius: '8px',
    padding: '18px 22px',
    marginTop: '10px',
    backgroundColor: 'rgba(130,53,208,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  contactLine: {
    fontSize: '16px',
    color: '#1a0a2e',
    margin: '3px 0',
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif",
  },
  link: {
    color: '#8235d0',
    textDecoration: 'underline',
    fontWeight: '600',
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
    fontSize: '16px',
    color: '#1a0a2e',
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