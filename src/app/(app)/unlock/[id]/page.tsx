"use client";
import React from "react";
import { H2 } from "~/components/ui/typography";
import { api } from "~/trpc/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { redirect, useRouter } from "next/navigation";
import { getUrl } from "~/lib/get-url";

const formSchema = z.object({
  password: z.string().min(3, { message: "Min length is 3 letters" }),
});

function Unlock({ params }: { params: { id: string } }) {
  const router = useRouter();
  const checkPassword = api.url.getPublic.useMutation({
    onSuccess: (data, variables) => {
      toast("Password is correct", {
        description: "Redirecting...",
      });

      router.push(`${getUrl(data)}?password=${variables.password}`);
    },
    onError: () => {
      toast("Password is incorrect", {
        description: "Please try again",
      });
    },

    retry: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    checkPassword.mutate({
      id: params.id,
      type: "id",
      password: values.password,
    });
  }

  return (
    <div className="space-y-6">
      <H2>Unlock URL</H2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  This URL is protected with a password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default Unlock;
