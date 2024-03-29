"use client"

import React from 'react'

import axios from 'axios'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Card, CardFooter } from "@/components/ui/card"
import { amountOptions, resolutionOptions, stepOptions } from '@/constants'
import { useRouter } from 'next/router'
import { useToast } from '../ui/use-toast'
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import MediaUploader from './MediaUploader'
import Image from 'next/image'
import { Download } from 'lucide-react'
  

const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Image prompt is required"
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1),
    secure_url: z.string(),
    steps: z.string()
  })


const Transformation = () => {

    const [images, setImages] = React.useState<string[]>([])

    const { toast } = useToast()

    //cloudinary
    const [info, setInfo] = React.useState();
    

      // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        prompt: "",
        amount: "1",
        resolution: "256",
        steps: "10",
        secure_url: "",
        },
    })

    const isLoading = form.formState.isSubmitting;
 
  // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([])
            console.log(values)
            const response = await axios.post("/api/interior", values)

            console.log(response.data)
            setImages(response.data)

        } catch (error) {
            console.error(error)
        }
         finally {
         }
    }

  return (
    <div>
        <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 lg:flex lg:flex-col gap-2">
                <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                    <FormItem className='col-span-12 lg:col-span-6'>
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
                <FormField 
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem className='col-span-12 lg:col-span-2'>
                            <Select
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue defaultValue={field.value} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {amountOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}

                                        </SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>

                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="resolution"
                    render={({ field }) => (
                        <FormItem className='col-span-12 lg:col-span-2'>
                            <Select
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue defaultValue={field.value} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {resolutionOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}

                                        </SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>

                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="steps"
                    render={({ field }) => (
                        <FormItem className='col-span-12 lg:col-span-2'>
                            <Select
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue defaultValue={field.value} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {stepOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}

                                        </SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>

                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="secure_url"
                    render={({ field }) => (
                        <FormItem className='col-span-12 lg:col-span-2'>
                            <FormControl>
                                <MediaUploader
                                    onValueChange={field.onChange}
                                    setImage={setInfo}
                                    publicId={field.value}
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
        {images ? (
            <div className='space-y-4 mt-4'>
                <div>
                    <h2 className='text-lg'>Generated Images</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-2 gap-4 mt-8'>
                    {images.slice(1).map((image, index) => (
                        <Card key={index} className='rounded-lg overflow-hidden'>
                            <div className='relative aspect-square'>
                                <Image
                                    alt="Generated Image"
                                    src={image}
                                    fill={true}
                                />
                            </div>
                            <CardFooter>
                                <Button variant="secondary" className='w-full' onClick={() => {window.open(image)}}>
                                    <Download className='h-4 w-4 mr-2' />
                                    Download
                                </Button>
                            </CardFooter>
                        </Card>
                    
                    ))}
                </div>
            </div>

        ) : ""}
    </div>
  )
}

export default Transformation