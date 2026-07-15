"use client"

import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface CareerCardSkeletonProps {
  count?: number;
}

export function CareerCardSkeleton({ count = 6 }: CareerCardSkeletonProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <Skeleton className="w-full h-40 rounded-t-lg" />
          <CardContent className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-4 w-16 rounded-full" />
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
