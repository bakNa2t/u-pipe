import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { MainSection } from "./MainSection";

export const HomeSidebar = () => {
  return (
    <Sidebar className="pt-16 border-none z-40">
      <SidebarContent className="bg-background">
        <MainSection />
      </SidebarContent>
    </Sidebar>
  );
};
