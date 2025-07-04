import Link from "next/link";
import Image from "next/image";

import { AuthButton } from "@/modules/auth/ui/components/AuthButton";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { SearchInput } from "./SearchInput";
import { AdvancedMenu } from "./AdvancedMenu";

export const HomeNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#191919] flex items-center px-2 md:pr-5 z-50">
      <div className="flex items-center gap-4 w-full">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />

          <Link href="/" className="hidden md:block">
            <div className="flex items-center gap-2 p-4">
              <Image src="/logo-u-pipe.svg" width={32} height={32} alt="logo" />
              <p className="text-2xl font-semibold tracking-tight">Upipe</p>
            </div>
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex flex-1 justify-center w-[720px] mx-auto">
          <SearchInput />
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 md:gap-4">
          <AuthButton />

          <AdvancedMenu />
        </div>
      </div>
    </nav>
  );
};
