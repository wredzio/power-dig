import { Icon, type IconProps } from "@/components/ui/icon";

interface Feature {
  icon?: IconProps["name"];
  title: string;
  description?: string;
}

interface AboutSectionProps {
  title: string;
  description?: string;
  features?: Feature[];
}

export const AboutSection = (props: AboutSectionProps) => {
  const { title, description, features } = props;

  return (
    <div className="relative py-16 lg:py-24">
      {/* Warm ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header — centered, editorial */}
        <div className="mb-14 text-center lg:mb-16">
          <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
          <div className="mx-auto mt-5 h-px w-12 bg-gradient-to-r from-transparent via-secondary to-transparent" />
          {description && (
            <p className="text-muted-foreground mx-auto mt-5 max-w-lg text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Feature cards */}
        {features && features.length > 0 && (
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden border border-border/30 bg-gradient-to-b from-card to-background p-8 transition-all duration-500 lg:p-10 hover:border-secondary/30 hover:shadow-2xl hover:shadow-secondary/5"
              >
                {/* Top gold accent line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent transition-all duration-500 group-hover:via-secondary" />

                {/* Watermark number */}
                <span className="pointer-events-none absolute -top-3 right-4 text-[8rem] leading-none font-bold text-secondary/[0.04] transition-all duration-700 select-none group-hover:text-secondary/[0.08]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-5">
                  {feature.icon && (
                    <div className="flex h-12 w-12 items-center justify-center border border-secondary/20 transition-colors duration-300 group-hover:border-secondary/40 group-hover:bg-secondary/5">
                      <Icon name={feature.icon} size={22} className="text-secondary" />
                    </div>
                  )}

                  <h3 className="text-foreground text-xl font-bold tracking-tight">
                    {feature.title}
                  </h3>

                  {/* Animated underline */}
                  <div className="h-px w-8 bg-secondary/30 transition-all duration-500 group-hover:w-14 group-hover:bg-secondary" />

                  {feature.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>

                {/* Hover warm glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
