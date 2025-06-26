import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, LanguagesIcon } from "lucide-react";

import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LanguageSetModal = ({
  open,
  onOpenChange,
}: LanguageSetModalProps) => {
  const [locale, setLocale] = useState("");
  const router = useRouter();

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("UPIPE_TRANSLATION_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale);

      document.cookie = `UPIPE_TRANSLATION_LOCALE=${browserLocale};`;
      router.refresh();
    }
  }, [router]);

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    document.cookie = `UPIPE_TRANSLATION_LOCALE=${newLocale};`;
    router.refresh();
  };

  return (
    <ResponsiveModal
      title="Set language"
      open={open}
      onOpenChange={onOpenChange}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="row_fit" className="px-2 md:px-4">
            <LanguagesIcon />
            <span>Choose language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => changeLocale("en")}>
            English
            {locale === "en" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLocale("ru")}>
            Russian
            {locale === "ru" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ResponsiveModal>
  );
};
