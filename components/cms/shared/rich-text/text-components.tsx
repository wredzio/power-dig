import Link from "next/link";
import { PortableTextComponents } from "next-sanity";

export const textComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-medium">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-normal">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-border border-l-4 pl-4 italic">{children}</blockquote>
    ),
    normal: ({ children }) => (
      <div className="mt-3">
        <p>{children}</p>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
    number: ({ children }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <Link
        className="text-primary font-medium underline underline-offset-4 hover:no-underline"
        href={value?.href || "#"}
      >
        {children}
      </Link>
    ),
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};
