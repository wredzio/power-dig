import React from "react";

import { cn } from "@/lib/utils";

interface ImageSectionProps {
  title: string;
  description: React.ReactNode;
  image?: React.ReactNode;
  layout: "left" | "right";
}

export const ImageSection = (props: ImageSectionProps) => {
  const { title, description, image, layout } = props;

  if (!image) {
    return (
      <div className="bg-background py-12">
        <div className="mx-auto max-w-prose px-4 md:px-6">
          <div className="bg-border h-0.5 w-full" />

          <h3 className="text-foreground mt-4 text-2xl font-semibold md:text-3xl">{title}</h3>

          <div className="text-muted-foreground mt-4 text-base leading-relaxed md:text-lg">
            {description}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div
        className={cn("flex flex-col gap-6 lg:flex-row lg:gap-8", {
          "lg:flex-row": layout === "left",
          "lg:flex-row-reverse": layout === "right",
        })}
      >
        <div className="w-full shrink-0 lg:max-w-[50%]">{image}</div>

        <div className="flex grow flex-col justify-center gap-4 px-4 py-8 md:px-6 lg:px-8">
          <div className="bg-border h-0.5 w-full" />

          <h3 className="text-foreground text-2xl font-semibold md:text-3xl">{title}</h3>

          <div className="text-muted-foreground text-base leading-relaxed md:text-lg">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
