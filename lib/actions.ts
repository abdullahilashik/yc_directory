/* eslint-disable */
"use server"

import { auth } from "@/auth"
import { writeClient } from "@/sanity/lib/write-client"
import { StartupCreateSchema } from "@/schema/startup-create-schema"
import { z } from "zod"

export const createNewStartupAction = async(values: z.infer<typeof StartupCreateSchema>) => {
    try{
        const session = await auth();
        if(!session){
            return {
                success: false,
                message: 'Failed to create new startup'
            }
        }

        const slug = values.title.replaceAll(' ','-');

        const payload = {
            ...values,
            image: values.image_url,
            author: {
                _type: "reference",
                _ref: session?.id
            },
            slug: {
                _type: slug,
                current: slug
            }
        }

        const response = await writeClient.create({
            _type: 'startup',
            ...payload
        });

        return {
            success: true,
            message: 'Successfully created',
            response
        }
    
    }catch(error){
        return {
            success: false,
            message: 'Failed to create new startup'
        }
    }
}