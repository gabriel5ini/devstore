"use client";

import { Skeleton } from "@/components/skeleton";
import { redirect, useSearchParams } from "next/navigation";

export default function SearchLoading() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  if (!query) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[380px]" />
        ))}
      </div>
    </div>
  );
}
