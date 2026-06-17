import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import useMetaTags from "../hooks/useMetaTags";
import { SERVICE_SEO, SERVICE_JSONLD } from "../data/serviceSEO";
import { getWhatsAppUrl } from "../data/whatsappMessages";
import {
  Stethoscope, PhoneCall, Users, Home, HeartPulse, ShieldCheck,
  FileText, Bell, MessageCircle, Globe, Ear, Pill, Shield,
  Briefcase, Plane, Apple, Zap, Gift, TestTube, Calendar, Activity,
  ArrowLeft, ArrowRight, Clock
} from "lucide-react";

/* ─────────────────────────────────────────
  SINGLE SOURCE OF TRUTH - all 21 services
───────────────────────────────────────── */
export const ALL_SERVICES = [
  { slug: "monthly-doctor-visit",                name: "Monthly Doctor Visit",                cat: "Healthcare & Medical",       icon: <Stethoscope size={22} />, description: "Regular monthly visits from qualified doctors to monitor your parent's health and address any medical concerns proactively." },
  { slug: "24-7-emergency-call",                 name: "24/7 Emergency Call",                 cat: "Daily Support & Monitoring", icon: <PhoneCall size={22} />,    description: "Round-the-clock emergency support with immediate response when your parents need urgent assistance." },
  { slug: "24-7-companion",                      name: "24/7 Companion",                      cat: "Daily Support & Monitoring", icon: <Users size={22} />,        description: "Personalized companion services to provide emotional support and assistance with daily activities." },
  { slug: "monthly-care-executive-visit",        name: "Monthly Care Executive Visit",        cat: "Home Care & Safety",         icon: <Home size={22} />,         description: "Professional care executive visits to assess living conditions and provide recommendations for safety and comfort." },
  { slug: "integrated-senior-health-index",      name: "Integrated Senior Health Index",      cat: "Healthcare & Medical",       icon: <HeartPulse size={22} />,   description: "Comprehensive health assessment using our proprietary index to track and improve overall wellness." },
  { slug: "senior-home-safety-assessment",       name: "Senior Home Safety Assessment",       cat: "Home Care & Safety",         icon: <ShieldCheck size={22} />,  description: "Detailed evaluation of home safety to identify potential hazards and recommend improvements." },
  { slug: "digitalization-of-medical-records",   name: "Digitalization of Medical Records",   cat: "Digital & Records",          icon: <FileText size={22} />,     description: "Secure digitization and organization of medical records for easy access and sharing with healthcare providers." },
  { slug: "voice-reminder-for-parents",          name: "Voice Reminder for Parents",          cat: "Daily Support & Monitoring", icon: <Bell size={22} />,         description: "Customizable voice reminders for medications, appointments, and daily tasks to maintain routine." },
  { slug: "daily-updates-to-children",           name: "Daily Updates to Children",           cat: "Daily Support & Monitoring", icon: <MessageCircle size={22} />, description: "Regular updates sent to children about their parents' wellbeing and daily activities." },
  { slug: "free-online-community",               name: "Free Online Community",               cat: "Digital & Records",          icon: <Globe size={22} />,        description: "Access to our supportive online community where seniors can connect and share experiences." },
  { slug: "audiologist-home-visit",              name: "Audiologist Home Visit",              cat: "Healthcare & Medical",       icon: <Ear size={22} />,          description: "Specialized hearing assessments and consultations conducted in the comfort of home." },
  { slug: "medicine-delivery",                   name: "Medicine Delivery",                   cat: "Daily Support & Monitoring", icon: <Pill size={22} />,         description: "Reliable medicine delivery service to ensure timely access to prescribed medications." },
  { slug: "senior-citizen-insurance-assessment", name: "Senior Citizen Insurance Assessment", cat: "Healthcare & Medical",       icon: <Shield size={22} />,       description: "Expert evaluation and recommendations for insurance coverage tailored to senior needs." },
  { slug: "velai-consultation",                  name: "Velai Consultation",                  cat: "Lifestyle & Wellness",       icon: <Briefcase size={22} />,    description: "Career and lifestyle consultation services for seniors looking to explore new opportunities." },
  { slug: "trip-consultation",                   name: "Trip Consultation",                   cat: "Lifestyle & Wellness",       icon: <Plane size={22} />,        description: "Specialized travel planning and consultation for safe and enjoyable trips for seniors." },
  { slug: "nutrition-consultation",              name: "Nutrition Consultation",              cat: "Lifestyle & Wellness",       icon: <Apple size={22} />,        description: "Personalized nutrition advice and meal planning tailored to senior health needs." },
  { slug: "on-demand-services",                  name: "On Demand Services",                  cat: "Daily Support & Monitoring", icon: <Zap size={22} />,          description: "Flexible support services available whenever needed for various daily tasks and requirements." },
  { slug: "complimentary-products",              name: "Complimentary Products",              cat: "Extras & Benefits",          icon: <Gift size={22} />,         description: "Quality products provided complimentary to enhance daily life and comfort." },
  { slug: "blood-test",                          name: "Blood Test",                          cat: "Healthcare & Medical",       icon: <TestTube size={22} />,     description: "Convenient at-home blood testing services with professional sample collection and analysis." },
  { slug: "offline-events",                      name: "Offline Events",                      cat: "Extras & Benefits",          icon: <Calendar size={22} />,     description: "Engaging offline events and activities to promote social interaction and community involvement." },
  { slug: "gait-analysis",                       name: "Gait Analysis",                       cat: "Home Care & Safety",         icon: <Activity size={22} />,     description: "Professional assessment of walking patterns to identify fall risks and recommend preventive measures." },
];

const GLOBAL_PALETTE = {
  accent: "#8235d0",
  light: "rgba(130,53,208,0.06)",
  border: "rgba(130,53,208,0.13)"
};

