import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Billing",
      href: "/home/dashboard/billing",
      icon: "ReceiptText",
    },
    {
      title: "Settings",
      href: "/home/dashboard/settings",
      icon: "Settings",
    },
  ],
};
