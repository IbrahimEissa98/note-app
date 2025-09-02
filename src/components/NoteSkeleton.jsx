import { Card, Skeleton } from "@heroui/react";

export default function NoteSkeleton() {
  return (
    <Card
      className="max-w-[400px] w-full mx-auto col-span-1 space-y-5 p-4"
      radius="lg"
    >
      <div className="flex justify-between">
        <Skeleton className="rounded-lg w-fit">
          <div className="h-10 w-10 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="rounded-full w-fit">
          <div className="h-6 w-4 rounded-full bg-default-300" />
        </Skeleton>
      </div>
      <div className="space-y-3">
        <Skeleton className="w-3/4 rounded-lg">
          <div className="h-10 w-3/4 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-full rounded-lg">
          <div className="h-20 w-full rounded-lg bg-default-200" />
        </Skeleton>
        <div className="flex justify-between gap-6">
          <Skeleton className="w-full rounded-lg ">
            <div className="h-6 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-6 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </div>
    </Card>
  );
}
