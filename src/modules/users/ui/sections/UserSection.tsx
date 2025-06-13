"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";

import { Separator } from "@/components/ui/separator";
import {
  UserPageBanner,
  UserPageBannerSkeleton,
} from "../components/UserPageBanner";
import { UserPageInfo, UserPageInfoSkeleton } from "../components/UserPageInfo";

interface UserSectionProps {
  userId: string;
}

export const UserSection = ({ userId }: UserSectionProps) => {
  return (
    <Suspense fallback={<UserSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <UserSectionSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const UserSectionSkeleton = () => {
  return (
    <div className="flex flex-col">
      <UserPageBannerSkeleton />
      <UserPageInfoSkeleton />
    </div>
  );
};

const UserSectionSuspense = ({ userId }: UserSectionProps) => {
  const [user] = trpc.users.getOne.useSuspenseQuery({ id: userId });

  return (
    <div className="flex flex-col">
      <UserPageBanner user={user} />
      <UserPageInfo user={user} />
      <Separator />
    </div>
  );
};
