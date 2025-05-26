"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { APP_URL } from "@/constants";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = new URL(
      "/search",
      APP_URL ? `https://${APP_URL}` : "http://localhost:3000"
    );
    const newQuery = value.trim();

    url.searchParams.set("query", encodeURIComponent(newQuery));

    if (newQuery === "") {
      url.searchParams.delete("query");
    }

    setValue(newQuery);
    router.push(url.toString());
  };

  return (
    <form className="flex w-full max-w-[600px]" onSubmit={handleSearch}>
      <div className="relative w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full pl-4 pr-12 py-2 rounded-l-full border focus:outline-none focus:border-violet-900"
        />
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 rounded-r-full bg-violet-900/40 border-l-0 hover:bg-violet-900/60 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};
