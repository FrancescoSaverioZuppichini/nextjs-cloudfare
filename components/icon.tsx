"use client";
import { icons } from "lucide-react";

const Icon = ({ name }: { name: keyof typeof icons }) => {
  const LucideIcon = icons[name];

  return <LucideIcon size={"1rem"} className="mr-2" />;
};

export default Icon;
