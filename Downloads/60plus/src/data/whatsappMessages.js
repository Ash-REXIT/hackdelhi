const WHATSAPP_NUMBER = "919499944939";

const WHATSAPP_MESSAGES = {
  "/": "Be my hands and eyes for my parents. How can we work together for them?",
  "/subscription": "I want the best for my parents. Help me manage their daily care as a team.",
  "/about": "I want to learn more about 60Plus India and how you can help my parents.",
  "/contact": "I'd like to reach out to your team. How can we work together for my parents?",
  "/privacy-policy": "I'd like to know more about how you protect my parents' data and privacy.",
  "/terms-and-conditions": "I'd like to review the terms before subscribing for my parents.",
  "subscription-popup": "Hi, I'm interested in the 60Plus Premium Plan. Could you share more details and guide me on the next steps?",

  // Service pages - keyed by slug
  "monthly-doctor-visit": "Help me monitor my parents' health at home. Let's keep them healthy together.",
  "24-7-emergency-call": "Be my local safety net. Please help my parents for me if they face a crisis.",
  "24-7-companion": "I don't want them to be lonely. Be my proxy for their daily company and care.",
  "monthly-care-executive-visit": "Visit my parents' home for me. Help me check if they are safe and happy.",
  "integrated-senior-health-index": "Let's track my parents' health in one place. Help me see how they are doing.",
  "senior-home-safety-assessment": "Help me check my parents' home and make it safer for me. I worry about falls.",
  "digitalization-of-medical-records": "Help me organize my parents' medical history. I need to see it with your help.",
  "voice-reminder-for-parents": "Help me remind my parents about their daily routine. Let's work together.",
  "daily-updates-to-children": "Give me daily updates on my parents for me. I want to feel close to them.",
  "free-online-community": "Help my parents stay social online. Let's work together to keep them happy.",
  "audiologist-home-visit": "Help me look after my parents' hearing. Visit them at home for me.",
  "medicine-delivery": "Manage my parents' medicines with me. Let's ensure they never miss a dose.",
  "senior-citizen-insurance-assessment": "Help me check my parents' insurance. Let's work together to protect them.",
  "velai-consultation": "Help me find a purpose for my parents. Let's keep them active together.",
  "trip-consultation": "Help me plan a safe trip for my parents. Be my support while they travel.",
  "nutrition-consultation": "Help me plan my parents' meals. Let's make sure they stay strong together.",
  "on-demand-services": "Be my hands for my parents' daily chores. Help me get their errands done.",
  "complimentary-products": "Help me give my parents useful gifts. Let's provide them comfort together.",
  "blood-test": "Help me arrange tests for my parents at home. Let's watch their health together.",
  "offline-events": "Help my parents make friends. Please include them in your meetups for me.",
  "gait-analysis": "Help me check my parents' walking balance. I need your eyes on their safety.",
};

/**
 * Build a WhatsApp URL with a page-specific prefill message.
 * Falls back to a generic message if the path isn't found.
 */
export function getWhatsAppUrl(key) {
  // Strip /services/ prefix so both full paths and bare slugs work
  const normalized = key.replace(/^\/services\//, "");
  const message = WHATSAPP_MESSAGES[normalized] || WHATSAPP_MESSAGES["/"];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
