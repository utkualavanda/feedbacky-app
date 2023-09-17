import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const ReactQueryWrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider
    client={
      new QueryClient({
        defaultOptions: { queries: { retry: false } },
        logger: {
          error:
            import.meta.env.MODE === "development" ? () => {} : console.error,

          log: console.log,

          warn: console.warn,
        },
      })
    }
  >
    {children}
  </QueryClientProvider>
);
