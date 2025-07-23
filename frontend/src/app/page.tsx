import { getLatestReviews, getStats } from "@/services/apiService";
import LatestReviews from "@/components/landing-page/LatestReviews";
import CtaSection from "@/components/landing-page/CtaSection";
import Hero from "@/components/landing-page/Hero";
import HowItWorks from "@/components/landing-page/HowItWorks";
import Stats from "@/components/landing-page/Stats";
import SectionDivider from "@/components/landing-page/SecionDivider";

export default async function Home() {

  const [latestReviews, stats] = await Promise.all([
    getLatestReviews(),
    getStats()
  ]);

  return (
    <>
      <Hero />

      <HowItWorks />

      <SectionDivider />

      <Stats stats={stats} />

      <SectionDivider />

      <LatestReviews reviews={latestReviews} />

      <SectionDivider />
      
      <CtaSection />
    </>
  );
}