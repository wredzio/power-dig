"use client";

import React, { useEffect, useState } from "react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler/animated-theme-toggler";
import { LocaleSwitcher } from "@/components/ui/locale-switcher/locale-switcher";
import { Logo } from "@/components/ui/logo/logo";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface NavigationLink {
  label: string;
  href: string;
  external?: boolean;
  isCtaButton?: boolean;
}

export interface HeaderProps {
  navigationLinks: NavigationLink[];
  className?: string;
}

export const Header = ({ navigationLinks, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMobileMenuOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith("#") || href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace(/^\/?#/, "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const header = document.querySelector("header");
        const headerHeight = header?.offsetHeight || 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({ top: targetPosition, behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 right-0 left-0 z-50 w-full",
          "transition-all duration-500",
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[#C87722]/60 after:to-transparent",
          isMobileMenuOpen || isScrolled ? "bg-background/60 backdrop-blur-md" : "bg-background/30 backdrop-blur-sm",
          !isMobileMenuOpen && isScrolled && "shadow-lg shadow-black/10",
          "px-6",
          className,
        )}
      >
        <div className="m-auto flex w-full max-w-7xl items-center justify-between py-5">
          <Link href="/" className="group shrink-0" aria-label="Strona główna">
            <Logo className="transition-opacity duration-200 group-hover:opacity-80" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Nawigacja główna">
            {navigationLinks.map((link, index) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              if (link.isCtaButton) {
                return (
                  <Link
                    key={`${link.href}-${index}`}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                      "inline-flex items-center rounded-[6px] px-5 py-2 text-sm font-semibold tracking-wide uppercase",
                      "transition-all duration-300",
                      "hover:scale-[1.04] hover:shadow-[0_0_20px_rgba(200,119,34,0.45)] active:scale-[0.97]",
                      "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={`${link.href}-${index}`}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group/link relative text-sm font-medium tracking-wide uppercase",
                    "transition-colors duration-300",
                    isActive
                      ? "text-secondary"
                      : "text-foreground/80 hover:text-foreground",
                    "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "bg-secondary absolute -bottom-1 left-0 h-[2px] transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover/link:w-full",
                    )}
                  />
                </Link>
              );
            })}
            <div className="bg-border ml-2 h-5 w-px" />
            <LocaleSwitcher />
            <div className="bg-border h-5 w-px" />
            <AnimatedThemeToggler />
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <AnimatedThemeToggler className="mr-2" />
            <LocaleSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "flex flex-col gap-1.5",
                "p-2",
                "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
              )}
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={cn(
                  "bg-foreground block h-0.5 w-6 transition-all duration-300",
                  isMobileMenuOpen && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "bg-foreground block h-0.5 w-6 transition-all duration-300",
                  isMobileMenuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "bg-foreground block h-0.5 w-6 transition-all duration-300",
                  isMobileMenuOpen && "-translate-y-2 -rotate-45",
                )}
              />
            </button>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden lg:hidden",
            "absolute top-full right-0 left-0",
            "bg-background border-border border-b",
            "origin-top transition-all duration-300 ease-in-out",
            "px-6",
            isMobileMenuOpen ? "visible max-h-screen opacity-100" : "invisible max-h-0 opacity-0",
          )}
        >
          <div className="m-auto w-full max-w-7xl">
            <nav
              className="flex max-h-[calc(100vh-6rem)] flex-col gap-1 overflow-y-auto p-4"
              aria-label="Nawigacja mobilna"
            >
              {navigationLinks.map((link, index) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                if (link.isCtaButton) {
                  return (
                    <Link
                      key={`mobile-${link.href}-${index}`}
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                        "mt-2 flex items-center justify-center rounded-[6px] px-4 py-3 text-base font-semibold tracking-wide uppercase",
                        "transition-all duration-200 ease-out",
                        "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={`mobile-${link.href}-${index}`}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "text-base font-medium",
                      "transition-colors duration-200 ease-out",
                      "border-l-2 px-4 py-3",
                      isActive ? "border-secondary text-secondary" : "border-transparent text-foreground hover:text-secondary hover:border-secondary/50",
                      "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
