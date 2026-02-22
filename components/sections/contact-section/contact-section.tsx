import { Icon } from "@/components/ui/icon";

interface ContactSectionProps {
  title: string;
  phone: string;
  address: string;
  email: string;
  hours?: Array<{ days: string; time: string }>;
}

export const ContactSection = (props: ContactSectionProps) => {
  const { title, phone, address, email, hours } = props;

  const contactItems = [
    { icon: "Phone" as const, label: "Telefon:", value: phone },
    { icon: "MapPin" as const, label: "Adres:", value: address },
    { icon: "Mail" as const, label: "Email:", value: email, isLink: true },
  ];

  return (
    <div className="bg-primary px-4 py-12 md:px-6 lg:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <h2 className="text-primary-foreground text-3xl font-bold md:text-4xl lg:w-1/3 lg:shrink-0">
          {title}
        </h2>

        <div className="flex flex-col gap-4 lg:gap-6">
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <Icon name={item.icon} size={20} className="text-primary-foreground shrink-0" />
              <p className="text-primary-foreground text-base">
                <span className="font-medium">{item.label} </span>
                {item.isLink ? (
                  <a
                    href={`mailto:${item.value}`}
                    className="underline underline-offset-2 hover:no-underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </p>
            </div>
          ))}

          {hours && hours.length > 0 && (
            <div className="border-primary-foreground/20 mt-2 border-t pt-4">
              <div className="flex items-center gap-3">
                <Icon name="Clock" size={20} className="text-primary-foreground shrink-0" />
                <h3 className="text-primary-foreground text-base font-medium">Godziny otwarcia</h3>
              </div>
              <ul className="mt-2 flex flex-col gap-2 pl-8">
                {hours.map((entry, index) => (
                  <li key={index} className="text-primary-foreground text-base">
                    <span className="font-medium">{entry.days}:</span> {entry.time}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
