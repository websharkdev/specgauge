import z from "zod";

export const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.email(),
    companyName: z.string(),
    message: z.string().min(2).max(10000),
})

export type TFormSchema = z.infer<typeof formSchema>