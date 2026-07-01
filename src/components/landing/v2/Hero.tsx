import { HeroBackground } from "./hero/HeroBackground";
import { HeroContent } from "./hero/HeroContent";
import { HeroBrowser } from "./hero/HeroBrowser";
import { HeroMobileStack } from "./hero/HeroMobileStack";
import { HERO_TRUST } from "./hero/hero-data";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden bg-rr-bg">
      <HeroBackground />

      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
        <HeroContent />

        <div className="mt-14 w-full md:mt-16">
          <div className="hidden md:block">
            <HeroBrowser />
          </div>
          <HeroMobileStack />
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-rr-text-muted md:mt-14">
          {HERO_TRUST.map((note, i) => (
            <li key={note} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-rr-text-muted/50">
                  ·
                </span>
              )}
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
