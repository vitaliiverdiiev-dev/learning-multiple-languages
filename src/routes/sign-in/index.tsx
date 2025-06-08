import { SignInWithGoogleButton } from "@/features/sign-in-with-google/sign-in-with-google-button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen px-4">
      <h2 className="text-2xl font-semibold">Sign in</h2>
      <SignInWithGoogleButton />
    </div>
  );
}
