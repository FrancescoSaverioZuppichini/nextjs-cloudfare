"use client";
import { UsersUpdateSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { User } from "next-auth";
import { useMutation } from "@tanstack/react-query";
import { updateMe } from "@/lib/crud";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

export function UserForm({ user }: { user: User }) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UsersUpdateSchema>>({
    defaultValues: { name: user.name || "" },
    resolver: zodResolver(UsersUpdateSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["users", user.id],
    mutationFn: updateMe,
    onSuccess: (data) => {
      router.refresh();
      toast({
        title: "Settings: Update",
        description: "Settings updated successfully!",
      });
    },
  });

  function onSubmit(values: z.infer<typeof UsersUpdateSchema>) {
    mutate(values);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
