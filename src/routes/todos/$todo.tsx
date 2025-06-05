import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/todos/$todo")({
  component: RouteComponent,
  loader: async ({ params }) => {
    if (!params.todo) {
      throw new Error("Todo parameter is required");
    }
    return { todo: params.todo };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error: Todo not found</div>,
});

function RouteComponent() {
  const { todo } = Route.useLoaderData();
  if (!todo) {
    return <div>Error: Todo not found</div>;
  }

  return (
    <div className="py-2">
      <h2>Todo: {todo}</h2>
    </div>
  );
}
