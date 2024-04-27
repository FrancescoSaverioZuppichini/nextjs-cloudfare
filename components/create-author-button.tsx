"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { authors } from "@/lib/db/schema";
import { APIReponse } from "@/types";
import { useState } from "react";

type Author = typeof authors.$inferSelect;

async function createAuthor(
  body: Omit<Author, "id">
): Promise<APIReponse<Author>> {
  const res = await fetch("/api/authors", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
export default function CreateAuthorButton() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const { mutate } = useMutation({
    mutationKey: ["authors"],
    mutationFn: createAuthor,
    onSuccess: (author) => {
      console.log("mutation success");
      //   queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.setQueryData(["authors"], (old: Array<Author>) => {
        console.log("setQueryData", author, [author, ...old]);
        return [author, ...old];
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const author = { id: crypto.randomUUID(), name };
    queryClient.setQueryData(["authors"], (old: APIReponse<Array<Author>>) => {
      console.log(old, "old");
      const newState = { ...old, ...{ data: [author, ...old.data] } };
      return newState;
    });
    // mutate({ name });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button type="submit">Create Author</button>
    </form>
  );
}
