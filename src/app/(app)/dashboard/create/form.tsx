"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Infinity } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  AdaptiveModal,
  AdaptiveModalClose,
  AdaptiveModalContent,
  AdaptiveModalDescription,
  AdaptiveModalFooter,
  AdaptiveModalHeader,
  AdaptiveModalTitle
} from "~/components/adaptive-modal";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { getUrl } from "~/lib/get-url";
import { api } from "~/trpc/react";
const formSchema = z.object({
  slug: z
    .string()
    .min(3, {
      message: "Slug must be 3 letters or more.",
    })
    .optional(),
  url: z.string().url({ message: "Invalid URL." }),
  password: z
    .string()
    .min(3, { message: "Password must be 3 letters or more" })
    .optional(),
  maxClicks: z
    .number()
    .int({
      message: "Max clicks must be a whole number.",
    })
    .optional(),
});

export function UrlForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  const createUrl = api.url.create.useMutation({
    onSuccess(data) {
      toast("Successfuly shortend the link", {
        description: getUrl(data),
      });
      setIsCopyModalOpen(true);
    },

    onError(error) {
      toast("Error shortening the link", {
        description: error.message,
      });
      console.log(error);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      maxClicks: undefined,
      password: undefined,
      slug: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast("Crunching the link please wait..", {
      description: "We're working on  it",
    });

    createUrl.mutate({
      url: values.url,
      slug: values.slug,
      password: values.password,
      maxClicks: values.maxClicks,
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          id="create-url"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://ahmed-mohamed-ig4e.vercel.app"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The url you want to shorten</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="ahmed-portfolio" {...field} />
                </FormControl>
                <FormDescription>
                  You can specify a slug if you want (Leave blank to randomize)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="ahmed12345" {...field} />
                </FormControl>
                <FormDescription>
                  You can specify a password if you want
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxClicks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Clicks</FormLabel>
                <FormControl>
                  <Input
                    min={1}
                    placeholder="20"
                    type="number"
                    {...field}
                    onChange={(value) =>
                      field.onChange(
                        isNaN(value.target.valueAsNumber)
                          ? undefined
                          : value.target.valueAsNumber,
                      )
                    }
                  />
                </FormControl>
                <FormDescription>
                  You can specify how many times the link can be accessed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <AdaptiveModal open={isOpen} onOpenChange={setIsOpen}>
            <AdaptiveModalContent>
              <AdaptiveModalHeader>
                <AdaptiveModalTitle>
                  Are you absolutely sure?
                </AdaptiveModalTitle>
                <AdaptiveModalDescription>
                  You wont be able to edit this link again without creating an
                  account first.
                </AdaptiveModalDescription>
              </AdaptiveModalHeader>
              <AdaptiveModalFooter>
                <AdaptiveModalClose className="w-full md:w-fit">
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </AdaptiveModalClose>
                <Button
                  type="submit"
                  form="create-url"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Create
                </Button>
              </AdaptiveModalFooter>
            </AdaptiveModalContent>
          </AdaptiveModal>

          <AdaptiveModal
            open={isCopyModalOpen}
            onOpenChange={setIsCopyModalOpen}
          >
            <AdaptiveModalContent>
              <AdaptiveModalHeader>
                <AdaptiveModalTitle>Copy Your link</AdaptiveModalTitle>
                <AdaptiveModalDescription>
                  You wont be able to copy it again or edit it without creating
                  and account
                </AdaptiveModalDescription>

                <ul className="grid gap-3 py-2">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Max Clicks</span>
                    <span>
                      {createUrl.data?.maxClicks ?? (
                        <Infinity className="h-5 w-5" />
                      )}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Password Protected
                    </span>
                    <span>{!!createUrl.data?.password ? "Yes" : "No"}</span>
                  </li>
                </ul>
              </AdaptiveModalHeader>
              <AdaptiveModalFooter>
                <AdaptiveModalClose className="w-full md:w-fit">
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="w-full"
                  >
                    Close
                  </Button>
                </AdaptiveModalClose>
                <Button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard.writeText(
                      getUrl(createUrl.data ?? { id: "unkown" }),
                    );
                    toast("Copied to clipboard", {
                      description: getUrl(createUrl.data ?? { id: "unkown" }),
                    });
                  }}
                >
                  Copy
                </Button>
              </AdaptiveModalFooter>
            </AdaptiveModalContent>
          </AdaptiveModal>

          <Button
            type="button"
            variant="default"
            disabled={createUrl.isPending}
            onClick={() => {
              void form
                .trigger(["url", "slug", "password", "maxClicks"])
                .then(() => {
                  Object.keys(form.formState.errors).length === 0 &&
                    setIsOpen(true);
                });
            }}
          >
            Create
          </Button>
        </form>
      </Form>
    </>
  );
}
