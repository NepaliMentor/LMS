// sidebar.tsx
"use client";

import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

interface SidebarProps {
  onRouteClick?: () => void; // Add the onRouteClick prop
}

export const Sidebar: React.FC<SidebarProps> = ({ onRouteClick }) => {
  return (
    <div className="h-full border-r flex flex-col bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes onRouteClick={onRouteClick} />{" "}
        {/* Pass onRouteClick to SidebarRoutes */}
      </div>
    </div>
  );
};
