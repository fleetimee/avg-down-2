"use client";

import { Home, Settings, History } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Home", icon: Home },
  { href: "/transaction", label: "Transactions", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const currentRoute = navigation.find((item) => pathname === item.href)
    ? pathname
    : "/";

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white">
      <Tabs value={currentRoute} className="w-full">
        <TabsList className="w-full h-16 grid grid-cols-3 rounded-none border-0 bg-transparent">
          {navigation.map(({ href, label, icon: Icon }) => (
            <TabsTrigger key={href} value={href} asChild>
              <Link
                href={href}
                className="flex flex-col items-center py-2 data-[state=active]:text-primary"
              >
                <Icon size={24} />
                <span className="text-xs">{label}</span>
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
