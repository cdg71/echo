export const flattenTypebox = <T extends { static: unknown }>(
  obj: T
): T["static"] => obj as typeof obj.static;
