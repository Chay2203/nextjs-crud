import { z } from 'zod';

export const todoSchema = z.object({
    title: z.string().min(1, "Title is required").nonempty(),
    description: z.string().nonempty(),
    isCompleted: z.boolean().default(false),
});

export type TodoSchema = z.infer<typeof todoSchema>;