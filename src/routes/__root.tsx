import { Button } from "@/shared/ui";
import { Logo } from "@/widgets/header/components/logo";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const NotFoundComponent = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <header>
        <div className="container mx-auto p-4 lg:px-0">
          <Logo />
        </div>
      </header>
      <section className="flex flex-1 flex-col gap-4 items-center justify-center">
        <h2 className="text-xl font-bold">Ooops!</h2>
        <span className="text-6xl font-bold">404</span>
        <h1 className="text-2xl font-bold">The Page Was Not Found...</h1>
        <div className="mt-10">
          <Button asChild variant="default" className="no-underline">
            <Link to="/" className="text-blue-500 hover:text-blue-700">
              Go to Home
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

const RootComponent = () => {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});
