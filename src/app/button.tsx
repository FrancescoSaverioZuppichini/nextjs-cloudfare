"use client";
import { useState } from "react";

export default function Button() {
  const [count, setCount] = useState(0);
  console.log(count);
  return (
    <button onClick={() => setCount((prev) => prev + 1)}>
      Click me {count}
    </button>
  );
}
