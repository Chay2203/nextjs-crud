"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Todo } from "@prisma/client";
import DeleteTodo from "@/components/delete-todo";
import UpdateTodo from "@/components/update-todo";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TodoList() {
    const { data: todo, error, isLoading } = useSWR<Todo[]>("/api/todos", fetcher);

    if (isLoading)
        return (
            <div className="flex justify-center items-center p-10">
                <div className="animate-spin border-4 border-t-4 border-black border-solid rounded-full w-16 h-16"></div>
            </div>
        );

    if (error)
        return <p className="text-center text-red-500">Error loading todos</p>;

    const todos = todo || [];

    return (
        <div className="space-y-4">
            {todos.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-10">
                        <p className="text-muted-foreground">
                            All done for today!
                        </p>
                    </CardContent>
                </Card>
            ) : (
                todos.map((todo) => (
                    <Card className="group relative" key={todo.id}>
                         <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <UpdateTodo todo={todo} />
                            <DeleteTodo id={todo.id} />
                        </div>
                        <CardHeader>
                            <CardTitle>
                                <span className={todo.isCompleted ? "line-through" : ""}>
                                    {todo.title}
                                </span>
                            </CardTitle>
                            <CardDescription>
                                <span className="text-muted-foreground pr-3">
                                    {new Date(todo.createdAt).toLocaleString()}
                                </span>
                                <span className="text-muted-foreground">
                                    {todo.isCompleted ? "Completed" : "Pending"}
                                </span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{todo.description}</p>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
