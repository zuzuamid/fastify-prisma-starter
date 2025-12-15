import slugify from "slugify";

export const generateSlug = (text: string): string => {
  return slugify(text, { lower: true, strict: true });
};

// Commit 11

// Commit 41

// Commit 76
