import { defineField } from "sanity";

const ANCHOR_ID_PATTERN = /^[a-z0-9-]+$/;

/**
 * Shared "ID sekcji" field used by every section so navigation links
 * like `/#uslugi` can target a section chosen in the Studio.
 */
export function anchorIdField(initialValue?: string) {
  return defineField({
    name: "id",
    type: "string",
    title: "ID sekcji (anchor)",
    description: "Używane do linkowania w menu, np. „uslugi” dla /#uslugi",
    ...(initialValue ? { initialValue } : {}),
    validation: (Rule) =>
      Rule.custom((value) => {
        if (!value) return true;
        if (!ANCHOR_ID_PATTERN.test(value)) {
          return "ID może zawierać tylko małe litery, cyfry i myślniki";
        }
        return true;
      }),
  });
}
