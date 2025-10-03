"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Shuffle, Search, Settings } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/collections", icon: Grid3X3, label: "Collections" },
  { href: "/random", icon: Shuffle, label: "Random" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/admin", icon: Settings, label: "Admin" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 z-50">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.href} href={item.href} className="relative">
              <motion.div
                className="flex flex-col items-center px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon 
                  size={24} 
                  className={isActive ? "text-cyan-400" : "text-gray-400"} 
                />
                <span className={`text-xs mt-1 ${isActive ? "text-cyan-400" : "text-gray-400"}`}>
                  {item.label}
                </span>
              </motion.div>
              
              {isActive && (
                <motion.div
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                  layoutId="activeIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}