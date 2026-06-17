import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './style.css';

import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import StickyBanner from './components/StickyBanner';
import ScrollToTop from './components/ScrollToTop';

import Subscription from './pages/Subscription';
import ServiceDetail from './pages/ServiceDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';
import Lottery from './pages/Lottery';
import BookFreeAssessment from './pages/BookFreeAssessment';
import LearnMore from './pages/LearnMore';
import Enquiry from './pages/Enquiry';
import HowOldAgeAffectsSeniors from './pages/blogs/HowOldAgeAffectsSeniors';
import BlogIndex from './pages/blogs/BlogIndex';
import WhenLivingAloneBecomesDifficult from './pages/blogs/WhenLivingAloneBecomesDifficult';
import EmergencySupportForSeniors from './pages/blogs/EmergencySupportForSeniors';
import EverydayTasksForSeniors from './pages/blogs/EverydayTasksForSeniors';
import ParentsNeedHelpMilesAway from './pages/blogs/ParentsNeedHelpMilesAway';
import RegularHealthCheckupsForSeniors from './pages/blogs/RegularHealthCheckupsForSeniors';
import SocialEmotionalSupportForSeniors from './pages/blogs/SocialEmotionalSupportForSeniors';
import HomeSafetyForSeniors from './pages/blogs/HomeSafetyForSeniors';
import ParentsSayTheyreFine from './pages/blogs/ParentsSayTheyreFine';

import PremiumLanding from './pages/PremiumLanding';

import Lenis from 'lenis';

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return null;
}

function AppInner() {
  const location = useLocation();
  const isLotteryPage = location.pathname === '/lottery';
  const isPremiumLanding = location.pathname === '/medical-advocacy';

  // Scroll to top on every route change (including refresh)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <SmoothScroll />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <Testimonials />
            </>
          }
        />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/lottery" element={<Lottery />} />
        <Route path="/book-free-senior-home-safety-assessment" element={<BookFreeAssessment />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/blogs" element={<BlogIndex />} />
        <Route path="/blogs/how-old-age-affects-seniors" element={<HowOldAgeAffectsSeniors />} />
        <Route path="/blogs/when-living-alone-becomes-difficult" element={<WhenLivingAloneBecomesDifficult />} />
        <Route path="/blogs/emergency-support-for-seniors" element={<EmergencySupportForSeniors />} />
        <Route path="/blogs/everyday-tasks-for-seniors" element={<EverydayTasksForSeniors />} />
        <Route path="/blogs/parents-need-help-miles-away" element={<ParentsNeedHelpMilesAway />} />
        <Route path="/blogs/regular-health-checkups-for-seniors" element={<RegularHealthCheckupsForSeniors />} />
        <Route path="/blogs/social-emotional-support-for-seniors" element={<SocialEmotionalSupportForSeniors />} />
        <Route path="/blogs/home-safety-for-seniors" element={<HomeSafetyForSeniors />} />
        <Route path="/blogs/parents-say-theyre-fine" element={<ParentsSayTheyreFine />} />
        <Route path="/medical-advocacy" element={<PremiumLanding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global components (hidden only on lottery page) */}
      {!isLotteryPage && !isPremiumLanding && <Footer />}
      {!isLotteryPage && !isPremiumLanding && <StickyBanner />}
      {!isLotteryPage && !isPremiumLanding && <WhatsAppFloat />}
      {!isLotteryPage && !isPremiumLanding && <ScrollToTop />}
    </>
  );
}

function App() {

  return (
    <Router basename={import.meta.env.BASE_URL} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <AppInner />
      </div>
    </Router>
  );
}

export default App;
