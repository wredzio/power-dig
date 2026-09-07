import { getTranslations } from "next-intl/server";

import { Icon, type IconProps } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo/logo";
import { formatPhoneDisplay, toTelHref } from "@/lib/format-phone";

export interface FooterSectionProps {
  contact: {
    phone: string;
    address: string;
    email: string;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon: IconProps["name"];
  }>;
  tagline?: string;
  openingHours?: Array<{ days: string; time: string }>;
  footerNavLinks?: Array<{ label: string; href: string }>;
  footerNavLegalLinks?: Array<{ label: string; href: string }>;
}

export async function FooterSection({
  contact,
  socialLinks,
  tagline,
  openingHours,
  footerNavLinks,
  footerNavLegalLinks,
}: FooterSectionProps) {
  const [t, tFooter] = await Promise.all([getTranslations("common"), getTranslations("footer")]);

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <Logo className="h-20" />
            {tagline && <p className="text-secondary text-sm">{tagline}</p>}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted hover:bg-accent flex h-9 w-9 items-center justify-center transition-colors"
                    aria-label={social.platform}
                  >
                    <Icon name={social.icon} size={16} className="text-foreground" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-foreground text-sm font-bold tracking-widest uppercase">
              {t("contact")}
            </h2>
            <ul className="flex flex-col gap-3">
              {contact.phone && (
                <li className="flex items-start gap-2">
                  <Icon name="Phone" size={16} className="text-secondary mt-0.5 shrink-0" />
                  <a
                    href={toTelHref(contact.phone)}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {formatPhoneDisplay(contact.phone)}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-2">
                  <Icon name="MapPin" size={16} className="text-secondary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground text-sm">{contact.address}</p>
                </li>
              )}
              {contact.email && (
                <li className="flex items-start gap-2">
                  <Icon name="Mail" size={16} className="text-secondary mt-0.5 shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-muted-foreground text-sm underline underline-offset-2 hover:no-underline"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            {openingHours && openingHours.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="text-foreground text-sm font-bold tracking-widest uppercase">
                  {tFooter("openingHours")}
                </h2>
                <ul className="flex flex-col gap-1.5">
                  {openingHours.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Icon name="Clock" size={14} className="text-secondary shrink-0" />
                      <span className="text-muted-foreground text-sm">
                        <span className="text-foreground">{item.days}</span>
                        {" — "}
                        {item.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {footerNavLinks && footerNavLinks.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="text-foreground text-sm font-bold tracking-widest uppercase">
                  {tFooter("menu")}
                </h2>
                <ul className="flex flex-col gap-2">
                  {footerNavLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {footerNavLegalLinks && footerNavLegalLinks.length > 0 && (
              <ul className="flex flex-col gap-2">
                {footerNavLegalLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="border-border mt-10 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
