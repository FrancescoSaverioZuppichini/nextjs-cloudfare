"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";

import { ThemeProvider } from "./theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  children: React.ReactNode;
}
export default function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
