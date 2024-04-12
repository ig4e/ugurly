"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
  AdaptiveModalTitle,
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
import { api } from "~/trpc/react";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be 3 letters or more.",
  }),
});

export function UrlForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  const createKey = api.key.create.useMutation({
    onSuccess(data) {
      toast("Successfuly created the key", {
        description: data.secret,
      });
      setIsCopyModalOpen(true);
    },

    onError(error) {
      toast("Error creating the key", {
        description: error.message,
      });
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast("Crunching the link please wait..", {
      description: "We're working on  it",
    });

    createKey.mutate({
      name: values.name,
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="My portfolio cms" {...field} />
                </FormControl>
                <FormDescription>The client name</FormDescription>
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
                <AdaptiveModalTitle>Copy Your API key</AdaptiveModalTitle>
                <AdaptiveModalDescription>
                  {createKey.data?.secret}
                </AdaptiveModalDescription>
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
                      createKey.data?.secret ?? "",
                    );
                    toast("Copied to clipboard", {
                      description: createKey.data?.secret,
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
            disabled={createKey.isPending}
            onClick={() => {
              void form.trigger(["name"]).then(() => {
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
