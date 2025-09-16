'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema, TFormSchema } from "@/schemas/form.schema"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'
import { toast } from "sonner"

const inputs = [
    {
        placeholder: 'Name',
        name: 'name',
        type: 'text'
    },

    {
        placeholder: 'Email',
        name: 'email',
        type: 'email'
    },
    {
        placeholder: 'Company Name',
        name: 'company_name',
        type: 'text'
    },
    {
        placeholder: 'Message',
        name: 'message',
        type: 'textarea'
    },

]

type names = "name" | "email" | "message" | "companyName"

const GForm = () => {
    const form = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            companyName: "",
            message: "",
        },
    })

    const onSubmit = async (values: TFormSchema) => {
        try {
            return await axios({
                url: process.env.NEXT_PUBLIC_FORM_URL as string,
                data: values,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "ApiKey": process.env.NEXT_PUBLIC_API_KEY
                },
            }).then((res) => toast(res.data.message)).catch(() => toast('Oooops! Some things went wrong'))
        } catch (error) {
            console.log('ERROR:', error)
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm md:max-w-none flex flex-col items-center gap-[15px] md:gap-y-ds-[15]">
                {
                    inputs.map((input, index) => <FormField
                        key={`input-${input.name}-${index}`}
                        control={form.control}
                        name={input.name as names}
                        render={({ field }) => input.type === 'textarea' ? <FormItem className="w-full max-w-[315px] sm:max-w-ds-[372] h-full max-h-max">
                            <FormControl>
                                <Textarea
                                    placeholder="Message"
                                    className="h-[121px] md:h-ds-[121] bg-[#1111110a] border-0 font-medium shadow-none rounded-[10px] sm:!rounded-ds-[10] text-base sm:text-ds-[16] leading-[110%] px-5 sm:px-ds-[20] md:py-[16] placeholder:text-[#111111]/40 text-[#111111]/40 resize-none"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem> : (
                            <FormItem className="w-full max-w-[315px] sm:max-w-ds-[372] h-full max-h-max">
                                <FormControl>
                                    <Input
                                        className="h-[49px] sm:h-ds-[49] bg-[#1111110a] border-0 font-medium shadow-none rounded-[10px] sm:!rounded-ds-[10] text-base sm:text-ds-[16] leading-[110%] px-5 sm:px-ds-[20] md:py-[16] placeholder:text-[#111111]/40 text-[#111111]/40"
                                        placeholder={input.placeholder}
                                        type={input.type}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />)
                }
                <Button type="submit" variant='blue' className="cursor-pointer sm:text-ds-[16] text-white font-medium w-[177px] h-[39px] sm:w-ds-[177] sm:h-ds-[39] mt-ds-[20] text-base">Request a Demo</Button>
            </form>
        </Form>
    )
}

export default GForm