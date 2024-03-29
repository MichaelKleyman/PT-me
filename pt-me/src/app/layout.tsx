/* eslint-disable react-hooks/exhaustive-deps */
"use client"; //this will be a client component
import { useEffect, useState } from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import { ThemeProvider } from "next-themes";
import { Providers } from "../Redux/provider";
import Layoutfile from "@/components/layoutfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <html lang='en'>
        <body>
          {/* <ThemeProvider enableSystem={true} attribute='class'> */}
          <Providers>
            <Layoutfile>
              <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools />
              </QueryClientProvider>
            </Layoutfile>
          </Providers>
          {/* </ThemeProvider> */}
        </body>
      </html>
    </>
  );
}
