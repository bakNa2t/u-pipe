import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Navbar");

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
      title={t("languageModalTitle")}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="row_fit" className="px-2 md:px-4">
              <LanguagesIcon />
              <span>{t("languageChoose")}</span>
            </Button>

            <p className="text-sm text-muted-foreground">
              {t("currentLang")}: {locale && locale === "en" ? "EN" : "RU"}
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => changeLocale("en")}>
            {t("languageEn")}
            {locale === "en" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLocale("ru")}>
            {t("languageRu")}
            {locale === "ru" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ResponsiveModal>
  );
};
