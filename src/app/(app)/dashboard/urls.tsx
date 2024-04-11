"use client";
import { Clipboard, Infinity, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  AdaptiveModal,
  AdaptiveModalClose,
  AdaptiveModalContent,
  AdaptiveModalDescription,
  AdaptiveModalFooter,
  AdaptiveModalHeader,
  AdaptiveModalTitle,
  AdaptiveModalTrigger,
} from "~/components/adaptive-modal";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { getUrl } from "~/lib/get-url";
import { api } from "~/trpc/react";

function Urls() {
  const { data, isLoading, isError, refetch } =
    api.url.getUrls.useInfiniteQuery(
      {
        sortBy: "createdAt_desc",
      },
      { getNextPageParam: (lastPage) => lastPage.nextCursor },
    );

  const deleteUrl = api.url.delete.useMutation({
    onMutate(variables) {
      toast("Trying to delete...", {
        description: `Deleting ${variables.id}...`,
      });
    },
    onSuccess(data) {
      toast("Successfuly deleted", {
        description: `Url ${data.id} was deleted`,
      });
      void refetch();
    },
    onError(error) {
      toast("Failed to delete", {
        description: error.message,
      });
      void refetch();
    },
  });

  const urls =
    data?.pages
      .flat()
      ?.map((page) => page.items)
      .flat() ?? [];

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {urls.map((url) => {
        const clsPre = ((url.clicks ?? 0) / (url.maxClicks ?? 0)) * 100;
        const clicksPrecentage = !url.maxClicks ? 0 : Math.round(clsPre);

        return (
          <Card key={url.id}>
            <CardHeader className="pb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="mb-1 flex items-center gap-2 rounded p-1 ps-0 text-start hover:bg-background hover:!text-primary"
                      onClick={() => {
                        void navigator.clipboard.writeText(getUrl(url));
                        toast("Copied to clipboard", {
                          description: getUrl(url),
                        });
                      }}
                    >
                      <Clipboard className="h-4 w-4" />
                      <CardDescription className="max-w-64 break-before-all">
                        {getUrl({ ...url, addHostname: false })}
                      </CardDescription>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Copy URL</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <CardTitle className="text-4xl">
                {url.clicks}{" "}
                <span className="text-sm text-muted-foreground">Clicks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 py-2">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Max Clicks</span>
                  <span>
                    {url.maxClicks ?? <Infinity className="h-5 w-5" />}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Password Protected
                  </span>
                  <span>{!!url.password ? "Yes" : "No"}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Label>{clicksPrecentage}%</Label>
              <Progress
                value={clicksPrecentage + 1}
                aria-label="25% increase"
              />

              <div className="flex w-full items-center gap-2">
                <Link href={`/dashboard/edit/${url.id}`} className="w-full">
                  <Button className="w-full">Edit</Button>
                </Link>

                <AdaptiveModal>
                  <AdaptiveModalTrigger asChild>
                    <Button
                      variant={"secondary"}
                      className="flex items-center gap-2"
                    >
                      <Trash className="h-5 w-5" />
                      <span>Delete</span>
                    </Button>
                  </AdaptiveModalTrigger>
                  <AdaptiveModalContent>
                    <AdaptiveModalHeader>
                      <AdaptiveModalTitle>
                        Are you absolutely sure?
                      </AdaptiveModalTitle>
                      <AdaptiveModalDescription>
                        This action cannot be undone. This will permanently
                        delete your url from our servers.
                      </AdaptiveModalDescription>
                    </AdaptiveModalHeader>

                    <AdaptiveModalFooter>
                      <AdaptiveModalClose asChild>
                        <Button
                          onClick={() => deleteUrl.mutate({ id: url.id })}
                        >
                          Delete
                        </Button>
                      </AdaptiveModalClose>
                      <AdaptiveModalClose asChild>
                        <Button variant="outline">Close</Button>
                      </AdaptiveModalClose>
                    </AdaptiveModalFooter>
                  </AdaptiveModalContent>
                </AdaptiveModal>
              </div>
            </CardFooter>
          </Card>
        );
      })}

      {isLoading &&
        Array.from({ length: 10 })
          .fill("")
          .map((_value, index) => {
            return (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <Skeleton className="mb-2 h-8"></Skeleton>
                  <Skeleton className="h-20"></Skeleton>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 py-2">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Max Clicks</span>
                      <Skeleton className="h-5 w-10"></Skeleton>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Password Protected
                      </span>
                      <Skeleton className="h-5 w-10"></Skeleton>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Skeleton className="h-8 w-16"></Skeleton>
                  <Progress value={index * 5} aria-label="25% increase" />

                  <div className="flex w-full items-center gap-2">
                    <Button className="w-full" disabled>
                      Edit
                    </Button>

                    <Button
                      variant={"secondary"}
                      className="flex items-center gap-2"
                      disabled
                    >
                      <Trash className="h-5 w-5" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}

      {isError && <div>Error</div>}
    </div>
  );
}

export default Urls;
