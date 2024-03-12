"use client"

import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Image prompt is required"
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1)
  })


const Transformation = () => {

    const [imgaes, setImages] = React.useState<string[]>([])

      // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        prompt: "",
        amount: "1",
        resolution: "256x256"
        },
    })

    const isLoading = form.formState.isSubmitting;
 
  // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        /*try {
            setImages([])
            //const response = await axios.post("/api/interior", values)

            //const urls = response.data.map((image: {url: string}) => image.url)
        }
        */
    }

  return (
    <div>
        <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="roudned-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                    <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='m-0 p-0'>
                        <Input 
                            placeholder="a cheerful modernist bedroom" 
                            {...field}
                            className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                            disabled={isLoading}
                            />
                    </FormControl>
                    </FormItem>
                )}
                />
                <Button 
                    className='col-span-12 lg:col-span-2 w-full'
                    disabled={isLoading}
                    >
                        Generate
                </Button>
            </form>
            </Form>
        </div>
        <div className='space-y-4 mt-4'>
            Generated Images
        </div>
    </div>
  )
}

export default Transformation