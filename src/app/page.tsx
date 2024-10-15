'use client'

import AiAdvisor from '@/components/Home/aiAdvisor';
import BuisnessPlanSection from '@/components/Home/busiessPlan';
import FeaturesSection from '@/components/Home/feature';
import Footer from '@/components/Home/footer';
import HeroSection from '@/components/Home/heroSection';
import HowItWorksSection from '@/components/Home/howItWorks';
import PlanSection from '@/components/Home/planSection';
import { InfiniteMovingCardsDemo } from '@/components/Home/reviewSection';
import ToolsSection from '@/components/Home/toolsSection';


export default  function Home() {
  
  
  return (
   <main>
     <HeroSection />
      <ToolsSection />
      <BuisnessPlanSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AiAdvisor />
      <PlanSection />
      <InfiniteMovingCardsDemo />
      <Footer />
   </main>
  ); 
}

