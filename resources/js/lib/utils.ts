import { MenuItem } from "@/types";

import en from "../../../lang/en.json";
import id from "../../../lang/id.json";
import ja from "../../../lang/ja.json";

export function findParentPath(data: MenuItem[], targetKey: string, parentPath: string[] = []): string[] {
  for (const item of data) {
    const currentPath = [...parentPath, item.key];
    if (item.key === targetKey) {
      return parentPath;
    }
    if (item.children) {
      const result: string[] = findParentPath(item.children, targetKey, currentPath);
      if (result.length) {
        return result;
      }
    }
  }
  return [];
}

// i18n
type TranslationType = {
  locale: string;
  key: string;
  data?: object;
};

function replacePlaceholders(text, data) {
  return text.replace(/:\w+/g, function (matched) {
    let key = matched.slice(1);
    return key in data ? data[key] : matched;
  });
}

export function __(locale, key, data = {}): TranslationType {
  const language = locale === "id" ? id : locale === "ja" ? ja : en;

  let translation = language[key] ?? key;
  translation = replacePlaceholders(translation, data);

  return translation;
}
