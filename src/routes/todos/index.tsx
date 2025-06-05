import { cn } from "@/shared";
import supabase from "@/shared/config/supabase-client.config";
import { Button } from "@/shared/ui";
import { Checkbox } from "@/shared/ui/checkbox";
import { TodoForm } from "@/widgets/forms/todo.form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Trash } from "lucide-react";

export const Route = createFileRoute("/todos/")({
  component: RouteComponent,
});

interface Todo {
  id: string | number;
  title: string;
  isCompleted: boolean;
}

function RouteComponent() {
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        throw new Error(error.message);
      }
      return data as Todo[];
    },
    refetchOnWindowFocus: false,
  });

  const updateTodo = async (todo: Todo) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ isCompleted: !todo.isCompleted })
      .eq("id", todo.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating todo:", error.message);
      return;
    }

    // Invalidate and refetch todos query after successful update
    queryClient.invalidateQueries({ queryKey: ["todos"] });

    console.log("Todo updated successfully", data);
  };

  const deleteTodo = async (todoId: string | number) => {
    const { error } = await supabase.from("todos").delete().eq("id", todoId);

    if (error) {
      console.error("Error deleting todo:", error.message);
      return;
    }

    // Invalidate and refetch todos query after successful deletion
    queryClient.invalidateQueries({ queryKey: ["todos"] });

    console.log("Todo deleted successfully");
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (isError) {
    return <div className="py-4 text-red-500">Error loading todos</div>;
  }
  if (!data) {
    return <div className="py-4 text-red-500">No todos found</div>;
  }

  console.log("Todos data:", data);

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold mb-4">Todos</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="order-1 xl:order-first">
          <ul>
            {data.map((todo) => (
              <li
                key={todo.id}
                className={cn(
                  "py-2 border-b",
                  todo.isCompleted ? "text-gray-400 dark:text-gray-600" : ""
                )}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={todo.isCompleted}
                      onCheckedChange={() => updateTodo(todo)}
                    />
                    <span>{todo.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {todo.isCompleted ? "Completed" : "Pending"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="hover:text-red-500 hover:bg-red-50 w-4 h-4 xl:w-6 xl:h-6"
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <TodoForm />
          <hr className="my-4 xl:hidden" />
        </div>
      </div>
    </div>
  );
}
