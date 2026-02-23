"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";

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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerH, setHeaderH] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const measure = () => setHeaderH(headerRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (!href.startsWith("#") && !href.startsWith("/#")) return;
    e.preventDefault();
    const id = href.replace(/^\/?#/, "");
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY - (headerRef.current?.offsetHeight ?? 0);
    window.scrollTo({ top, behavior: "smooth" });
    window.history.pushState(null, "", href);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 w-full px-6",
          "transition-all duration-300",
          "after:absolute after:inset-x-0 after:bottom-0 after:h-px",
          "after:bg-gradient-to-r after:from-transparent after:via-[#C87722]/60 after:to-transparent",
          scrolled || menuOpen
            ? "bg-background/90 shadow-lg shadow-black/20 backdrop-blur-md"
            : "bg-background/20 backdrop-blur-sm",
          className,
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between py-4">
          <Link href="/" className="group shrink-0" aria-label="Strona główna">
            <Logo className="transition-opacity duration-200 group-hover:opacity-80" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Nawigacja główna">
            {navigationLinks.map((link, i) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/");
              if (link.isCtaButton) {
                return (
                  <Link
                    key={i}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center rounded-sm bg-secondary px-5 py-2 text-sm font-semibold uppercase tracking-wide text-secondary-foreground transition-all duration-200 hover:scale-[1.04] hover:bg-secondary/90 hover:shadow-[0_0_20px_rgba(200,119,34,0.4)] active:scale-[0.97]"
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={i}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group/link relative text-sm font-medium uppercase tracking-wide transition-colors duration-200",
                    active ? "text-secondary" : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-[2px] bg-secondary transition-all duration-200",
                      active ? "w-full" : "w-0 group-hover/link:w-full",
                    )}
                  />
                </Link>
              );
            })}
            <div className="mx-2 h-5 w-px bg-border" />
            <LocaleSwitcher />
            <div className="h-5 w-px bg-border" />
            <AnimatedThemeToggler />
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <AnimatedThemeToggler />
            <LocaleSwitcher />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center"
            >
              <div className="flex h-5 w-6 flex-col justify-between">
                <span
                  className={cn(
                    "block h-0.5 w-full origin-center bg-foreground transition-all duration-300",
                    menuOpen && "translate-y-[9px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-full bg-foreground transition-all duration-300",
                    menuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-full origin-center bg-foreground transition-all duration-300",
                    menuOpen && "-translate-y-[9px] -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/*
        Mobile menu panel — fixed inset-0, z-40 (below header z-50).
        Header stays visible on top at all times.
        No body scroll lock needed — panel covers entire screen so
        touch events never reach the document below.
        paddingTop pushes nav content below the header bar.
      */}
      <div
        className={cn(
          "fixed inset-0 z-40 overflow-y-auto overscroll-contain lg:hidden",
          "bg-background",
          "transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-y-0" : "-translate-y-full",
        )}
        style={{ paddingTop: headerH }}
      >
        <nav
          className="mx-auto w-full max-w-7xl space-y-1 px-6 py-6"
          aria-label="Nawigacja mobilna"
        >
          {navigationLinks.map((link, i) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            if (link.isCtaButton) {
              return (
                <Link
                  key={i}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="mt-3 flex items-center justify-center rounded-sm bg-secondary px-4 py-4 text-base font-semibold uppercase tracking-wide text-secondary-foreground"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <Link
                key={i}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "block border-l-2 px-4 py-4 text-lg font-medium transition-colors duration-200",
                  active
                    ? "border-secondary text-secondary"
                    : "border-transparent text-foreground/80 hover:border-secondary/50 hover:text-secondary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};
