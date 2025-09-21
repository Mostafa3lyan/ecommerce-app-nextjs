"use client";

import { Skeleton, Spinner } from "@heroui/react";

export default function Loading() {
  // number of skeleton cards to render
  const skeletons = Array.from({ length: 6 });

  return (
    <div >
      <div
        className="
          grid gap-6
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
        "
      >
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 p-2 border rounded-xl shadow-sm"
          >
            {/* Image skeleton */}
            <Skeleton className="h-[180px] w-full rounded-lg" />

            {/* Text skeletons */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>

            {/* Price + Rating skeletons */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-12 rounded" />
              <Skeleton className="h-4 w-10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
