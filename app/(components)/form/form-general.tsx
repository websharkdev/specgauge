'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PhoneNumber } from "@/components/ui/phone-number"
import { Magnetic } from "@/components/ui/magnetic-button"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.email(),
    phone: z.string().min(2).max(50),
    company_name: z.string().min(2).max(50),
})

const GForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm flex flex-col items-center gap-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full max-w-[372px] h-full max-h-12">
                            <FormControl>
                                <Input className="h-12" placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full max-w-[372px] h-full max-h-12">
                            <FormControl>
                                <Input className="h-12" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="w-full max-w-[372px] h-full max-h-12">
                            <FormControl>
                                <PhoneNumber onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                        <FormItem className="w-full max-w-[372px] h-full max-h-12">
                            <FormControl>
                                <Input className="h-12" placeholder="Company name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Magnetic
                    intensity={0.2}
                    springOptions={{ bounce: 0.1 }}
                    actionArea="global"
                    range={200}
                >
                    <Button type="submit" variant='blue' className="cursor-pointer w-[240px]">Request a Demo</Button>
                </Magnetic>
            </form>
        </Form>
    )
}

export default GForm