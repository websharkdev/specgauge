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
        placeholder: 'Phone',
        name: 'phone',
        type: 'tel'
    },
    {
        placeholder: 'Company Name',
        name: 'company_name',
        type: 'text'
    },

]

type names = "name" | "email" | "phone" | "company_name"

const GForm = () => {
    const form = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: 380,
            company_name: "",
        },
    })
    function onSubmit(values: TFormSchema) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm flex flex-col items-center gap-y-4">
                {
                    inputs.map((input, index) => <FormField
                        key={`input-${input.name}-${index}`}
                        control={form.control}
                        name={input.name as names}
                        rules={{
                            onChange: (e) =>
                                input?.type === 'tel'
                                    ? form.setValue(input.name as names, +e.target.value)
                                    : form.setValue(input.name as names, e.target.value),
                        }}
                        render={({ field }) => (
                            <FormItem className="w-full max-w-[372px] h-full max-h-12">
                                <FormControl>
                                    <Input
                                        className="h-[49px] bg-[#F5F5F5] border-0 font-medium text-ds-[16] leading-[110%] px-5 py-4 placeholder:text-[#111111]/40 text-[#111111]/40"
                                        placeholder={input.placeholder}
                                        type={input.type}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />)
                }
                <Button type="submit" variant='blue' className="cursor-pointer w-[177px] text-ds-[16] text-white font-medium h-[39px] mt-ds-[20]">Request a Demo</Button>
            </form>
        </Form>
    )
}

export default GForm