import { PortableText } from "next-sanity";

import { textComponents } from "./text-components";

interface RichTextProps {
  value: Parameters<typeof PortableText>[0]["value"];
}

export const RichText = (props: RichTextProps) => {
  return <PortableText value={props.value} components={textComponents} />;
};
