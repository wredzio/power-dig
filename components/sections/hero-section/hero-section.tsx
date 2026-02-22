"use client";

import React from "react";

import { BlurText } from "@/components/ui/blur-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  description?: string | null;
  overlayOpacity?: number;
  ctaLabel?: string;
  ctaHref?: string;
  image?: React.ReactNode;
}

export const HeroSection = (props: HeroSectionProps) => {
  const { title, description, overlayOpacity = 60, ctaLabel, ctaHref, image } = props;

  return (
    <section className="bg-background relative flex min-h-[calc(100svh-4.5rem)] w-full items-center overflow-hidden">
      {/* Background image */}
      {image && (
        <div className="absolute inset-0">
          <div className="absolute inset-0">{image}</div>
          <div
            className="bg-background absolute inset-0"
            style={{ opacity: overlayOpacity / 100 }}
          />
        </div>
      )}

      {/* Bottom fade gradient */}
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-48 bg-gradient-to-t to-transparent" />

      {/* Content */}
      <div className="relative z-[2] mx-auto w-full max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <div className="flex max-w-4xl flex-col gap-8">
          <BlurText
            text={title}
            tag="h1"
            className={cn(
              "text-secondary text-6xl font-black uppercase tracking-tight",
              "md:text-7xl lg:text-8xl xl:text-9xl",
            )}
            animateBy="words"
            direction="bottom"
            delay={120}
          />

          {description && (
            <p className="text-muted-foreground animate-fade-in text-2xl uppercase leading-relaxed md:text-3xl lg:max-w-3xl">
              {description}
            </p>
          )}

          {ctaLabel && ctaHref && (
            <div className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group border-secondary text-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
              >
                <a href={ctaHref}>
                  {ctaLabel}
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>
              </Button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
