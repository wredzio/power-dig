"use client";

import { useLocale } from "next-intl";
import { ChevronDown, Cpu, Mail, Phone, Shovel, Wrench, Zap } from "lucide-react";

import { ElectricBorder } from "@/components/ui/electric-border/electric-border";
import { Lightning } from "@/components/ui/lightning/lightning";
import { ShinyText } from "@/components/ui/shiny-text/shiny-text";

const ORANGE = "#C87722";

// ─── PowerDig Logo SVG ────────────────────────────────────────────────────────

function PowerDigLogo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* House outline */}
      <path
        d="M6 22L24 6L42 22V44H28V32H20V44H6V22Z"
        stroke={ORANGE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Lightning bolt P */}
      <path
        d="M22 14L16 24H21L19 34L30 22H25L22 14Z"
        fill={ORANGE}
        stroke={ORANGE}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Content Data ─────────────────────────────────────────────────────────────

const services = [
  {
    icon: <Zap size={32} color={ORANGE} />,
    titlePl: "Instalacje Elektryczne",
    titleEn: "Electrical Installations",
    descPl:
      "Montaż, naprawy, serwis i pomiary instalacji elektrycznych. Kompleksowe usługi dla domu i firmy.",
    descEn:
      "Installation, repairs, service and measurements of electrical systems. Full service for homes and businesses.",
    tagPl: "Instalacje",
    tagEn: "Electrical",
  },
  {
    icon: <Wrench size={32} color={ORANGE} />,
    titlePl: "Serwis AGD i Elektroniki",
    titleEn: "Appliance & Electronics",
    descPl:
      "Naprawy i serwis urządzeń AGD oraz sprzętu elektronicznego. Szybka diagnostyka i fachowa naprawa.",
    descEn:
      "Repairs and service of household appliances and electronic equipment. Fast diagnosis and expert repair.",
    tagPl: "Serwis",
    tagEn: "Service",
  },
  {
    icon: <Cpu size={32} color={ORANGE} />,
    titlePl: "Systemy Inteligentne",
    titleEn: "Smart Systems",
    descPl:
      "Monitoring CCTV, bramy automatyczne, domofony wideo i inteligentne instalacje domowe.",
    descEn:
      "CCTV monitoring, automatic gates, video intercoms and smart home installations.",
    tagPl: "Smart Home",
    tagEn: "Smart Home",
  },
  {
    icon: <Shovel size={32} color={ORANGE} />,
    titlePl: "Usługi Minikoparką",
    titleEn: "Mini Excavator",
    descPl:
      "Profesjonalne prace ziemne minikoparką. Przekopy pod kable, układanie rur i prace ogrodowe.",
    descEn:
      "Professional earthworks with mini excavator. Cable trenches, pipe laying and garden work.",
    tagPl: "Koparka",
    tagEn: "Excavator",
  },
];

const galleryItems = [
  {
    titlePl: "Rozdzielnia elektryczna",
    titleEn: "Electrical panel",
    gradient: "from-[#1a0a00] to-[#2d1a00]",
    accent: "#C87722",
    icon: "⚡",
  },
  {
    titlePl: "Instalacja inteligentnego domu",
    titleEn: "Smart home installation",
    gradient: "from-[#001a0a] to-[#00200f]",
    accent: "#22C877",
    icon: "🏠",
  },
  {
    titlePl: "System monitoringu CCTV",
    titleEn: "CCTV monitoring system",
    gradient: "from-[#00001a] to-[#000028]",
    accent: "#2277C8",
    icon: "📷",
  },
  {
    titlePl: "Naprawa urządzenia AGD",
    titleEn: "Appliance repair",
    gradient: "from-[#1a1a00] to-[#2a2a00]",
    accent: "#C8C822",
    icon: "🔧",
  },
  {
    titlePl: "Brama automatyczna",
    titleEn: "Automatic gate",
    gradient: "from-[#1a0010] to-[#280018]",
    accent: "#C82277",
    icon: "🚪",
  },
  {
    titlePl: "Prace minikoparką",
    titleEn: "Mini excavator work",
    gradient: "from-[#0d0800] to-[#1a1000]",
    accent: "#C87722",
    icon: "🚜",
  },
];

