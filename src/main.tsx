import "@/app/styles/index.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./app/providers/theme-provider";
import { ReactQueryProvider } from "./app/providers/react-query.provider";
import { AuthProvider } from "./app/providers/auth/auth.provider";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      {/* <AuthProvider> */}
        <ReactQueryProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
          </ThemeProvider>
        </ReactQueryProvider>
      {/* </AuthProvider> */}
    </StrictMode>
  );
}
