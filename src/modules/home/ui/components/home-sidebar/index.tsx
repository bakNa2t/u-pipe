import { SignedIn } from "@clerk/nextjs";

import { MainSection } from "./MainSection";
import { PersonalSection } from "./PersonalSection";
import { SubscriptionsSection } from "./SubscriptionsSection";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

export const HomeSidebar = () => {
  return (
    <Sidebar className="pt-16 border-none z-40" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />

        <Separator />

        <PersonalSection />

        <SignedIn>
          <>
            <Separator />
            <SubscriptionsSection />
          </>
        </SignedIn>
      </SidebarContent>
    </Sidebar>
  );
};
