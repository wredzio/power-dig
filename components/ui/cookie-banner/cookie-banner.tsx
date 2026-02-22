"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

import { Link } from "@/i18n/navigation";

const COOKIE_NAME = "cookie-consent";
const COOKIE_VALUE = "accepted";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

// Module-level listener registry so accept() can trigger re-render
let listeners: Array<() => void> = [];

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function getSnapshot(): boolean | null {
  const match = document.cookie.match(new RegExp("(?:^|; )" + COOKIE_NAME + "=([^;]*)"));
  const value = match ? decodeURIComponent(match[1]) : undefined;
  return value === undefined ? null : value === COOKIE_VALUE;
}

function getServerSnapshot(): boolean | null {
  return null;
}

function setConsentCookie() {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(COOKIE_VALUE)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  listeners.forEach((l) => l());
}

export function CookieBanner() {
  const consented = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (consented === null) return null;

  return (
    <>
      {consented && (
        <>
          {/* Google Tag Manager */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GT-NM2F6SZ');`,
            }}
          />
          {/* Facebook Pixel — ID 1 */}
          <Script
            id="fb-pixel-1"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','986343965963627');fbq('track','PageView');`,
            }}
          />
          {/* Facebook Pixel — ID 2 */}
          <Script
            id="fb-pixel-2"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `fbq('init','450046774574770');fbq('track','PageView');`,
            }}
          />
        </>
      )}

      {consented === false && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4">
          <div className="mx-auto flex max-w-screen-lg flex-col items-start gap-4 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm text-foreground">
              Używamy plików cookie, aby zapewnić najlepsze doświadczenie na naszej stronie.
              Kontynuując przeglądanie, akceptujesz naszą{" "}
              <Link href="/privacy-policy" className="underline hover:text-secondary">
                politykę prywatności
              </Link>
              .
            </p>
            <button
              onClick={setConsentCookie}
              className="shrink-0 bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Akceptuję
            </button>
          </div>
        </div>
      )}
    </>
  );
}
