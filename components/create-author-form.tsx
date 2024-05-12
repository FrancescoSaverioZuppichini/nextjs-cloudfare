"use client";
import { authors } from "@/lib/db/schema";
import { APIResources } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthorsCreateSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { createAuthor } from "@/lib/crud";

interface CreateAuthorFormProps {
  onSuccess: () => void;
  onAbort?: () => void;
}
export default function CreateAuthorForm({
  onSuccess,
  onAbort,
}: CreateAuthorFormProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["authors"],
    mutationFn: createAuthor,
    onSuccess: (author) => {
      console.log("mutation success", author);
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      onSuccess();
    },
  });

  const form = useForm<z.infer<typeof AuthorsCreateSchema>>({
    resolver: zodResolver(AuthorsCreateSchema),
    defaultValues: { name: "" },
  });

  function onSubmit(values: z.infer<typeof AuthorsCreateSchema>) {
    mutate(values);
  }

  function handleAbortClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!onAbort) return;
    onAbort();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Dante Alighieri" {...field} />
              </FormControl>
              <FormDescription>The new author name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          {onAbort && (
            <Button variant={"outline"} onClick={handleAbortClick}>
              Abort
            </Button>
          )}
          <Button type="submit">
            {isPending && (
              <Loader2 className="mr-2 w-4 h-4 animate-spin"></Loader2>
            )}
            {isPending ? "Loading" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
