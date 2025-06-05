import { Header } from "@/widgets";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <hr />
      <div className="container mx-auto px-4 lg:px-0">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