/* Rich content for fully-built service pages */
const SERVICE_CONTENT = {
  "monthly-doctor-visit": {
    tagline: "Comprehensive Care at Home",
    summary: "Doctor home visits bring medical care directly to your parents' doorstep. Instead of travelling to hospitals and waiting for consultations, elderly individuals can receive professional healthcare in the comfort of their home. This makes medical care more accessible, convenient, and consistent, especially for those with mobility challenges or chronic conditions.",
    image: "/images/doctor-visit.jpg",
    stats: [
      { value: "Home-based",    label: "Delivery"    },
      { value: "Comprehensive", label: "Care model"  },
      { value: "Personalized",  label: "Treatment"   },
      { value: "Professional",  label: "Service"     },
    ],
    what: {
      heading: "What to expect from at-home doctor consultations",
      items: [
        { title: "Personalized Medical Care", body: "Doctor home visits allow physicians to spend more time understanding the patient's condition in detail. This enables them to provide more focused attention, listen to concerns carefully, and recommend treatments that are tailored to individual health needs.", quote: "Every patient receives care designed specifically for them." },
        { title: "Reduced Need for Hospital Visits", body: "Many health conditions can be managed without visiting a hospital. With home consultations, elderly individuals can avoid long waiting times, travel discomfort, and unnecessary exposure to crowded environments, while still receiving quality medical care.", quote: "Quality care without the stress of travel." },
        { title: "Convenient and Accessible Healthcare", body: "Booking a doctor visit at home is simple and efficient. This makes it easier for seniors who may skip regular check-ups due to inconvenience or mobility issues, ensuring that healthcare is consistent and timely.", quote: "Professional care delivered to your doorstep." },
        { title: "Preventive and Routine Care", body: "Regular health check-ups help in early detection of potential health issues. By monitoring health consistently, it becomes easier to manage conditions early and reduce the chances of serious complications or hospitalisation.", quote: "Early care leads to better outcomes." },
        { title: "Safe and Professional Support", body: "All medical professionals involved are experienced and trained in elderly care. The service ensures safety, reliability, and professionalism, giving families confidence in the care being provided at home.", quote: "Trusted professionals you can rely on." },
        { title: "Continuity of Care at Home", body: "Having regular doctor visits at home creates familiarity and comfort for elderly individuals. This continuity improves communication, builds trust, and leads to better long-term health management.", quote: "Consistent care builds better health." },
      ],
    },
    why: { heading: "Why this service is important", body: "Access to regular medical care is essential for maintaining good health, especially for elderly individuals.\n\nDoctor home visits remove the challenges of travel, waiting times, and delayed consultations, making healthcare more accessible and consistent.\n\nThey also support early diagnosis, better monitoring of chronic conditions, and timely medical advice.\n\nFor families living away, this service provides reassurance that their parents are receiving professional care regularly, without disruption.\n\nOverall, it ensures better health outcomes, improved comfort, and greater peace of mind.", image: "/images/doctor2.jpg" },
  },
  "24-7-emergency-call": {
    tagline: "Always On. Always Ready. Always There.",
    summary: "Emergencies don't wait - and neither should care. With 24/7 Emergency Call support, your parents are never alone. Whether it's a sudden health concern, a fall, or a moment of fear, help is instantly available - coordinated, responsive, and handled with clarity when it matters the most.",
    image: "/images/hand_in_hand.jpg",
    stats: [
      { value: "24/7",           label: "Availability"      },
      { value: "< 60 sec",       label: "Response time"     },
      { value: "Immediate",      label: "Action trigger"    },
      { value: "Real-time",      label: "Family updates"    },
    ],
    what: {
      heading: "What every emergency support covers",
      items: [
        { title: "Instant Emergency Response", body: "Our team is available round the clock to respond to any emergency call. As soon as your parent reaches out, we quickly understand the situation and initiate the required support without delay.", quote: "Quick response can make a critical difference." },
        { title: "Medical Coordination", body: "In case of medical emergencies, we coordinate with nearby hospitals, ambulance services, and healthcare providers to ensure timely medical attention.", quote: "Right support at the right time ensures better outcomes." },
        { title: "Family Notification", body: "We keep family members informed about the situation in real time. You will receive updates on what is happening and what actions are being taken.", quote: "Stay informed, even from a distance." },
        { title: "Continuous Monitoring", body: "Our responsibility does not end with the first response. We continue to monitor the situation, follow up on medical care, and ensure that your parent is safe and stable.", quote: "Care continues beyond the first response." },
        { title: "Support for Non-Medical Situations", body: "Not all emergencies are medical. Situations like anxiety, confusion, or sudden distress also require immediate attention. Our team provides guidance and reassurance.", quote: "Support is not just medical - it is human." },
        { title: "Emergency Record & Tracking", body: "Every emergency interaction is documented and tracked to ensure continuity of care. This helps in understanding patterns and keeping a clear record for families and healthcare providers.", quote: "Every incident is tracked for better future care." },
      ],
    },
    why: { heading: "How It Helps You (Children Living Abroad)", body: "When you live far away, emergencies are not just events - they are your biggest worry.\n\nThis service removes that uncertainty completely.\n\nYou no longer need to depend on chance, neighbours, or delayed communication. Every situation is handled immediately, with clarity, coordination, and full visibility to you.\n\nYou stay informed, you stay connected, and most importantly, you stay reassured that your parents are never alone - not even for a moment.\n\nBecause true safety is not just about reacting to emergencies - it is about knowing that someone is always there before you even need to ask.", image: "/images/img2.jpg" },
  },
  "24-7-companion": {
    tagline: "Continuous Care and Companionship at Home",
    summary: "Elderly individuals often need more than just medical support - they need consistent companionship and assistance in their daily lives. With our 24/7 Companion service, your parents are supported at all times by trained professionals who ensure comfort, safety, and emotional well-being throughout the day.",
    image: "/images/img6.jpg",
    stats: [
      { value: "24/7",     label: "Availability" },
      { value: "In-home",  label: "Support"      },
      { value: "Daily",    label: "Assistance"   },
      { value: "Trusted",  label: "Caregivers"   },
    ],
    what: {
      heading: "What companion support includes",
      items: [
        { title: "Daily Living Assistance", body: "Companions assist with everyday activities such as walking, eating, medication reminders, and basic routines.", quote: "Support that makes everyday life easier." },
        { title: "Emotional Companionship", body: "Having someone present to talk, listen, and engage with provides emotional stability and improves overall well-being for elderly individuals.", quote: "Presence brings comfort beyond care." },
        { title: "Safety and Supervision", body: "Continuous supervision helps in preventing falls, accidents, or risky situations at home. Caregivers remain attentive and responsive.", quote: "Safety is maintained through constant care." },
        { title: "Routine and Activity Support", body: "Companions help with daily schedules, light activities, and engagement to keep both mind and body active.", quote: "A consistent routine supports a healthier life." },
        { title: "Coordination with Families", body: "Families are kept informed about daily activities and well-being, ensuring transparency and connection even from a distance.", quote: "Stay connected to everyday care." },
        { title: "Reliable and Trained Caregivers", body: "All companions are trained to handle elderly care with professionalism and empathy, ensuring dependable support.", quote: "Care delivered with trust and responsibility." },
      ],
    },
    why: { heading: "Why this service is important", body: "As parents age, they require not only medical care but also continuous support in their daily lives.\n\nLiving alone can lead to isolation, missed routines, and safety concerns.\n\nWith a dedicated companion available at all times, your parents receive consistent assistance, emotional support, and supervision.\n\nFor families living away, this service provides confidence that their parents are not alone and are being cared for responsibly throughout the day.\n\nIt ensures comfort, safety, and a better quality of life at home.", image: "/images/errands1.jpg" },
  },
  "monthly-care-executive-visit": {
    tagline: "Regular Home Assessments for Better Living",
    summary: "A comfortable and safe living environment plays a key role in the well-being of elderly individuals. With our Monthly Care Executive Visit, trained professionals visit your parents' home to assess their living conditions and ensure their daily environment supports health, safety, and comfort.",
    image: "/images/caretender.jpg",
    stats: [
      { value: "Monthly",    label: "Visits"      },
      { value: "In-home",    label: "Assessment"  },
      { value: "Safety",     label: "Focus"       },
      { value: "Structured", label: "Reports"     },
    ],
    what: {
      heading: "What each care executive visit includes",
      items: [
        { title: "Home Environment Assessment", body: "The care executive evaluates the overall living environment, including cleanliness, accessibility, and general safety.", quote: "A safe home environment supports better living." },
        { title: "Health & Lifestyle Observation", body: "The executive observes daily routines, eating habits, and general well-being to understand how your parents are managing day-to-day.", quote: "Understanding daily life helps improve care." },
        { title: "Safety Risk Identification", body: "Potential risks such as fall hazards, poor lighting, or unsafe arrangements are identified and recommendations provided.", quote: "Prevention begins with awareness." },
        { title: "Basic Support & Guidance", body: "Care executives provide guidance to help improve daily routines, hygiene practices, and overall comfort.", quote: "Small improvements make a big difference." },
        { title: "Family Updates and Reporting", body: "After each visit, a structured update is shared with family members including observations, concerns, and recommendations.", quote: "Clear updates keep families connected." },
        { title: "Coordination with Other Services", body: "If additional support is required, the care executive helps coordinate with relevant services for a smooth care experience.", quote: "Care works best when everything is connected." },
      ],
    },
    why: { heading: "Why this service is important", body: "As parents grow older, their living environment becomes just as important as their medical care.\n\nSmall issues at home can often go unnoticed but may lead to larger problems over time.\n\nRegular visits by a care executive help identify these concerns early and ensure that the home remains safe, comfortable, and supportive.\n\nFor families living away, this service provides visibility into their parents' daily living conditions and reassurance that everything is being monitored regularly.", image: "/images/hand_in_hand.jpg" },
  },
  "integrated-senior-health-index": {
    tagline: "A Complete View of Your Parent's Health",
    summary: "Understanding health is not just about individual reports - it is about seeing the complete picture. The Integrated Senior Health Index combines multiple health parameters into a single, structured view, helping track overall well-being, identify risks early, and support better decision-making over time.",
    image: "/images/hero-main.jpg",
    stats: [
      { value: "360°",       label: "Health view" },
      { value: "Continuous", label: "Tracking"    },
      { value: "Data-driven",label: "Insights"    },
      { value: "Preventive", label: "Approach"    },
    ],
    what: {
      heading: "What the health index includes",
      items: [
        { title: "Comprehensive Health Assessment", body: "The health index brings together key health parameters such as medical history, current conditions, lifestyle habits, and routine check-up data.", quote: "All health information, in one structured view." },
        { title: "Regular Health Tracking", body: "Health data is tracked consistently over time, allowing patterns and changes to be observed that may not be visible through one-time check-ups.", quote: "Tracking over time reveals what one report cannot." },
        { title: "Risk Identification", body: "By analysing combined health data, potential risks can be identified early, allowing for timely action.", quote: "Early identification leads to better prevention." },
        { title: "Structured Health Reports", body: "All information is presented in a clear and easy-to-understand format for families and healthcare professionals.", quote: "Clarity helps in making better decisions." },
        { title: "Support for Medical Decisions", body: "Doctors and caregivers can use the health index as a reference to understand overall condition and plan treatment.", quote: "Better data supports better care decisions." },
        { title: "Continuous Improvement in Care", body: "With ongoing updates and monitoring, the health index helps improve the quality of care over time based on real data.", quote: "Care improves when it is guided by data." },
      ],
    },
    why: { heading: "Why this service is important", body: "Health information is often scattered across reports, prescriptions, and different consultations.\n\nThis makes it difficult to understand the overall condition of elderly individuals.\n\nThe Integrated Senior Health Index brings everything together into a single, structured system that provides clarity and continuity.\n\nIt helps in early detection of risks, better monitoring of chronic conditions, and more informed medical decisions.\n\nFor families living away, it offers a clear and reliable view of their parents' health without depending on fragmented updates.", image: "/images/img1.jpg" },
  },
  "senior-home-safety-assessment": {
    tagline: "Creating a Safer Living Environment at Home",
    summary: "As parents grow older, their home environment needs to adapt to their changing needs. Small risks such as slippery floors, poor lighting, or unsafe arrangements can lead to serious injuries. The Senior Home Safety Assessment ensures their living space is evaluated, improved, and made safer for everyday living.",
    image: "/images/grabbar.jpg",
    stats: [
      { value: "In-home",    label: "Assessment" },
      { value: "Safety",     label: "Focused"    },
      { value: "Risk-based", label: "Evaluation" },
      { value: "Preventive", label: "Approach"   },
    ],
    what: {
      heading: "What the safety assessment includes",
      items: [
        { title: "Home Safety Evaluation", body: "A detailed assessment of the home is carried out to identify potential risks in bathrooms, bedrooms, and walking spaces.", quote: "A safer home starts with proper evaluation." },
        { title: "Fall Risk Identification", body: "Common causes of falls such as slippery floors, uneven surfaces, and lack of support are identified with special attention to high-risk areas.", quote: "Preventing falls is the first step to safety." },
        { title: "Safety Recommendations", body: "Practical suggestions such as installing grab bars, using anti-slip mats, improving lighting, and rearranging furniture are provided.", quote: "Simple changes can prevent serious risks." },
        { title: "Home Accessibility Improvements", body: "Adjustments are recommended to make daily movement easier, especially for seniors with mobility challenges.", quote: "Ease of movement improves independence." },
        { title: "Security Enhancements", body: "Basic security measures such as video doorbells or monitoring systems are suggested to improve safety for seniors living alone.", quote: "Safety includes both inside and outside protection." },
        { title: "Ongoing Safety Awareness", body: "Families are guided on how to maintain a safe environment over time as needs evolve.", quote: "Safety is a continuous process, not a one-time setup." },
      ],
    },
    why: { heading: "Why this service is important", body: "A home that once felt comfortable may not always remain safe as parents grow older.\n\nSmall risks such as slips, poor visibility, or lack of support can lead to serious injuries.\n\nA structured safety assessment helps identify these issues early and provides practical solutions to prevent them.\n\nFor families living away, this service ensures that their parents' living environment is regularly reviewed and improved for safety.", image: "/images/img4.jpg" },
  },
  "digitalization-of-medical-records": {
    tagline: "Organized Medical Records for Better Care",
    summary: "Medical records are essential for understanding a person's health history and ensuring proper treatment. However, these records are often scattered across reports, prescriptions, and hospital documents. This service helps collect, organize, and digitize all medical information into a structured format.",
    image: "/images/hero-digi.jpeg",
    stats: [
      { value: "Centralized", label: "Records"      },
      { value: "Digital",     label: "Access"       },
      { value: "Secure",      label: "Storage"      },
      { value: "Updated",     label: "Continuously" },
    ],
    what: {
      heading: "What medical record management includes",
      items: [
        { title: "Collection of Medical Documents", body: "All existing medical documents such as prescriptions, lab reports, discharge summaries, and scan reports are collected and organized.", quote: "Every record matters in understanding health." },
        { title: "Digital Record Creation", body: "Physical documents are converted into digital formats for easy storage and access by families and healthcare providers.", quote: "Digital access makes healthcare faster and easier." },
        { title: "Structured Health History", body: "Patient history including past treatments, family medical background, and ongoing conditions is compiled into a clear structured format.", quote: "Clear history supports better care decisions." },
        { title: "Secure Storage and Privacy", body: "All records are stored securely with proper confidentiality measures while remaining accessible to authorized individuals.", quote: "Privacy and safety go hand in hand." },
        { title: "Easy Sharing with Healthcare Providers", body: "Organized records can be easily shared with doctors and hospitals, improving communication and ensuring accurate treatment.", quote: "Better communication leads to better treatment." },
        { title: "Continuous Updates", body: "Medical records are regularly updated with new reports, prescriptions, and treatments to always reflect current health status.", quote: "Up-to-date records enable better care at all times." },
      ],
    },
    why: { heading: "Why this service is important", body: "Medical information is often scattered across different documents and locations, making it difficult to access when needed.\n\nIn emergencies or during consultations, missing or incomplete records can delay proper treatment.\n\nBy organizing and digitizing all medical records, this service ensures that accurate information is always available.\n\nFor families living away, it provides clarity and easy access to their parents' medical history at any time.", image: "/images/old_person8.jpg" },
  },
  "voice-reminder-for-parents": {
    tagline: "Timely Reminders for Daily Health and Routine",
    summary: "As parents grow older, it becomes common to forget medications, routines, or important daily activities. With our Voice Reminder service, seniors receive gentle and timely reminders for medicines, routines, and daily needs, ensuring consistency and better health management.",
    image: "/images/old_person_3.jpg",
    stats: [
      { value: "Daily",        label: "Reminders" },
      { value: "On-time",      label: "Alerts"    },
      { value: "Personalized", label: "Schedules" },
      { value: "Supportive",   label: "Check-ins" },
    ],
    what: {
      heading: "What the reminder service includes",
      items: [
        { title: "Daily Medicine Reminders", body: "Seniors are reminded at the right time to take their medications as prescribed, preventing missed doses.", quote: "Timely medication leads to better health outcomes." },
        { title: "Personalized Reminder Scheduling", body: "Reminders are set based on individual routines and prescriptions, customized to match the specific needs of your parents.", quote: "Every reminder is tailored to individual needs." },
        { title: "Voice-Based Friendly Alerts", body: "Reminders are delivered in a simple and friendly manner, making it easy for seniors to understand and follow.", quote: "Gentle reminders create better adherence." },
        { title: "Routine Activity Reminders", body: "Apart from medicines, reminders can include daily routines such as meals, hydration, or appointments.", quote: "Consistency in routine supports overall well-being." },
        { title: "Regular Check-in Calls", body: "Our team connects with your parents through periodic calls to check on their well-being and provide human interaction.", quote: "Regular conversations bring comfort and connection." },
        { title: "Family Updates and Alerts", body: "Important updates from reminders and conversations are shared with family members to keep you informed.", quote: "Stay informed about daily care, even from afar." },
      ],
    },
    why: { heading: "Why this service is important", body: "Forgetting medications or daily routines is common among elderly individuals and can directly impact their health.\n\nIrregular medication intake or missed routines can lead to complications over time.\n\nWith timely reminders and regular check-ins, this service ensures that your parents stay consistent with their daily schedule.\n\nFor families living away, it offers reassurance that their parents are being guided and supported every day.", image: "/images/img5.jpg" },
  },
  "daily-updates-to-children": {
    tagline: "Stay Connected to Your Parents Every Day",
    summary: "When you live away from your parents, staying updated about their daily well-being can be challenging. With our Daily Updates service, you receive regular and reliable information about their health, routine, and overall condition, helping you stay connected and informed at all times.",
    image: "/images/img3.jpg",
    stats: [
      { value: "Daily",      label: "Updates"   },
      { value: "Real-time",  label: "Insights"  },
      { value: "Consistent", label: "Tracking"  },
      { value: "Connected",  label: "Families"  },
    ],
    what: {
      heading: "What daily updates include",
      items: [
        { title: "Health and Well-being Updates", body: "Regular updates are shared regarding your parents' health condition, including any changes, concerns, or improvements.", quote: "Stay informed about what truly matters." },
        { title: "Daily Activity Summary", body: "Information about daily routines such as meals, medication adherence, and general activities is shared for a clear picture.", quote: "A clear view of everyday life." },
        { title: "Important Alerts and Notifications", body: "If any unusual situation or concern arises, immediate alerts are sent to ensure you can take timely action.", quote: "Timely alerts help prevent bigger issues." },
        { title: "Communication from Care Team", body: "Updates from caregivers, care executives, or support staff are shared to give additional insights into your parents' needs.", quote: "Direct updates from those who care for them." },
        { title: "Consistency in Monitoring", body: "Daily reporting ensures no gaps in information, helping identify patterns and understand changes over time.", quote: "Consistency builds clarity and confidence." },
        { title: "Peace of Mind for Families", body: "Knowing how your parents are doing every day reduces anxiety and uncertainty, keeping you connected even from far away.", quote: "Peace of mind comes from staying informed." },
      ],
    },
    why: { heading: "Why this service is important", body: "Distance often makes it difficult to stay updated about your parents' daily life.\n\nIrregular communication can lead to uncertainty and concern about their well-being.\n\nWith structured daily updates, you receive consistent and reliable information about their health, routine, and overall condition.\n\nThis helps you stay connected, make informed decisions, and respond quickly if needed.\n\nFor families living abroad, it provides reassurance that nothing important is missed.", image: "/images/img8.jpg" },
  },
  "free-online-community": {
    tagline: "A Space to Connect, Share, and Engage",
    summary: "Staying socially active is just as important as physical health, especially for seniors. Our Free Online Community provides a safe and welcoming space where your parents can connect with others, share experiences, and stay engaged through meaningful interactions.",
    image: "/images/iStock-1166426940.jpg",
    stats: [
      { value: "Online",     label: "Access"    },
      { value: "Active",     label: "Community" },
      { value: "Engaging",   label: "Activities"},
      { value: "Supportive", label: "Network"   },
    ],
    what: {
      heading: "What the community offers",
      items: [
        { title: "Social Interaction", body: "Seniors can connect with others in similar age groups, share conversations, and build meaningful relationships.", quote: "Connection brings comfort and belonging." },
        { title: "Group Activities and Engagement", body: "The community includes various activities such as discussions, light learning sessions, and interactive events.", quote: "Engagement keeps the mind active and positive." },
        { title: "Safe and Moderated Environment", body: "All interactions are monitored to ensure a respectful and safe space for seniors to participate freely.", quote: "A safe space encourages open participation." },
        { title: "Emotional Support Network", body: "Being part of a community allows seniors to share their thoughts, experiences, and challenges for emotional support.", quote: "Shared experiences create stronger bonds." },
        { title: "Easy Access and Participation", body: "The platform is designed to be simple and easy to use, regardless of technical familiarity.", quote: "Simplicity makes participation easier." },
        { title: "Continuous Engagement", body: "Regular activities and interactions ensure that seniors remain active and involved over time.", quote: "Staying engaged improves quality of life." },
      ],
    },
    why: { heading: "Why this service is important", body: "As parents grow older, social interaction often reduces, leading to feelings of isolation and loneliness.\n\nA supportive community helps them stay connected, engaged, and mentally active.\n\nBeing part of a group where they can share experiences and participate in activities improves emotional well-being.\n\nFor families living away, it provides reassurance that their parents are not alone and have a network of people around them.", image: "/images/iStock-921464498.jpg" },
  },
  "audiologist-home-visit": {
    tagline: "Hearing Care Delivered at Home",
    summary: "Hearing issues are common among seniors and can affect communication, confidence, and overall quality of life. With our Audiologist Home Visit service, professional hearing assessments and guidance are provided at home, making care more comfortable without visiting clinics.",
    image: "/images/img1.jpg",
    stats: [
      { value: "1/month",      label: "Visit"        },
      { value: "12/year",      label: "Annual visits" },
      { value: "At-home",      label: "Service"      },
      { value: "Professional", label: "Assessment"   },
    ],
    what: {
      heading: "What each audiologist visit includes",
      items: [
        { title: "Hearing Assessment", body: "A basic evaluation of hearing ability is conducted to identify any signs of hearing loss or difficulty.", quote: "Early detection improves hearing care." },
        { title: "Guidance on Hearing Health", body: "The audiologist provides guidance on maintaining hearing health, including care practices and lifestyle adjustments.", quote: "Proper guidance helps preserve hearing ability." },
        { title: "Hearing Aid Support", body: "For seniors using hearing aids, support is provided for usage, maintenance, and adjustments.", quote: "Well-maintained devices improve daily life." },
        { title: "Monitoring Changes Over Time", body: "Regular monthly visits help track changes in hearing ability and ensure any decline is identified early.", quote: "Regular monitoring prevents unnoticed decline." },
        { title: "Comfort of Home-Based Care", body: "All assessments and support are provided at home, eliminating the need for travel.", quote: "Care at home improves comfort and access." },
        { title: "Family Awareness and Updates", body: "Observations and recommendations are shared with family members to keep them informed about hearing health.", quote: "Stay informed about hearing health." },
      ],
    },
    why: { heading: "Why this service is important", body: "Hearing loss often develops gradually and may go unnoticed in the early stages.\n\nIf not addressed, it can affect communication, social interaction, and overall well-being.\n\nRegular hearing assessments help in identifying issues early and managing them effectively.\n\nWith home-based visits, seniors receive consistent and comfortable care without the need to travel.\n\nFor families living away, this service ensures that their parents' hearing health is monitored regularly.", image: "/images/physio_2.jpg" },
  },
  "medicine-delivery": {
    tagline: "Reliable Access to Medicines at the Right Time",
    summary: "Ensuring that seniors receive their medicines on time is essential for maintaining their health. With our Medicine Delivery service, prescribed medicines are procured and delivered directly to your parents' home, eliminating the need for travel, delays, or missed doses.",
    image: "/images/digi.jpg",
    stats: [
      { value: "On-time",     label: "Delivery"   },
      { value: "Verified",    label: "Sources"    },
      { value: "Regular",     label: "Refills"    },
      { value: "Hassle-free", label: "Process"    },
    ],
    what: {
      heading: "What the medicine delivery service includes",
      items: [
        { title: "Prescription-Based Procurement", body: "Medicines are sourced strictly based on valid prescriptions, with careful verification before procurement.", quote: "Accuracy in medicines is critical for safe treatment." },
        { title: "Timely and Scheduled Delivery", body: "Medicines are delivered on time according to the required schedule, ensuring no gaps in treatment.", quote: "Timely delivery ensures uninterrupted care." },
        { title: "Support for Regular Refills", body: "For long-term medications, refills are tracked and managed proactively to prevent seniors from running out.", quote: "Consistency in supply supports better health outcomes." },
        { title: "Coordination with Doctors", body: "If there are changes in prescriptions, the service coordinates with doctors to update required medicines.", quote: "Aligned care ensures the right medicines at the right time." },
        { title: "Quality Assurance", body: "Medicines are procured from trusted and verified pharmacies to ensure authenticity and quality.", quote: "Trusted sources ensure safe medication." },
        { title: "Convenience and Reduced Dependence", body: "By delivering medicines directly to the doorstep, seniors do not need to travel or depend on others.", quote: "Convenience improves consistency in care." },
      ],
    },
    why: { heading: "Why this service is important", body: "Regular access to prescribed medicines is essential for managing health conditions effectively.\n\nDelays, missed refills, or incorrect medications can lead to serious health complications.\n\nWith a structured medicine delivery system, these risks are minimized by ensuring timely, accurate, and consistent supply.\n\nFor families living away, this service provides confidence that their parents are receiving the right medicines without interruption.", image: "/images/img2.jpg" },
  },
  "senior-citizen-insurance-assessment": {
    tagline: "Right Insurance for Better Financial Protection",
    summary: "As parents grow older, the risk of medical conditions and unexpected hospital expenses increases. Having the right health insurance ensures these situations can be handled without financial stress. This service helps evaluate and guide families towards the most suitable insurance plans for senior citizens.",
    image: "/images/pension.jpg",
    stats: [
      { value: "60+",      label: "Age focus"   },
      { value: "Coverage", label: "Guidance"    },
      { value: "Financial",label: "Protection"  },
      { value: "Expert",   label: "Support"     },
    ],
    what: {
      heading: "What the insurance assessment includes",
      items: [
        { title: "Evaluation of Insurance Needs", body: "Understanding the health condition, age, and medical history to identify suitable insurance options.", quote: "Right planning begins with proper understanding." },
        { title: "Guidance on Policy Coverage", body: "Clear guidance is provided to help understand what each policy includes and how it benefits your parents.", quote: "Clarity in coverage leads to better decisions." },
        { title: "Support in Choosing the Right Plan", body: "Comparing plans and choosing one that offers the best balance between coverage, cost, and benefits.", quote: "Choosing the right plan avoids future complications." },
        { title: "Understanding Premium and Costs", body: "Proper explanation of premium structure, payment options, and long-term cost implications.", quote: "Understanding costs helps in better financial planning." },
        { title: "Assistance with Online Insurance Process", body: "Guidance is provided at every step to help you complete the insurance process without confusion.", quote: "A simple process makes insurance easier to access." },
        { title: "Support for Informed Decision Making", body: "Families are guided to review terms, conditions, and benefits carefully before finalizing a policy.", quote: "Informed decisions provide better security." },
      ],
    },
    why: { heading: "Why this service is important", body: "As people age, the chances of critical illnesses and hospitalization increase.\n\nMedical treatments today are advanced but also expensive, making proper financial protection essential.\n\nWithout insurance, unexpected medical costs can become a significant burden.\n\nBy choosing the right insurance plan early, these risks can be managed effectively.\n\nFor families living away, it provides confidence that medical emergencies can be handled without financial stress.", image: "/images/pension-759.jpg" },
  },
  "velai-consultation": {
    tagline: "Meaningful Opportunities for an Active Life",
    summary: "Staying active and engaged is essential for a healthy and fulfilling life. Many senior citizens have the energy, experience, and desire to continue contributing in meaningful ways. Velai Consultation helps seniors explore suitable opportunities that match their interests and abilities.",
    image: "/images/online_doctor.jpg",
    stats: [
      { value: "Flexible",   label: "Opportunities" },
      { value: "Part-time",  label: "Roles"         },
      { value: "WFH",        label: "Options"       },
      { value: "Purposeful", label: "Engagement"    },
    ],
    what: {
      heading: "What the consultation includes",
      items: [
        { title: "Understanding Interests and Skills", body: "The consultation begins by understanding the senior's interests, past experience, and current capabilities.", quote: "The right opportunity starts with understanding the individual." },
        { title: "Curated Job Opportunities", body: "Relevant opportunities such as part-time roles, work-from-home options, or flexible engagements are curated from trusted networks.", quote: "Opportunities tailored for comfort and flexibility." },
        { title: "Guidance on Suitable Roles", body: "Clear guidance is provided on choosing roles that match energy levels, lifestyle, and preferences.", quote: "The right role supports both comfort and purpose." },
        { title: "Support for New Career Exploration", body: "Seniors who wish to explore new areas or interests are supported with ideas and direction.", quote: "It is never too late to explore new paths." },
        { title: "Encouraging Knowledge Sharing", body: "Opportunities are suggested where seniors can share their expertise with younger generations or communities.", quote: "Experience shared becomes a lasting contribution." },
        { title: "Improving Engagement and Well-being", body: "Staying engaged in meaningful work helps improve mental health, confidence, and overall well-being.", quote: "Active engagement leads to a healthier life." },
      ],
    },
    why: { heading: "Why this service is important", body: "After retirement, many seniors experience a sudden change in routine and reduced engagement.\n\nThis can lead to feelings of isolation or lack of purpose.\n\nBy exploring suitable work or meaningful activities, seniors can stay active, independent, and mentally engaged.\n\nFor families, it brings reassurance that their parents are leading a productive and fulfilling life.", image: "/images/img5.jpg" },
  },
  "trip-consultation": {
    tagline: "Safe and Comfortable Travel Planning for Seniors",
    summary: "Travel can be a refreshing and fulfilling experience for seniors when planned with care. Trip Consultation helps families plan safe, comfortable, and well-structured travel experiences for their parents, ensuring health, convenience, and support are considered.",
    image: "/images/img6.jpg",
    stats: [
      { value: "Planned",  label: "Trips"   },
      { value: "Safe",     label: "Travel"  },
      { value: "Comfort",  label: "Focused" },
      { value: "Guided",   label: "Support" },
    ],
    what: {
      heading: "What the trip consultation includes",
      items: [
        { title: "Understanding Travel Needs", body: "The consultation begins by understanding the senior's preferences, health condition, and travel expectations.", quote: "Every journey starts with understanding the traveler." },
        { title: "Destination Planning", body: "Suitable destinations are suggested based on accessibility, climate, and convenience.", quote: "The right destination makes travel easier and safer." },
        { title: "Health and Safety Considerations", body: "Medical needs, accessibility, and emergency support are considered while planning the trip.", quote: "Safe travel is well-planned travel." },
        { title: "Travel and Stay Arrangements", body: "Guidance is provided for selecting appropriate travel options and accommodation that are comfortable and senior-friendly.", quote: "Comfortable arrangements make travel enjoyable." },
        { title: "Assistance Planning During Travel", body: "Recommendations for support services or companions during the trip ensure seniors are not left unsupported.", quote: "Support ensures confidence during travel." },
        { title: "Complete Travel Guidance", body: "Families are guided through the entire process, including preparation, packing essentials, and planning for contingencies.", quote: "Good preparation leads to better journeys." },
      ],
    },
    why: { heading: "Why this service is important", body: "Travel can improve mental well-being, provide relaxation, and create meaningful experiences for seniors.\n\nHowever, without proper planning, it can also become stressful and physically demanding.\n\nBy carefully considering health, comfort, and safety, this service ensures that seniors can travel confidently.\n\nFor families, it offers reassurance that their parents' travel is safe and well-organized.", image: "/images/lonely_old_man.jpg" },
  },
  "nutrition-consultation": {
    tagline: "Balanced Nutrition for Healthy Aging",
    summary: "As we age, the body undergoes changes that affect metabolism, immunity, and overall health. Proper nutrition plays a key role in maintaining strength, preventing deficiencies, and improving quality of life. With our Nutrition Consultation service, seniors receive personalized dietary guidance.",
    image: "/images/home_nurse_4.jpg",
    stats: [
      { value: "Personalized", label: "Plans"        },
      { value: "Balanced",     label: "Nutrition"    },
      { value: "Guided",       label: "Consultation" },
      { value: "Healthy",      label: "Lifestyle"    },
    ],
    what: {
      heading: "What the nutrition consultation includes",
      items: [
        { title: "Personalized Meal Planning", body: "Meal plans are designed based on individual health conditions, age, weight, and dietary preferences.", quote: "Balanced meals support better health every day." },
        { title: "Diet Chart for Health Management", body: "Structured diet charts are created to manage weight, chronic conditions, and nutritional deficiencies.", quote: "A structured diet leads to better control over health." },
        { title: "Nutritional Counselling", body: "Nutrition experts assess overall health and lifestyle to provide guidance on improving eating habits.", quote: "Guidance helps build sustainable healthy habits." },
        { title: "Support for Chronic Conditions", body: "Special attention is given to conditions such as diabetes, heart issues, and obesity with adjusted diet plans.", quote: "Proper nutrition complements medical care." },
        { title: "Monitoring and Adjustments", body: "Nutritional plans are reviewed and updated periodically based on changes in health condition or lifestyle.", quote: "Regular updates keep nutrition aligned with health needs." },
        { title: "Improving Overall Well-being", body: "A balanced diet helps improve energy levels, sleep quality, and immunity for an active lifestyle.", quote: "Good nutrition enhances quality of life." },
      ],
    },
    why: { heading: "Why this service is important", body: "As people age, their nutritional needs change and deficiencies become more common.\n\nPoor diet can lead to weakened immunity, chronic conditions, and reduced quality of life.\n\nA structured nutrition plan helps maintain strength, manage health conditions, and improve overall well-being.\n\nFor families living away, this service ensures that their parents are following a balanced and appropriate diet.", image: "/images/img1.jpg" },
  },
  "on-demand-services": {
    tagline: "Support When You Need It, As You Need It",
    summary: "Not all needs can be planned in advance. Seniors may require occasional assistance for tasks, errands, or unexpected situations. With our On Demand Services, support is available whenever required, ensuring your parents receive timely help without depending on others.",
    image: "/images/errands 2.jpg",
    stats: [
      { value: "Flexible",   label: "Support"    },
      { value: "On-request", label: "Service"    },
      { value: "Quick",      label: "Response"   },
      { value: "Reliable",   label: "Assistance" },
    ],
    what: {
      heading: "What on demand services include",
      items: [
        { title: "Assistance for Daily Errands", body: "Support is provided for everyday tasks such as grocery shopping, bill payments, or basic household needs.", quote: "Everyday tasks made easier with support." },
        { title: "Immediate Support for Urgent Needs", body: "In situations where immediate assistance is required, the service ensures a quick response to address the need effectively.", quote: "Timely support when it matters most." },
        { title: "Coordination of Services", body: "If additional services are required such as maintenance, repairs, or medical support, coordination is handled smoothly.", quote: "One point of contact for multiple needs." },
        { title: "Companion Support on Request", body: "Temporary companionship or assistance can be arranged whenever required for specific situations or activities.", quote: "Support available whenever needed." },
        { title: "Custom Requests Handling", body: "The service is flexible enough to handle custom requests, ensuring individual requirements are addressed efficiently.", quote: "Flexible support tailored to individual needs." },
        { title: "Reliable and Verified Assistance", body: "All services are provided through trusted and verified sources, ensuring safety, reliability, and quality.", quote: "Trusted support you can depend on." },
      ],
    },
    why: { heading: "Why this service is important", body: "Seniors may occasionally face situations where they need help beyond their regular routine.\n\nWithout reliable support, even simple tasks can become challenging.\n\nOn demand services provide flexibility by offering assistance exactly when it is required.\n\nFor families living away, it offers reassurance that help is always available when needed.\n\nIt ensures convenience, safety, and continuity in daily living.", image: "/images/caretender.jpg" },
  },
  "complimentary-products": {
    tagline: "Thoughtful Additions for Everyday Comfort",
    summary: "Small comforts can make a big difference in daily life, especially for seniors. Our Complimentary Products service provides carefully selected essentials that support health, safety, and convenience - meaningful inclusions designed to improve comfort and enhance overall well-being at home.",
    image: "/images/grabbar.jpg",
    stats: [
      { value: "4/year",    label: "Products"       },
      { value: "Quarterly", label: "Delivery cycle" },
      { value: "Curated",   label: "Selection"      },
      { value: "Useful",    label: "Daily support"  },
    ],
    what: {
      heading: "What complimentary support includes",
      items: [
        { title: "Curated Essential Products", body: "Each product is carefully selected based on the needs of seniors, focusing on health, safety, and ease of use.", quote: "Every product is chosen with purpose and care." },
        { title: "Quarterly Delivery", body: "Products are provided once every four months, ensuring regular support without the need to request or arrange them.", quote: "Regular support ensures nothing important is missed." },
        { title: "Support for Daily Living", body: "Products are designed to simplify everyday activities and improve comfort at home.", quote: "Small improvements lead to better everyday living." },
        { title: "Quality and Reliability", body: "All products are sourced from trusted providers to ensure quality, safety, and durability.", quote: "Quality products create dependable support." },
        { title: "Aligned with Care Services", body: "The selection of products is aligned with the overall care plan, complementing other services.", quote: "Every product supports the bigger care system." },
        { title: "Convenience for Families", body: "Families do not have to worry about identifying or purchasing essentials separately - they are automatically provided.", quote: "Care delivered without extra effort." },
      ],
    },
    why: { heading: "Why this service is important", body: "Providing care is not only about medical support - it is also about ensuring comfort, convenience, and quality of life.\n\nMany small but essential items often go unnoticed, yet they play a significant role in maintaining hygiene, safety, and ease of routine.\n\nWith complimentary products delivered regularly, these needs are taken care of proactively.\n\nFor families living away, it offers reassurance that even the smallest aspects of care are being handled thoughtfully.", image: "/images/img2.jpg" },
  },
  "blood-test": {
    tagline: "Convenient and Safe Diagnostic Testing at Home",
    summary: "Regular health check-ups are essential for early detection and effective management of medical conditions. With our Blood Test at Home service, samples are collected directly from your parents' home, eliminating the need to visit clinics and ensuring safe, timely, and convenient diagnostic support.",
    image: "/images/home_nurse_4.jpg",
    stats: [
      { value: "At home",  label: "Collection" },
      { value: "6 months", label: "Frequency"  },
      { value: "Certified",label: "Lab"        },
      { value: "Digital",  label: "Reports"    },
    ],
    what: {
      heading: "What the home testing service includes",
      items: [
        { title: "Home Sample Collection", body: "Blood, urine, and other required samples are collected directly at home by trained professionals.", quote: "Testing made easy at your doorstep." },
        { title: "Safe and Hygienic Process", body: "All sample collection procedures follow proper hygiene and safety protocols without exposure to crowded environments.", quote: "Safety is ensured at every step." },
        { title: "Lab-Based Testing", body: "Collected samples are sent to certified laboratories for accurate analysis and reliable diagnostic results.", quote: "Accurate results support better treatment." },
        { title: "Regular Health Monitoring", body: "Tests can be scheduled once every six months to monitor key health parameters and detect any changes early.", quote: "Regular testing helps in early detection." },
        { title: "Report Delivery and Access", body: "Test reports are shared digitally and can also be delivered as physical copies for easy access.", quote: "Easy access to important health reports." },
        { title: "Convenience and Time Saving", body: "By avoiding hospital visits and waiting times, the service provides a comfortable and stress-free experience.", quote: "Convenience improves consistency in health checks." },
      ],
    },
    why: { heading: "Why this service is important", body: "Regular diagnostic tests play a key role in monitoring health and detecting potential issues early.\n\nFor seniors, visiting hospitals or labs frequently can be inconvenient and sometimes risky.\n\nWith home sample collection, these challenges are eliminated while maintaining accuracy and reliability.\n\nFor families living away, it provides reassurance that their parents' health is being checked regularly.", image: "/images/physio_3.jpg" },
  },
  "offline-events": {
    tagline: "Engaging Activities and Social Gatherings for Seniors",
    summary: "Staying socially active and engaged is essential for emotional well-being. Our Offline Events bring seniors together through meaningful activities, group interactions, and community gatherings, helping them stay connected, active, and involved in real-world experiences.",
    image: "/images/img2.jpg",
    stats: [
      { value: "Regular",     label: "Events"      },
      { value: "Community",   label: "Engagement"  },
      { value: "Interactive", label: "Activities"  },
      { value: "Local",       label: "Participation"},
    ],
    what: {
      heading: "What offline events include",
      items: [
        { title: "Social Gatherings", body: "Seniors can participate in organized meetups and group interactions, helping them connect with others.", quote: "Meeting others creates a sense of belonging." },
        { title: "Recreational Activities", body: "Events include light physical activities, games, or cultural programs that keep seniors active and engaged.", quote: "Active participation supports overall well-being." },
        { title: "Learning and Awareness Sessions", body: "Informative sessions on health, lifestyle, or general topics keep seniors informed and mentally stimulated.", quote: "Learning keeps the mind sharp and engaged." },
        { title: "Safe and Organized Environment", body: "All events are planned with safety and comfort in mind, ensuring seniors can participate without stress.", quote: "Comfort and safety are always prioritized." },
        { title: "Encouraging Social Interaction", body: "Events are designed to encourage communication and participation, helping reduce loneliness.", quote: "Interaction brings positivity and connection." },
        { title: "Support for Participation", body: "Assistance and guidance are provided to ensure seniors can attend and participate comfortably.", quote: "Support ensures everyone can take part." },
      ],
    },
    why: { heading: "Why this service is important", body: "As parents grow older, opportunities for social interaction may reduce, leading to feelings of isolation.\n\nParticipating in offline events helps them stay socially active and connected with others.\n\nThese interactions improve emotional well-being, boost confidence, and create a sense of belonging.\n\nFor families living away, it provides reassurance that their parents are actively involved in a supportive community.", image: "/images/iStock-1183276890.jpg" },
  },
  "gait-analysis": {
    tagline: "Assessing Movement for Better Mobility and Safety",
    summary: "As people age, changes in walking patterns can indicate underlying health or mobility issues. Gait Analysis helps evaluate how seniors walk, identify risks such as imbalance or instability, and provide guidance to improve movement and prevent falls.",
    image: "/images/hero_physio1.jpg",
    stats: [
      { value: "Yearly",       label: "Assessment" },
      { value: "Mobility",     label: "Focus"      },
      { value: "Preventive",   label: "Approach"   },
      { value: "Professional", label: "Evaluation" },
    ],
    what: {
      heading: "What the gait analysis includes",
      items: [
        { title: "Walking Pattern Assessment", body: "The way a senior walks is carefully observed and analyzed to identify irregularities such as imbalance or reduced stability.", quote: "Movement patterns reveal important health insights." },
        { title: "Balance and Stability Evaluation", body: "Balance and coordination are assessed to understand the risk of falls and mobility challenges.", quote: "Better balance leads to safer movement." },
        { title: "Identification of Mobility Risks", body: "Potential risks such as weakness, posture issues, or joint limitations are identified early for timely corrective measures.", quote: "Early identification helps prevent complications." },
        { title: "Recommendations for Improvement", body: "Guidance is provided on exercises, posture correction, or lifestyle adjustments to improve walking ability.", quote: "Simple improvements can enhance mobility." },
        { title: "Monitoring Over Time", body: "Yearly assessments help track changes in mobility and detect any decline before it becomes serious.", quote: "Regular monitoring supports long-term mobility." },
        { title: "Support for Fall Prevention", body: "By understanding gait and balance, preventive measures can be taken to reduce the risk of falls and related injuries.", quote: "Prevention is key to avoiding injuries." },
      ],
    },
    why: { heading: "Why this service is important", body: "Changes in walking patterns are often early indicators of health or mobility issues in seniors.\n\nIf left unnoticed, these changes can increase the risk of falls and injuries.\n\nA structured gait analysis helps identify such risks early and provides guidance to improve movement.\n\nFor families living away, it provides reassurance that their parents' mobility and safety are being monitored.\n\nThis leads to better independence, reduced fall risk, and improved quality of life.", image: "/images/nurse 5.jpg" },
  },
};

