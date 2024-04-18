"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
    .nullable()
    .optional(),
  maxClicks: z
    .number()
    .int({
      message: "Max clicks must be a whole number.",
    })
    .nullable()
    .optional(),
});

export function UrlForm({
  id,
  url,
  maxClicks,
  password,
  slug,
}: z.infer<typeof formSchema> & { id: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      maxClicks,
      password,
      slug,
      url,
    },
  });

  function onSubmit() {
    return null;
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
          id="edit-url"
        >
          <FormField
            control={form.control}
            name="url"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://ahmed-mohamed-ig4e.vercel.app"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The shortened url.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="ahmed-portfolio" {...field} />
                </FormControl>
                <FormDescription>The specifed slug.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ahmed12345"
                    {...field}
                    value={field.value ? "Protected" : "Not protected"}
                    onChange={(e) =>
                      field.onChange(!!e.target.value ? e.target.value : null)
                    }
                  />
                </FormControl>
                <FormDescription>
                  For security reasons you cannot view the current password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxClicks"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Clicks</FormLabel>
                <FormControl>
                  <Input
                    min={1}
                    placeholder="20"
                    type="number"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(value) =>
                      void field.onChange(
                        isNaN(value.target.valueAsNumber)
                          ? null
                          : value.target.valueAsNumber,
                      )
                    }
                  />
                </FormControl>
                <FormDescription>The specifed max clicks.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(getUrl({ id, slug }));
              toast("Copied to clipboard", {
                description: getUrl({ id, slug }),
              });
            }}
          >
            Copy
          </Button>
        </form>
      </Form>
    </>
  );
}
