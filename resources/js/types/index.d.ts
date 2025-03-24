import type { Config } from "ziggy-js";

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface MenuItem {
  key: string;
  children?: MenuItem[];
}

export interface SharedData {
  // default from handle inertia
  companyName: string;
  appName: string;
  locale: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  [key: string]: unknown;
  // custom
  activeMenu: string;
  activeMenuContent: string;
  breadcrumb: { title: string; url?: string }[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // This allows for additional properties...
}