/* ── Reusable scroll-reveal ── */
function Reveal({ children, delay = 0, y = 28 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ServiceDetail() {
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { slug }  = useParams();
  const location = useLocation();
  const navigate  = useNavigate();
  const service   = ALL_SERVICES.find(s => s.slug === slug);
  const content   = SERVICE_CONTENT[slug] || null;
  const pal       = GLOBAL_PALETTE;
  const siblings  = service
    ? ALL_SERVICES.filter(s => s.cat === service.cat && s.slug !== slug).slice(0, 3)
    : [];
  const serviceIndex = ALL_SERVICES.findIndex(s => s.slug === slug) + 1;

  const seo = SERVICE_SEO[slug] || {};
  useMetaTags(
    seo.title || `${service?.name} | 60 Plus India`,
    seo.description || service?.description,
    seo.keywords || `${service?.name}, 60 plus india`
  );

  useEffect(() => {
    if (!service) return;
    const scriptId = 'service-jsonld';
    document.getElementById(scriptId)?.remove();
    const jsonld = SERVICE_JSONLD[slug] || {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": service.name,
      "provider": {
        "@type": "LocalBusiness",
        "name": "60Plus India",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot No 22, Rajalakshmi Nagar, Velacheri",
          "addressLocality": "Chennai",
          "addressRegion": "TN",
          "postalCode": "600042",
          "addressCountry": "IN"
        }
      },
      "areaServed": { "@type": "State", "name": "Tamil Nadu" },
      "description": seo.description || service.description,
      "offers": { "@type": "Offer", "description": "Part of the 21-service Premium Plan", "price": "200.00", "priceCurrency": "USD" }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.textContent = JSON.stringify(jsonld);
    document.head.appendChild(script);
    return () => document.getElementById(scriptId)?.remove();
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) { alert('Please fill in both name and mobile number'); return; }
    const mobileRegex = /^[0-9]{10,15}$/;
    if (!mobileRegex.test(formData.mobile)) { alert('Please enter a valid mobile number'); return; }
    setFormSubmitted(true);
  };

  const handleClosePopup = () => {
    setShowSubscribeForm(false);
    setFormSubmitted(false);
    setFormData({ name: '', mobile: '' });
  };

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!service) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg,#fff 0%,#f6f2ff 100%)", fontFamily: "'Nunito Sans',sans-serif" }}>
      <motion.div style={{ textAlign: "center", padding: "0 24px" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#8235d0", textTransform: "uppercase", marginBottom: 20 }}>Not found</p>
        <h2 style={{ fontFamily: '"Gambarino",serif', fontSize: 40, color: "#1a0a2e", marginBottom: 14, fontWeight: 500 }}>This page doesn't exist</h2>
        <p style={{ color: "rgba(26,10,46,.5)", marginBottom: 36, fontSize: 16 }}>Browse all 21 services on our home page.</p>
        <button onClick={() => navigate("/")} style={{ padding: "15px 36px", borderRadius: 50, background: "linear-gradient(94deg,#8235d0,#5f308e)", color: "#fff", fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer" }}>Back to Home</button>
      </motion.div>
    </div>
  );

  return (
    <div className="sd">
      <Navbar alwaysWhite />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sd {
          min-height: 100vh;
          background: #ffffff;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          overflow-x: hidden;
          padding-top: 76px;
        }

        .w { max-width: 1080px; margin: 0 auto; padding: 0 24px; }

        .sd-nav {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 34px 0 0; gap: 12px; flex-wrap: wrap;
        }
        .sd-back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 700; color: rgba(26,10,46,.38);
          background: none; border: none; cursor: pointer;
          transition: color .18s, gap .18s;
        }
        .sd-back-btn:hover { color: #8235d0; gap: 10px; }

        /* ── HERO ── */
        .sd-hero {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 88px; align-items: center;
          padding: 64px 0 88px;
        }
        .sd-index-label {
          font-size: 11px; font-weight: 800; letter-spacing: 2px;
          color: rgba(26,10,46,.25); text-transform: uppercase;
          margin-bottom: 12px;
        }
        .sd-cat-tag {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: 6px; margin-bottom: 22px;
          font-size: 11px; font-weight: 800; letter-spacing: 1.2px;
          text-transform: uppercase; border: 1px solid;
        }
        .sd-h1 {
          font-family: "Gambarino", serif;
          font-size: clamp(36px, 4.2vw, 56px);
          font-weight: 500; line-height: 1.1;
          letter-spacing: -.5px; color: #1a0a2e;
          margin-bottom: 20px;
        }
        .sd-tagline {
          font-size: 14px; font-weight: 800;
          letter-spacing: .4px; margin-bottom: 16px;
        }
        .sd-summary {
          font-size: 17px; line-height: 1.82;
          color: #1a0a2e; font-weight: 500;
          margin-bottom: 40px;
        }

        /* ── STATS - fixed single-line layout ── */
        .sd-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px; /* 🔥 adds breathing space */
  border-top: 1px solid rgba(26,10,46,.08);
  padding-top: 24px;
}
        .sd-stat {
          
  padding-right: 0;
  border-right: none;
}
          min-width: 0;
          overflow: hidden;
        }
        .sd-stat:last-child {
          border-right: none;
          padding-right: 0;
        }
        .sd-stat-val {
          font-size: 16px;
          font-weight: 800;
          color: #1a0a2e;
          letter-spacing: -.1px;
          line-height: 1.3;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sd-stat-lbl {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: rgba(26,10,46,.32);
          line-height: 1.3;
          white-space: nowrap;
        }

        .sd-cs {
          display: inline-flex; align-items: flex-start; gap: 13px;
          padding: 18px 22px; border-radius: 14px;
          border: 1px solid rgba(130,53,208,.12);
          background: rgba(130,53,208,.04);
        }
        .sd-cs strong { display: block; font-size: 15px; font-weight: 800; color: #1a0a2e; margin-bottom: 3px; }
        .sd-cs span { font-size: 13px; color: rgba(26,10,46,.45); line-height: 1.55; }

        .sd-img-frame {
          border-radius: 24px; overflow: hidden;
          aspect-ratio: 4/3; position: relative;
          background: rgba(130,53,208,.05);
        }
        .sd-img-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center center; display: block; }
        .sd-img-ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .sd-img-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 22px 26px;
          background: linear-gradient(to top, rgba(8,3,20,.75) 0%, transparent 100%);
          display: flex; align-items: flex-end; justify-content: space-between;
        }
        .sd-img-cat { font-size: 12px; font-weight: 700; color: rgba(255,255,255,.55); letter-spacing: .4px; }
        .sd-img-badge { font-size: 10px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,.82); background: rgba(255,255,255,.11); border: 1px solid rgba(255,255,255,.18); padding: 6px 12px; border-radius: 6px; }

        .sd-rule { border: none; border-top: 1px solid rgba(26,10,46,.07); }

        .sd-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 800; letter-spacing: 2.2px;
          text-transform: uppercase; color: #8235d0; margin-bottom: 14px;
        }
        .sd-eyebrow::before { content: ""; width: 24px; height: 1.5px; background: #8235d0; border-radius: 2px; flex-shrink: 0; }

        .sd-what { padding: 80px 0; }
        .sd-what-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 56px; gap: 12px; flex-wrap: wrap; }
        .sd-what-h2 { font-family: "Gambarino", serif; font-size: clamp(26px, 2.8vw, 38px); font-weight: 500; color: #1a0a2e; line-height: 1.15; }
        .sd-what-count { font-size: 13px; font-weight: 700; color: rgba(26,10,46,.28); white-space: nowrap; }

        .sd-newspaper { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 0; }
        .sd-spine { background: rgba(26,10,46,.07); width: 1px; }
        .sd-np-col { display: flex; flex-direction: column; }
        .sd-np-col-left  { padding-right: 52px; }
        .sd-np-col-right { padding-left: 52px; }
        .sd-np-item { padding: 32px 0; border-bottom: 1px solid rgba(26,10,46,.07); }
        .sd-np-item:last-child { border-bottom: none; }
        .sd-np-num { font-size: 13px; font-weight: 900; letter-spacing: 2px; color: #1a0a2e; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .sd-np-num-bar { display: inline-block; width: 18px; height: 3px; border-radius: 2px; flex-shrink: 0; }
        .sd-np-title { font-size: 19px; font-weight: 800; color: #1a0a2e; line-height: 1.25; letter-spacing: -.15px; margin-bottom: 12px; }
        .sd-np-body { font-size: 15px; line-height: 1.82; color: #1a0a2e; font-weight: 500; }
        .sd-np-quote { margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(26,10,46,.07); font-size: 13px; font-weight: 700; font-style: italic; line-height: 1.5; }

        .sd-why { padding: 80px 0; }
        .sd-why-grid { display: grid; grid-template-columns: 5fr 4fr; gap: 80px; align-items: center; }
        .sd-why-h2 { font-family: "Gambarino", serif; font-size: clamp(24px, 2.6vw, 34px); font-weight: 500; color: #1a0a2e; line-height: 1.2; margin-bottom: 20px; }
        .sd-why-body { font-size: 16px; line-height: 1.9; color: #1a0a2e; font-weight: 500; white-space: pre-line; }
        .sd-why-frame { border-radius: 20px; overflow: hidden; aspect-ratio: 4/3; }
        .sd-why-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center center; display: block; }

        .sd-cta-sec { padding: 0 0 88px; }
        .sd-cta {
          background: #1a0a2e; border-radius: 22px; padding: 52px 56px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 36px; flex-wrap: wrap; position: relative; overflow: hidden;
        }
        .sd-cta::before { content: ""; position: absolute; top: -90px; right: -90px; width: 300px; height: 300px; border-radius: 50%; background: rgba(130,53,208,.12); pointer-events: none; }
        .sd-cta::after { content: ""; position: absolute; bottom: -60px; left: -60px; width: 200px; height: 200px; border-radius: 50%; background: rgba(130,53,208,.07); pointer-events: none; }
        .sd-cta-eyebrow { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,.85); margin-bottom: 10px; }
        .sd-cta-h3 { font-family: "Gambarino", serif; font-size: clamp(20px, 2vw, 28px); font-weight: 500; color: #fff; line-height: 1.2; margin-bottom: 8px; }
        .sd-cta-sub { font-size: 14px; color: rgba(255,255,255,.85); font-weight: 600; }
        .sd-cta-right { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex-shrink: 0; position: relative; z-index: 1; }
        .sd-cta-btn { padding: 18px 44px; border-radius: 50px; background: linear-gradient(94deg, #8235d0, #5f308e); color: #fff; font-weight: 800; font-size: 16px; border: none; cursor: pointer; white-space: nowrap; transition: transform .2s; }
        .sd-cta-btn:hover { transform: translateY(-2px); }
        .sd-cta-note { font-size: 11px; color: rgba(255,255,255,.18); font-weight: 600; }

        .sd-related { padding: 0 0 100px; }
        .sd-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .sd-rel-card { background: #fff; border: 1px solid rgba(26,10,46,.07); border-radius: 18px; padding: 28px 24px 22px; cursor: pointer; text-align: left; width: 100%; transition: border-color .25s, box-shadow .25s, transform .25s; }
        .sd-rel-card:hover { border-color: rgba(130,53,208,.16); box-shadow: 0 10px 32px rgba(130,53,208,.07); transform: translateY(-4px); }
        .sd-rel-icon { margin-bottom: 14px; }
        .sd-rel-name { font-family: "Gambarino", serif; font-size: 17px; font-weight: 500; color: #1a0a2e; line-height: 1.3; margin-bottom: 6px; }
        .sd-rel-cat { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: rgba(26,10,46,.28); margin-bottom: 16px; }
        .sd-rel-link { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 800; color: #8235d0; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .w { padding: 0 24px; }
          .sd-hero { grid-template-columns: 1fr; gap: 44px; padding: 44px 0 64px; }
          .sd-img-frame { aspect-ratio: 4/3; }
          .sd-stats { grid-template-columns: repeat(2, 1fr); gap: 20px 0; }
          .sd-stat { border-right: none; padding-right: 0; border-bottom: 1px solid rgba(26,10,46,.07); padding-bottom: 14px; }
          .sd-stat:nth-child(2n) { border-bottom: 1px solid rgba(26,10,46,.07); }
          .sd-stat:last-child { border-bottom: none; }
          .sd-stat-val { font-size: 14px; white-space: normal; }
          .sd-newspaper { grid-template-columns: 1fr; }
          .sd-spine { display: none; }
          .sd-np-col-left { padding-right: 0; }
          .sd-np-col-right { padding-left: 0; }
          .sd-why-grid { grid-template-columns: 1fr; gap: 40px; }
          .sd-cta { flex-direction: column; align-items: flex-start; padding: 36px 32px; }
          .sd-cta-right { align-items: flex-start; }
          .sd-related-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .sd-h1 { font-size: 30px; }
          .sd-related-grid { grid-template-columns: 1fr; }
          .sd-cta { padding: 28px 22px; }
          .sd-stats { grid-template-columns: repeat(2, 1fr); }
        }

        /* SUBSCRIPTION POPUP */
        .popup-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .popup-content { background: white; border-radius: 16px; padding: 32px; max-width: 480px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.15); max-height: 90vh; overflow-y: auto; position: relative; }
        .popup-close { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; border-radius: 50%; background: #f8f5ff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #8235d0; font-weight: bold; font-size: 16px; transition: all 0.2s ease; }
        .popup-close:hover { background: #8235d0; color: white; }
        .subscribe-form h3 { font-family: "Gambarino", serif; font-size: 24px; color: #1a0a2e; margin: 0 0 4px; text-align: center; font-weight: 500; }
        .subscribe-form .subtitle { text-align: center; color: rgba(26,10,46,.6); font-size: 14px; margin-bottom: 24px; font-weight: 500; }
        .form-group { margin-bottom: 20px; position: relative; }
        .form-group label { display: block; font-size: 14px; font-weight: 600; color: #1a0a2e; margin-bottom: 8px; }
        .form-group input { width: 100%; padding: 14px 14px 14px 44px; border: 2px solid rgba(26,10,46,0.1); border-radius: 12px; font-size: 15px; font-family: 'Nunito Sans', sans-serif; color: #1a0a2e; box-sizing: border-box; transition: all 0.2s ease; background: #fafafa; }
        .form-group input:focus { outline: none; border-color: #8235d0; background: white; }
        .form-group input::placeholder { color: rgba(26,10,46,0.4); }
        .form-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #8235d0; z-index: 1; display: flex; align-items: center; justify-content: center; }
        .form-actions { display: flex; gap: 12px; margin-top: 4px; }
        .submit-btn, .cancel-btn { flex: 1; padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; border: none; font-family: 'Nunito Sans', sans-serif; transition: all 0.2s ease; }
        .submit-btn { background: linear-gradient(94deg, #8235d0, #5f308e); color: white; }
        .submit-btn:hover { background: linear-gradient(94deg, #7a2bc4, #562aa0); }
        .cancel-btn { background: #f8f5ff; color: #8235d0; border: 2px solid rgba(130,53,208,0.2); }
        .cancel-btn:hover { background: #f0e6ff; }
        .success-content { text-align: center; padding-top: 6px; }
        .success-content .success-icon { width: 50px; height: 50px; background: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #4caf50; }
        .success-content h3 { font-family: "Gambarino", serif; font-size: 24px; color: #1a0a2e; margin: 0 0 10px; font-weight: 500; }
        .success-content p { font-size: 15px; color: #1a0a2e; margin: 0 0 24px; line-height: 1.5; font-weight: 500; }
        .whatsapp-support { margin: 24px 0; }
        .whatsapp-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; background: #25D366; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 15px; transition: all 0.2s ease; border: none; cursor: pointer; }
        .whatsapp-btn:hover { background: #128C7E; }
        .payment-note { background: #f8f9fa; padding: 12px; border-radius: 8px; font-size: 13px; color: #666; margin: 24px 0; font-style: italic; border: 1px solid #e0e0e0; }
        .close-btn { padding: 12px 28px; background: #8235d0; color: white; border: none; border-radius: 12px; font-size: 15px; cursor: pointer; margin-top: 12px; font-weight: 700; transition: all 0.2s ease; }
        .close-btn:hover { background: #7a2bc4; }
        @media (max-width: 768px) {
          .popup-content { margin: 20px; padding: 28px 20px; }
          .form-actions { flex-direction: column; }
          .whatsapp-btn { width: 100%; }
        }
      `}</style>

      <Breadcrumb items={[{ label: "Services", href: "/#services" }, { label: service.name }]} />

      <div className="w"></div>

      {/* ═══ HERO ═══ */}
      <div className="w">
        <div className="sd-hero">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
            <div className="sd-index-label">Service {String(serviceIndex).padStart(2, "0")} of {ALL_SERVICES.length}</div>
            <div className="sd-cat-tag" style={{ background: pal.light, color: pal.accent, borderColor: pal.border }}>
              <span style={{ display: "flex", alignItems: "center" }}>{service.icon}</span>
              {service.cat}
            </div>
            <h1 className="sd-h1">{service.name}</h1>
            {content ? (
              <>
                <p className="sd-tagline" style={{ color: pal.accent }}>{content.tagline}</p>
                <p className="sd-summary">{content.summary}</p>
              </>
            ) : (
              <p className="sd-summary">{service.description}</p>
            )}
            {content?.stats ? (
              <div className="sd-stats">
                {content.stats.map((s, i) => (
                  <div className="sd-stat" key={i}>
                    <div className="sd-stat-val">{s.value}</div>
                    <div className="sd-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="sd-cs">
                <Clock size={18} color="#8235d0" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Full guide coming soon</strong>
                  <span>We're preparing a detailed page for this service. Subscribe to stay updated.</span>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
            <div className="sd-img-frame">
              {content?.image
                ? <img src={content.image} alt={service.name} />
                : (
                  <div className="sd-img-ph" style={{ background: pal.light }}>
                    <div style={{ color: pal.accent, opacity: 0.13, transform: "scale(5.5)" }}>{service.icon}</div>
                  </div>
                )
              }
              <div className="sd-img-bar">
                <span className="sd-img-cat">{service.cat}</span>
                <span className="sd-img-badge">60Plus Premium</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <hr className="sd-rule" />

      {/* ═══ WHAT'S INCLUDED ═══ */}
      {content?.what && (
        <>
          <div className="w">
            <div className="sd-what">
              <Reveal>
                <div className="sd-what-head">
                  <div>
                    <div className="sd-eyebrow">What's included</div>
                    <h2 className="sd-what-h2">{content.what.heading}</h2>
                  </div>
                  <span className="sd-what-count">{content.what.items.length} areas of care per visit</span>
                </div>
              </Reveal>
              <div className="sd-newspaper">
                <div className="sd-np-col sd-np-col-left">
                  {content.what.items.filter((_, i) => i % 2 === 0).map((item, i) => (
                    <Reveal key={i} delay={i * 0.07} y={18}>
                      <div className="sd-np-item">
                        <div className="sd-np-num"><span className="sd-np-num-bar" style={{ background: pal.accent }} />{String(i * 2 + 1).padStart(2, "0")}</div>
                        <div className="sd-np-title">{item.title}</div>
                        <p className="sd-np-body">{item.body}</p>
                        {item.quote && <p className="sd-np-quote" style={{ color: pal.accent }}>{item.quote}</p>}
                      </div>
                    </Reveal>
                  ))}
                </div>
                <div className="sd-spine" />
                <div className="sd-np-col sd-np-col-right">
                  {content.what.items.filter((_, i) => i % 2 !== 0).map((item, i) => (
                    <Reveal key={i} delay={i * 0.07 + 0.04} y={18}>
                      <div className="sd-np-item">
                        <div className="sd-np-num"><span className="sd-np-num-bar" style={{ background: pal.accent }} />{String(i * 2 + 2).padStart(2, "0")}</div>
                        <div className="sd-np-title">{item.title}</div>
                        <p className="sd-np-body">{item.body}</p>
                        {item.quote && <p className="sd-np-quote" style={{ color: pal.accent }}>{item.quote}</p>}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <hr className="sd-rule" />
        </>
      )}

      {/* ═══ WHY IT MATTERS ═══ */}
      {content?.why && (
        <>
          <div className="w">
            <div className="sd-why">
              <div className="sd-why-grid">
                <Reveal>
                  <div>
                    <div className="sd-eyebrow">Why it matters</div>
                    <h2 className="sd-why-h2">{content.why.heading}</h2>
                    <p className="sd-why-body">{content.why.body}</p>
                  </div>
                </Reveal>
                <Reveal delay={0.1} y={20}>
                  <div className="sd-why-frame"><img src={content.why.image} alt="Why it matters" /></div>
                </Reveal>
              </div>
            </div>
          </div>
          <hr className="sd-rule" />
        </>
      )}

      {/* ═══ CTA ═══ */}
      <div className="w">
        <div style={{ height: 68 }} />
        <Reveal>
          <div className="sd-cta">
            <div style={{ position: "relative", zIndex: 1 }}>
              <p className="sd-cta-eyebrow">60Plus Premium Plan</p>
              <h3 className="sd-cta-h3">This service is part of one complete plan</h3>
              <p className="sd-cta-sub">All 21 services included - $100 per month</p>
            </div>
            <div className="sd-cta-right">
              <button className="sd-cta-btn" onClick={() => navigate('/subscription#pricing')}>Subscribe Now</button>
            </div>
          </div>
        </Reveal>
        <div style={{ height: 80 }} />
      </div>

      {/* ═══ RELATED ═══ */}
      {siblings.length > 0 && (
        <>
          <hr className="sd-rule" />
          <div className="w">
            <div className="sd-related">
              <div style={{ height: 64 }} />
              <Reveal><div className="sd-eyebrow" style={{ marginBottom: 22 }}>More in {service.cat}</div></Reveal>
              <div className="sd-related-grid">
                {siblings.map((s, i) => (
                  <Reveal key={s.slug} delay={i * 0.07} y={18}>
                    <button className="sd-rel-card" onClick={() => navigate(`/services/${s.slug}`)}>
                      <div className="sd-rel-icon" style={{ color: pal.accent }}>{s.icon}</div>
                      <div className="sd-rel-name">{s.name}</div>
                      <div className="sd-rel-cat">{s.cat}</div>
                      <span className="sd-rel-link">Learn more <ArrowRight size={12} /></span>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══ POPUP ═══ */}
      {showSubscribeForm && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={handleClosePopup}>×</button>
            {!formSubmitted ? (
              <div className="subscribe-form">
                <h3>Subscribe to Our Service</h3>
                <p className="subtitle">Fill in your details and our team will contact you shortly</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <svg className="form-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <div style={{ position: 'relative' }}>
                      <svg className="form-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>
                      <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Enter your mobile number" required />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" className="cancel-btn" onClick={handleClosePopup}>Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="success-content">
                <div className="success-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline></svg>
                </div>
                <h3>Thank You!</h3>
                <p>Our team will contact you within 24 hours.</p>
                <div className="whatsapp-support">
                  <a href={getWhatsAppUrl(slug)} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.386"/></svg>
                    Contact us for 24/7 Support
                  </a>
                </div>
                <div className="payment-note">We're working on the payment process</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}