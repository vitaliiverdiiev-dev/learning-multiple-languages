import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { todoFormSchema } from "./todo.schema";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import supabase from "@/shared/config/supabase-client.config";
import { useQueryClient } from "@tanstack/react-query";

export const TodoForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof todoFormSchema>) => {
    const newTodo = {
      title: values.title,
      isCompleted: false,
    };

    const { data, error } = await supabase
      .from("todos")
      .insert(newTodo)
      .single();

    if (error) {
      console.error("Error inserting todo:", error.message);
      return;
    }
    form.reset();

    // Invalidate and refetch todos query after successful insertion
    queryClient.invalidateQueries({ queryKey: ["todos"] });

    console.log("Todo added successfully", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter any text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add todo</Button>
      </form>
    </Form>
  );
};