const minidiggerFeatures = [
  {
    pl: "Przekopy pod kable i rury",
    en: "Cable and pipe trenches",
  },
  {
    pl: "Prace fundamentowe i ziemne",
    en: "Foundation and earthwork",
  },
  {
    pl: "Wykopy pod szamba i zbiorniki",
    en: "Excavation for tanks and cisterns",
  },
  {
    pl: "Prace ogrodowe i niwelacja terenu",
    en: "Garden work and land leveling",
  },
  {
    pl: "Rozbiórka nawierzchni i odwodnienia",
    en: "Surface demolition and drainage",
  },
  {
    pl: "Dojazd na teren klienta",
    en: "On-site service at client location",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export function PowerDigPage() {
  const locale = useLocale();
  const pl = locale === "pl";

  const t = (textPl: string, textEn: string) => (pl ? textPl : textEn);

  return (
    <div
      style={{
        backgroundColor: "var(--pd-bg)",
        color: "var(--pd-text)",
        fontFamily: "var(--font-lato), system-ui, sans-serif",
      }}
    >
      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative flex min-h-[calc(100vh-72px)] flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--pd-bg)" }}
      >
        {/* Lightning backgrounds */}
        <div className="absolute inset-0 z-0 opacity-55">
          <Lightning hue={30} xOffset={-0.7} speed={0.2} intensity={0.9} size={0.8} />
        </div>
        <div className="absolute inset-0 z-0 opacity-40">
          <Lightning hue={28} xOffset={0.7} speed={0.15} intensity={0.7} size={1.0} />
        </div>

        {/* Vignette overlay — theme-aware (dark: dark overlay, light: warm overlay) */}
        <div className="pd-hero-vignette absolute inset-0 z-10" />

        {/* Diagonal bottom edge */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 h-24"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--pd-bg))",
          }}
        />

        {/* Hero content */}
        <div className="relative z-30 flex flex-col items-center px-6 text-center">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-4">
            <PowerDigLogo size={64} />
            <div className="text-left">
              <p
                className="text-xs font-bold uppercase tracking-[0.25em] text-[#C87722]"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                Daniel Głogowski
              </p>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--pd-text-muted)]">
                {t("Autoryzowany technik", "Certified Technician")}
              </p>
            </div>
          </div>

          {/* Main heading with ShinyText */}
          <h1
            className="mb-4 text-6xl font-black uppercase tracking-tight md:text-8xl"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            <ShinyText
              text="PowerDig"
              color={ORANGE}
              shineColor="#FFD166"
              speed={3.5}
              spread={100}
              className="leading-none"
            />
            <br />
            <ShinyText
              text="Serwis"
              color="#D4A45A"
              shineColor="#FFFFFF"
              speed={4}
              spread={110}
              className="text-5xl leading-none md:text-7xl"
            />
          </h1>

          {/* Tagline */}
          <p className="mb-2 max-w-xl text-lg font-light text-[var(--pd-text-muted)] md:text-xl">
            {t(
              "Elektryk, który robi więcej — od instalacji po koparkę.",
              "The electrician who does more — from installations to excavation.",
            )}
          </p>

          {/* Services quick list */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2 text-sm">
            {[
              t("Instalacje elektryczne", "Electrical"),
              t("Serwis AGD", "Appliances"),
              t("Smart Home", "Smart Home"),
              t("Minikoparką", "Excavation"),
            ].map((item) => (
              <span
                key={item}
                className="rounded-sm border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                style={{
                  borderColor: `${ORANGE}66`,
                  color: ORANGE,
                  backgroundColor: `${ORANGE}15`,
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="tel:795704504"
              className="group flex items-center justify-center gap-3 rounded-[6px] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0A0A0A] transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]"
              style={{
                backgroundColor: ORANGE,
                boxShadow: `0 0 0 rgba(200,119,34,0)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  `0 0 28px rgba(200,119,34,0.55)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  `0 0 0 rgba(200,119,34,0)`;
              }}
            >
              <Phone size={20} color="#0A0A0A" />
              <span>795‑704‑504</span>
            </a>
            <a
              href="#uslugi"
              className="group flex items-center justify-center gap-3 rounded-[6px] border px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98]"
              style={{ borderColor: `${ORANGE}88`, color: "var(--pd-text)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = ORANGE;
                el.style.borderColor = ORANGE;
                el.style.color = "#0A0A0A";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "";
                el.style.borderColor = `${ORANGE}88`;
                el.style.color = "";
              }}
            >
              <ChevronDown size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
              <span>{t("Nasze usługi", "Our services")}</span>
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-60">
          <ChevronDown size={20} color={ORANGE} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section id="uslugi" className="px-6 py-24" style={{ backgroundColor: "var(--pd-bg)" }}>
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <p
              className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: ORANGE }}
            >
              {t("Czym się zajmujemy", "What we do")}
            </p>
            <h2
              className="text-4xl font-black uppercase md:text-5xl"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {t("Nasze usługi", "Our services")}
            </h2>
            <div
              className="mx-auto mt-4 h-[2px] w-16"
              style={{ backgroundColor: ORANGE }}
            />
          </div>

          {/* Service cards with ElectricBorder */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ElectricBorder
                key={index}
                color={ORANGE}
                chaos={0.14}
                speed={1.1}
                borderRadius={4}
                className="h-full"
              >
                <div
                  className="flex h-full flex-col p-6"
                  style={{
                    backgroundColor: "var(--pd-bg-card)",
                    borderRadius: 4,
                    minHeight: 280,
                  }}
                >
                  {/* Tag */}
                  <span
                    className="mb-5 self-start rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: `${ORANGE}22`, color: ORANGE }}
                  >
                    {pl ? service.tagPl : service.tagEn}
                  </span>

                  {/* Icon */}
                  <div className="mb-4">{service.icon}</div>

                  {/* Title */}
                  <h3
                    className="mb-3 text-lg font-black uppercase leading-tight"
                    style={{ fontFamily: "var(--font-lato)" }}
                  >
                    {pl ? service.titlePl : service.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="mt-auto text-sm leading-relaxed text-[var(--pd-text-muted)]">
                    {pl ? service.descPl : service.descEn}
                  </p>
                </div>
              </ElectricBorder>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ABOUT SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section id="o-nas" className="relative overflow-hidden px-6 py-24" style={{ backgroundColor: "var(--pd-bg-section)" }}>
        {/* Background accent */}
        <div
          className="pointer-events-none absolute -right-32 top-0 h-full w-64 opacity-5"
          style={{
            background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)`,
            transform: "skewX(-15deg)",
          }}
        />

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Text side */}
            <div>
              <p
                className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: ORANGE }}
              >
                {t("O nas", "About us")}
              </p>
              <h2
                className="mb-6 text-4xl font-black uppercase leading-tight md:text-5xl"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {t("Daniel\nGłogowski", "Daniel\nGłogowski")}
              </h2>
              <div className="mb-6 h-[2px] w-16" style={{ backgroundColor: ORANGE }} />

              <p className="mb-4 leading-relaxed text-[var(--pd-text)]/70">
                {t(
                  "PowerDig Serwis to firma z wieloletnim doświadczeniem w branży elektrycznej i usługach technicznych. Specjalizujemy się w kompleksowej obsłudze instalacji elektrycznych, serwisie urządzeń AGD oraz nowoczesnych systemach inteligentnych.",
                  "PowerDig Serwis is a company with many years of experience in the electrical industry and technical services. We specialize in comprehensive electrical installation services, household appliance repair, and modern smart systems.",
                )}
              </p>
              <p className="mb-8 leading-relaxed text-[var(--pd-text)]/70">
                {t(
                  "Obsługujemy klientów indywidualnych i firmy na terenie całego regionu. Każde zlecenie realizujemy terminowo, z dbałością o najwyższą jakość i bezpieczeństwo.",
                  "We serve individual clients and businesses throughout the region. Every job is completed on time, with attention to the highest quality and safety standards.",
                )}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: "10+", labelPl: "Lat doświadczenia", labelEn: "Years of experience" },
                  { num: "500+", labelPl: "Zadowolonych klientów", labelEn: "Happy clients" },
                  { num: "24h", labelPl: "Czas reakcji", labelEn: "Response time" },
                ].map((stat) => (
                  <div key={stat.num} className="text-center">
                    <div
                      className="mb-1 text-3xl font-black"
                      style={{ color: ORANGE, fontFamily: "var(--font-lato)" }}
                    >
                      {stat.num}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[var(--pd-text-dim)]">
                      {pl ? stat.labelPl : stat.labelEn}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual side — Daniel's photo placeholder */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-sm blur-3xl"
                  style={{ backgroundColor: `${ORANGE}20` }}
                />
                {/* Portrait frame */}
                <div
                  className="relative overflow-hidden rounded-sm border"
                  style={{
                    borderColor: `${ORANGE}44`,
                    backgroundColor: "var(--pd-bg-card)",
                    width: 280,
                    height: 360,
                  }}
                >
                  {/* Silhouette */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ paddingBottom: 56 }}
                  >
                    <svg width="140" height="160" viewBox="0 0 140 160" fill="none">
                      <circle
                        cx="70"
                        cy="52"
                        r="32"
                        fill={`${ORANGE}18`}
                        stroke={`${ORANGE}44`}
                        strokeWidth="1.5"
                      />
                      <path
                        d="M5 160 C5 115 35 100 70 100 C105 100 135 115 135 160 Z"
                        fill={`${ORANGE}12`}
                        stroke={`${ORANGE}33`}
                        strokeWidth="1.5"
                      />
                    </svg>
                    <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[var(--pd-text-dim)]">
                      {t("Zdjęcie wkrótce", "Photo coming soon")}
                    </div>
                  </div>

                  {/* Corner brackets */}
                  <div
                    className="absolute left-3 top-3"
                    style={{
                      width: 20,
                      height: 20,
                      borderTop: `2px solid ${ORANGE}66`,
                      borderLeft: `2px solid ${ORANGE}66`,
                    }}
                  />
                  <div
                    className="absolute right-3 top-3"
                    style={{
                      width: 20,
                      height: 20,
                      borderTop: `2px solid ${ORANGE}66`,
                      borderRight: `2px solid ${ORANGE}66`,
                    }}
                  />

                  {/* Name plate */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 text-center"
                    style={{
                      backgroundColor: `${ORANGE}18`,
                      borderTop: `1px solid ${ORANGE}33`,
                    }}
                  >
                    <div
                      className="text-sm font-black uppercase tracking-widest"
                      style={{ color: ORANGE, fontFamily: "var(--font-lato)" }}
                    >
                      Daniel Głogowski
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-[var(--pd-text-dim)]">
                      {t("Właściciel · Elektryk SEP", "Owner · Certified Electrician")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MINI EXCAVATOR SECTION (dedicated, as requested)
      ══════════════════════════════════════════════════════════════ */}
      <section id="koparka" className="relative overflow-hidden px-6 py-24">
        {/* Diagonal background stripe */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, var(--pd-bg) 45%, var(--pd-bg-accent) 50%, var(--pd-bg) 55%)`,
          }}
        />

        {/* Top fade — blends with previous section */}
        <div
          className="absolute left-0 right-0 top-0 z-10 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, var(--pd-bg-section), transparent)" }}
        />

        {/* Bottom fade — blends into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to top, var(--pd-bg-section), transparent)" }}
        />

        {/* Orange bar accent left */}
        <div
          className="absolute left-0 top-0 z-0 h-full w-1"
          style={{ backgroundColor: ORANGE }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left: heading + description */}
            <div>
              <div
                className="mb-4 inline-flex items-center gap-3 border-l-4 pl-4 text-sm font-bold uppercase tracking-[0.2em]"
                style={{ borderColor: ORANGE, color: ORANGE }}
              >
                <Shovel size={20} />
                {t("Usługi specjalne", "Special services")}
              </div>

              <h2
                className="mb-6 text-4xl font-black uppercase leading-tight md:text-6xl"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {t("Usługi\nMinikoparką", "Mini\nExcavator\nServices")}
              </h2>

              <div className="mb-6 h-[2px] w-16" style={{ backgroundColor: ORANGE }} />

              <p className="mb-6 leading-relaxed text-[var(--pd-text)]/70">
                {t(
                  "Dysponujemy minikoparką, która pozwala realizować prace ziemne w trudno dostępnych miejscach. Idealna do prac instalacyjnych, ogrodowych i budowlanych.",
                  "We operate a mini excavator capable of earthwork in hard-to-reach places. Ideal for installation, garden and construction work.",
                )}
              </p>
              <p className="mb-8 leading-relaxed text-[var(--pd-text)]/70">
                {t(
                  "Mała szerokość robocza umożliwia pracę w ogrodach, przy budynkach i w miejscach, gdzie duży sprzęt nie ma wstępu.",
                  "The compact working width allows operation in gardens, next to buildings and in places inaccessible to large equipment.",
                )}
              </p>

              <a
                href="tel:795704504"
                className="inline-flex items-center justify-center gap-3 rounded-[6px] px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#0A0A0A] transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]"
                style={{ backgroundColor: ORANGE }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    `0 0 24px rgba(200,119,34,0.5)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
                }}
              >
                <Phone size={20} color="#0A0A0A" />
                {t("Zadzwoń i umów termin", "Call to book a date")}
              </a>
            </div>

            {/* Right: feature list */}
            <div>
              <div
                className="rounded-sm border p-8"
                style={{ borderColor: `${ORANGE}33`, backgroundColor: "var(--pd-bg-card)" }}
              >
                <h3
                  className="mb-6 text-sm font-bold uppercase tracking-[0.2em]"
                  style={{ color: ORANGE }}
                >
                  {t("Zakres prac", "Scope of work")}
                </h3>
                <ul className="space-y-4">
                  {minidiggerFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-xs font-black"
                        style={{ backgroundColor: ORANGE, color: "#0A0A0A" }}
                      >
                        ✓
                      </span>
                      <span className="text-[var(--pd-text-muted)]">{pl ? f.pl : f.en}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-8 border-t pt-6"
                  style={{ borderColor: `${ORANGE}22` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-sm text-xl"
                      style={{ backgroundColor: `${ORANGE}20` }}
                    >
                      🚜
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider" style={{ color: ORANGE }}>
                        {t("Miniekskawator Kubota", "Kubota Mini Excavator")}
                      </div>
                      <div className="text-xs text-[var(--pd-text-dim)]">
                        {t("Szerokość robocza: 1m | Głębokość: 1.8m", "Working width: 1m | Depth: 1.8m")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          GALLERY SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="galeria"
        className="px-6 py-24"
        style={{ backgroundColor: "var(--pd-bg-section)" }}
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <p
              className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: ORANGE }}
            >
              {t("Nasze realizacje", "Our work")}
            </p>
            <h2
              className="text-4xl font-black uppercase md:text-5xl"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {t("Galeria", "Gallery")}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-16" style={{ backgroundColor: ORANGE }} />
            <p className="mx-auto mt-4 max-w-md text-sm text-[var(--pd-text-dim)]">
              {t(
                "Zdjęcia naszych realizacji — instalacje elektryczne, systemy inteligentne i prace ziemne.",
                "Photos of our completed projects — electrical installations, smart systems and earthworks.",
              )}
            </p>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-sm bg-gradient-to-br ${item.gradient} aspect-[4/3] cursor-pointer`}
                style={{ border: `1px solid ${item.accent}22` }}
              >
                {/* Placeholder art */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="mb-3 text-5xl opacity-40">{item.icon}</span>
                  <div
                    className="h-[1px] w-12 opacity-30"
                    style={{ backgroundColor: item.accent }}
                  />
                </div>

                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(${item.accent}44 1px, transparent 1px), linear-gradient(90deg, ${item.accent}44 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(to top, ${item.accent}44, transparent)` }}
                >
                  <span className="text-sm font-bold uppercase tracking-wide text-white">
                    {pl ? item.titlePl : item.titleEn}
                  </span>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute right-3 top-3 h-4 w-4 rotate-45 opacity-60"
                  style={{ borderRight: `2px solid ${item.accent}`, borderTop: `2px solid ${item.accent}` }}
                />

                {/* Bottom label */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3 opacity-80 group-hover:opacity-0 transition-opacity"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
                >
                  <span className="text-xs text-white/70">{pl ? item.titlePl : item.titleEn}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-[var(--pd-text-dim)]">
            {t(
              "* Zdjęcia z realizacji zostaną dodane wkrótce",
              "* Project photos will be added soon",
            )}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONTACT SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section id="kontakt" className="relative overflow-hidden px-6 py-24" style={{ backgroundColor: "var(--pd-bg)" }}>

        <div className="relative mx-auto max-w-4xl text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ORANGE }}
          >
            {t("Skontaktuj się", "Get in touch")}
          </p>
          <h2
            className="mb-4 text-4xl font-black uppercase md:text-6xl"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("Kontakt", "Contact")}
          </h2>
          <div className="mx-auto mb-12 h-[2px] w-16" style={{ backgroundColor: ORANGE }} />

          {/* Big phone number */}
          <a
            href="tel:795704504"
            className="group mb-10 block transition-transform hover:scale-105"
          >
            <div
              className="mb-2 text-6xl font-black tracking-tight md:text-8xl"
              style={{
                color: ORANGE,
                fontFamily: "var(--font-lato)",
                textShadow: `0 0 60px ${ORANGE}66`,
              }}
            >
              795‑704‑504
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--pd-text-dim)] group-hover:text-[var(--pd-text)]/80 transition-colors">
              <Phone size={18} color={ORANGE} />
              {t("Zadzwoń teraz", "Call now")}
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:powerdig.serwis@gmail.com"
            className="group mb-12 flex items-center justify-center gap-3 text-lg text-[var(--pd-text)]/70 transition-colors hover:text-[var(--pd-text)]"
          >
            <Mail size={22} color={ORANGE} />
            <span className="border-b border-[var(--pd-text-dim)] pb-0.5 group-hover:border-[var(--pd-text-muted)] transition-colors">
              powerdig.serwis@gmail.com
            </span>
          </a>

          {/* Info cards */}
          <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
            {[
              {
                iconEl: <Phone size={24} color={ORANGE} />,
                titlePl: "Telefon",
                titleEn: "Phone",
                valuePl: "Pon–Sob, 7:00–18:00",
                valueEn: "Mon–Sat, 7:00–18:00",
              },
              {
                iconEl: <Zap size={24} color={ORANGE} />,
                titlePl: "Pilne naprawy",
                titleEn: "Emergency repairs",
                valuePl: "Szybki dojazd do klienta",
                valueEn: "Fast on-site response",
              },
              {
                iconEl: <Mail size={24} color={ORANGE} />,
                titlePl: "Email",
                titleEn: "Email",
                valuePl: "Odpowiedź w 24h",
                valueEn: "Response within 24h",
              },
            ].map((card) => (
              <div
                key={pl ? card.titlePl : card.titleEn}
                className="rounded-sm border p-5"
                style={{ borderColor: `${ORANGE}33`, backgroundColor: "var(--pd-bg-card)" }}
              >
                <div className="mb-3">{card.iconEl}</div>
                <div
                  className="mb-1 text-xs font-bold uppercase tracking-wider"
                  style={{ color: ORANGE }}
                >
                  {pl ? card.titlePl : card.titleEn}
                </div>
                <div className="text-sm text-[var(--pd-text-muted)]">{pl ? card.valuePl : card.valueEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
