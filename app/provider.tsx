"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [query] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}
