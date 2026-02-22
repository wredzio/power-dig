export const sanityComponent = {
  page: async () => import("./page/sanity-page").then((module) => module.sanityPageComponents),
};

export type PageType = keyof typeof sanityComponent;
