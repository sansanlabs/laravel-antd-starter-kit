import { MenuItem } from "@/types";
import { FormInstance } from "antd";
import { MessageInstance } from "antd/lib/message/interface";

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
function replacePlaceholders(text: string, data: Record<string, string>) {
  return text.replace(/:\w+/g, function (matched) {
    const key = matched.slice(1);
    return key in data ? data[key] : matched;
  });
}

type TranslationKeys = keyof typeof en;
export function __(locale: string, key: TranslationKeys, data: Record<string, string> = {}): string {
  const language = locale === "id" ? id : locale === "ja" ? ja : en;

  const translation = typeof language[key] === "string" ? language[key] : key;
  return replacePlaceholders(translation, data);
}

// Handle form error message
export const handleFormErrorMessages = (
  errors: Record<string, string>,
  message: MessageInstance,
  form: FormInstance
) => {
  if (errors.error_server) {
    message.error(errors.error_server);
    return;
  }

  const errorsArray = Object.keys(errors).map((field) => ({
    name: field,
    errors: [errors[field]],
  }));

  form.setFields(errorsArray);

  if (errorsArray.length > 0) {
    form.scrollToField(errorsArray[0].name, { behavior: "smooth", block: "center" });
  }
};
