import Link from "next/link";
import Image from "next/image";

import { AuthButton } from "@/modules/auth/ui/components/AuthButton";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { StudioUploadModal } from "../StudioUploadModal";

export const StudioNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#131313] flex items-center px-2 pr-5 z-50 border-b shadow-md ">
      <div className="flex items-center gap-4 w-full">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />

          <Link href="/studio" className="hidden md:block">
            <div className="flex items-center gap-2 p-4">
              <Image src="/logo-u-pipe.svg" width={32} height={32} alt="logo" />
              <p className="text-2xl font-semibold tracking-tight">Studio</p>
            </div>
          </Link>
        </div>

        <div className="flex-1" />

        <div className="flex flex-shrink-0 items-center gap-4">
          <StudioUploadModal />

          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
