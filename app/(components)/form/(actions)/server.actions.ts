'use server'

import { TFormSchema } from "@/schemas/form.schema";
import axios from "axios";


export const handleSubmit = async (values: TFormSchema) => {
    return await axios({
        url: process.env.NEXT_PUBLIC_FORM_URL as string,
        data: values,
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ApiKey": process.env.API_KEY
        },
    }).then((res) => res.data).catch((error) => console.log(error))

};