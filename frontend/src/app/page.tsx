import { getLatestReviews, getStats } from "@/services/apiService";
import LatestReviews from "@/components/landing-page/LatestReviews";
import CtaSection from "@/components/landing-page/CtaSection";
import Hero from "@/components/landing-page/Hero";
import HowItWorks from "@/components/landing-page/HowItWorks";
import Stats from "@/components/landing-page/Stats";

export default async function Home() {

  const [latestReviews, stats] = await Promise.all([
    getLatestReviews(),
    getStats()
  ]);

  return (
    <>
      <Hero />

      <HowItWorks />

      <Stats stats={stats} />
      
      <LatestReviews reviews={latestReviews} />

      <CtaSection />
    </>
  );
}