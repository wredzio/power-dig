import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PowerDigServices } from "@/components/sections/powerdig/powerdig-services";
import { resolveIconName } from "@/components/ui/icon-name";

type Props = PageSectionItem<"servicesSection">;

export function SanityServicesSection(section: Props) {
  return (
    <PowerDigServices
      id={section.id ?? undefined}
      supra={section.supra ?? undefined}
      title={section.title ?? ""}
      subtitle={section.subtitle ?? undefined}
      services={(section.services ?? []).map((service) => ({
        icon: resolveIconName(service.icon, "Zap"),
        tag: service.tag ?? undefined,
        title: service.title ?? "",
        description: service.description ?? "",
        details: service.details ?? undefined,
        note: service.note ?? undefined,
      }))}
    />
  );
}
