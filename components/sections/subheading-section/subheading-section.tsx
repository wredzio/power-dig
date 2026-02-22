export interface SubheadingSectionProps {
  text: string;
}

export const SubheadingSection = (props: SubheadingSectionProps) => {
  const { text } = props;

  return (
    <h2 className="text-foreground pt-8 text-3xl font-semibold tracking-tight md:text-4xl lg:pt-12">
      {text}
    </h2>
  );
};
