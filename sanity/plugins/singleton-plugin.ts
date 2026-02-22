import { definePlugin, type DocumentDefinition } from "sanity";
import type { StructureResolver } from "sanity/structure";

export const singletonPlugin = definePlugin<{ types: string[] }>(({ types }) => {
  return {
    name: "singletonPlugin",
    document: {
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === "global") {
          return prev.filter((templateItem) => !types.includes(templateItem.templateId));
        }

        return prev;
      },
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(
            ({ action }) => !["unpublish", "delete", "duplicate"].includes(action!),
          );
        }

        return prev;
      },
    },
  };
});

export const settingsStructure = (typeDefs: DocumentDefinition[]): StructureResolver => {
  return (S) => {
    const settingsListItem = typeDefs.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title || "")
        .icon(typeDef.icon)
        .child(S.documentTypeList(typeDef.name).title(typeDef.title || ""));
    });

    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => !typeDefs.find((singleton) => singleton.name === listItem.getId()),
    );

    return S.list()
      .title("Content")
      .items([...settingsListItem, S.divider(), ...defaultListItems]);
  };
};
