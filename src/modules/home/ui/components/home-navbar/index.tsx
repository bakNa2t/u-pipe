import Link from "next/link";
import Image from "next/image";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchInput } from "./SearchInput";

export const HomeNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">
      <div className="flex items-center gap-4 w-full">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />

          <Link href="/">
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
      </div>
    </nav>
  );
};
