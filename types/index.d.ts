import { icons } from "lucide-react";

interface CloudflareEnv {
  DB: D1Database;
}

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export interface APIResourcesPagination {
  cursor: number;
  nextCursor: number;
  totalPages: number;
  totalItems: number;
}

export interface APIResourcesLinks {
  prev: string | null;
  next: string | null;
  first: string;
  last: string;
}

export interface APIResourcesMeta {
  pagination: APIResourcesPagination;
  links: APIResourcesLinks;
}

export interface APIResources<T> {
  data: T[];
  meta: APIResourcesMeta;
}

export interface APIResource<T> {
  data: T;
}
