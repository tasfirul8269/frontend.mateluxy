import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/AdminPannel/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo  from "@/assets/logo.png"; // Adjust the path to your logo

const navItems = [
  {
    icon: Home,
    label: "Properties",
    href: "/admin-pannel/properties",
  },
  {
    icon: Users,
    label: "Agents",
    href: "/admin-pannel/agents",
  },
  {
    icon: Settings,
    label: "Admins",
    href: "/admin-pannel/admins",
  },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.aside
      className="h-[100vh] bg-white border-r border-gray-200 flex flex-col z-10"
      initial={{ width: expanded ? "16rem" : "5rem" }}
      animate={{ width: expanded ? "16rem" : "5rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div
            key="full-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center"
          >
            <img className="w-15" src={logo} alt="LOGO" />
            <div className="ml-2">
              <h3 className="text-[18px] font-bold tracking-tight text-[#000000]">
                MATELUXY
              </h3>
              <p className="text-[13px] uppercase tracking-widest text-black">
                REAL ESTATE
              </p>
            </div>
          </motion.div>
          ) : (
            <motion.div
            key="short-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center"
          >
            <img className="w-10" src={logo} alt="LOGO" />
          
          </motion.div>
          )}
        </AnimatePresence>
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          title={`${expanded ? "Collapse" : "Expand"} sidebar (Ctrl+B)`}
        >
          {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </Button>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center py-3 px-3 rounded-lg transition-all duration-200",
                    expanded ? "justify-start" : "justify-center",
                    isActive
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(isActive && "animate-pulse-once", !expanded && "mx-auto")}
                  />
                  {expanded && (
                    <motion.span
                      className="ml-3 text-sm font-medium whitespace-nowrap"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className={cn("flex items-center", expanded ? "justify-start" : "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm">
            AD
          </div>
          {expanded && (
            <motion.span
              className="ml-3 text-sm font-medium text-gray-700 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              Admin Panel
            </motion.span>
          )}
        </div>
      </div>
    </motion.aside>
  );
}