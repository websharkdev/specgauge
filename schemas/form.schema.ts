import z from "zod";

export const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.email(),
    phone: z.number(),
    company_name: z.string().min(2).max(50),
})

export type TFormSchema = z.infer<typeof formSchema>