import { ImageResponse } from "next/og";

import { LOGO_MARK } from "@/components/ui/logo/logo-mark-paths";
import { formatPhoneDisplay } from "@/lib/format-phone";
import { SITE } from "@/lib/site-config";
import { getSettings } from "@/sanity/lib/get-settings";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE.name;

const FONT_FAMILY = "Lato";
const FONT_WEIGHT = 900;

async function loadGoogleFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${FONT_FAMILY}:wght@${FONT_WEIGHT}&text=${encodeURIComponent(text)}`;
    const css = await fetch(cssUrl).then((r) => r.text());
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    return await fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

interface ImageProps {
  params: Promise<{ locale: string }>;
}

export default async function OpenGraphImage({ params }: ImageProps) {
  const { locale } = await params;
  const settings = await getSettings(locale);
  const title = settings?.title || SITE.shortName;
  const tagline = settings?.tagline || settings?.description || "";
  const phone = formatPhoneDisplay(settings?.phone || SITE.phone);
  // The card renders parts of the text in uppercase, so the font subset has
  // to include both cases of every character that appears.
  const text = `${title}${tagline}${phone}${SITE.ownerName}${settings?.mail || SITE.email}`;
  const fontData = await loadGoogleFont(`${text}${text.toUpperCase()}${text.toLowerCase()}`);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: `linear-gradient(135deg, ${SITE.backgroundColor} 0%, #1a0d00 100%)`,
        color: "#F5F0E8",
        fontFamily: fontData ? FONT_FAMILY : "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <svg width="64" height="106" viewBox={LOGO_MARK.viewBox}>
          <path d={LOGO_MARK.bolt} fill={LOGO_MARK.gradient.from} />
          <path d={LOGO_MARK.bowl} fill={LOGO_MARK.gradient.from} />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: SITE.brandColor,
              textTransform: "uppercase",
            }}
          >
            {SITE.ownerName}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 112,
            lineHeight: 1,
            fontWeight: FONT_WEIGHT,
            textTransform: "uppercase",
            letterSpacing: -2,
            color: SITE.brandColor,
          }}
        >
          {title}
        </div>
        {tagline && (
          <div style={{ fontSize: 34, color: "rgba(245,240,232,0.75)", maxWidth: 1000 }}>
            {tagline}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `2px solid ${SITE.brandColor}55`,
          paddingTop: 28,
          fontSize: 36,
        }}
      >
        <span style={{ color: SITE.brandColor, fontWeight: FONT_WEIGHT }}>{phone}</span>
        <span style={{ color: "rgba(245,240,232,0.6)", fontSize: 28 }}>
          {settings?.mail || SITE.email}
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: fontData
        ? [{ name: FONT_FAMILY, data: fontData, weight: FONT_WEIGHT, style: "normal" }]
        : undefined,
    },
  );
}
