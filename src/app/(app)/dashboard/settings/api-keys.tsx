"use client";
import { Clipboard, Trash } from "lucide-react";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/react";
import type { RouterOutput } from "~/trpc/utils";

function ApiKeys({
  initialData,
}: {
  initialData: RouterOutput["key"]["getMany"];
}) {
  const { data, isLoading, isError, refetch, hasNextPage, fetchNextPage } =
    api.key.getMany.useInfiniteQuery(
      {
        sortBy: "desc",
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialData: {
          pages: [initialData],
          pageParams: [],
        },
      },
    );

  const deleteKey = api.key.delete.useMutation({
    onMutate(variables) {
      toast("Trying to delete...", {
        description: `Deleting ${variables.id}...`,
      });
    },
    onSuccess(data) {
      toast("Successfuly deleted", {
        description: `Key ${data.name} was deleted`,
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

  const keys =
    data?.pages
      .flat()
      ?.map((page) => page.items)
      .flat() ?? [];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {keys.map((key) => {
          return (
            <Card key={key.id}>
              <CardHeader className="pb-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="mb-1 flex items-center gap-2 rounded p-1 ps-0 text-start hover:bg-background hover:!text-primary"
                        onClick={() => {
                          void navigator.clipboard.writeText(key.secret);
                          toast("Copied to clipboard", {
                            description: key.secret,
                          });
                        }}
                      >
                        <Clipboard className="h-4 w-4" />
                        <CardDescription className="max-w-64 break-before-all">
                          {key.secret}
                        </CardDescription>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Copy Secret</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <CardTitle className="text-4xl">{key.name}</CardTitle>
              </CardHeader>

              <CardFooter className="flex flex-col gap-4">
                <div className="flex w-full items-center gap-2">
                  <AdaptiveModal>
                    <AdaptiveModalTrigger asChild>
                      <Button
                        variant={"secondary"}
                        className="flex w-full items-center gap-2"
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
                            onClick={() => deleteKey.mutate({ id: key.id })}
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
          Array.from({ length: 6 })
            .fill("")
            .map((_value, index) => {
              return (
                <Card key={index}>
                  <CardHeader className="pb-4">
                    <Skeleton className="mb-2 h-8"></Skeleton>
                    <Skeleton className="h-10"></Skeleton>
                  </CardHeader>

                  <CardFooter className="flex flex-col gap-4">
                    <div className="flex w-full items-center gap-2">
                      <Button
                        variant={"secondary"}
                        className="flex w-full items-center gap-2"
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
      {hasNextPage && (
        <div className="mt-8">
          <Button onClick={() => fetchNextPage()} variant={"secondary"}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}

export default ApiKeys;
