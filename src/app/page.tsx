import dynamic from 'next/dynamic';
import { HeroChat } from '@/components/chat/HeroChat';
import { LiquidHero } from '@/components/ui/LiquidHero';
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BackToTop } from "@/components/ui/BackToTop";
import { profile } from "@/lib/profile";
import { getAvailableSections } from "@/lib/sections";
import { StoreInitializer } from "@/components/layout/StoreInitializer";

const DynamicPortfolio = dynamic(
  () => import('@/components/content/DynamicPortfolio').then(m => ({ default: m.DynamicPortfolio })),
  {
    loading: () => (
      <div className="space-y-8 animate-pulse">
        <div className="h-48 bg-surface border-2 border-border rounded-lg" />
        <div className="h-48 bg-surface border-2 border-border rounded-lg" />
      </div>
    )
  }
);

export default function Home() {
  const availableSections = getAvailableSections(profile);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white relative">
      <StoreInitializer availableSections={availableSections} />

      {/* Skip link for keyboard accessibility */}
      <a href="#portfolio" className="skip-link">
        Skip to main content
      </a>
      <BackToTop />
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <LiquidHero>
        <HeroChat />
      </LiquidHero>

      <article id="portfolio" className="min-h-screen w-full px-4 py-8 md:p-12 max-w-7xl mx-auto" aria-label="Portfolio content">

        <DynamicPortfolio profile={profile} />

      </article>
    </main>
  );
}
