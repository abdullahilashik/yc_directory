"use client";

import React from 'react'
import { Input } from './ui/input';
import {Controller, useForm} from 'react-hook-form';
import { StartupCreateSchema } from '@/schema/startup-create-schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { createNewStartupAction } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const StartupForm = () => {
    const router = useRouter();
    const {toast} = useToast();
    const {control, handleSubmit, formState: {errors, isSubmitting}} = useForm<z.infer<typeof StartupCreateSchema>>({
        resolver: zodResolver(StartupCreateSchema),
        defaultValues: {
            title: '',
            description: '',
            category: '',
            pitch: '',
            image_url: ''
        }
    });
    const handleStartupCreate = async(values: z.infer<typeof StartupCreateSchema>) => {
        try{
            const response = await createNewStartupAction(values);
            console.log("Got response: ", response);
            if(response.success){
                toast({
                    title: 'Success',
                    description: response.message,
                    variant: 'default'                 
                });
                router.push(`/startup/${response?.response?._id}`);
            }
        }catch(error){
            console.log('Got error response: ', error);
            toast({
                title: 'Error',
                description: 'Something went wrong!',
                variant: 'destructive'
            });
            // toast({
            //     title: error.message                    
            // });
        }
    }
  return (
    <form onSubmit={handleSubmit(handleStartupCreate)} className='startup-form'>
        {/* title */}
        <div>
            <label htmlFor="title" className='startup-form_label'>Title</label>
            <Controller 
                name='title'
                control={control}
                render={({field})=>(
                    <Input 
                        id='title'
                        {...field}
                        className='startup-form_input'                        
                        placeholder='Startup title'
                    />
                )}
            />
            {errors?.title && <p className='startup-form_error'>{errors?.title?.message}</p>}
        </div>
        {/* description */}
        <div>
            <label htmlFor="description" className='startup-form_label'>Description</label>
            <Controller 
                name='description'
                control={control}
                render={({field})=>(
                    <Textarea 
                        id='description'
                        {...field}
                        className='startup-form_textarea'                        
                        placeholder='Startup description'
                    />
                )}
            />
            {errors?.description && <p className='startup-form_error'>{errors?.description?.message}</p>}
        </div>
        {/* category */}
        <div>
            <label htmlFor="category" className='startup-form_label'>Category</label>
            <Controller 
                name='category'
                control={control}
                render={({field})=>(
                    <Input 
                        id='category'
                        {...field}
                        className='startup-form_input'                        
                        placeholder='Startup category'
                    />
                )}
            />
            {errors?.category && <p className='startup-form_error'>{errors?.category?.message}</p>}
        </div>
        {/* image url */}
        <div>
            <label htmlFor="image_url" className='startup-form_label'>Image url</label>
            <Controller 
                name='image_url'
                control={control}
                render={({field})=>(
                    <Input 
                        id='image_url'
                        {...field}
                        className='startup-form_input'                        
                        placeholder='Startup image_url'
                    />
                )}
            />
            {errors?.image_url && <p className='startup-form_error'>{errors?.image_url?.message}</p>}
        </div>
        {/* pitch */}
        <div data-color-mode="light">
            <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
            <Controller 
                name='pitch'
                control={control}
                render={({field})=>(
                    <MDEditor
                        value={field.value}
                        onChange={field.onChange}
                        preview='edit'
                        height={300}
                        style={{borderRadius: 20, overflow: 'hidden', border: '3px solid black'}}
                        textareaProps={{
                            placeholder: 'Describe your startup to everyone!'
                        }}
                        previewOptions={{
                            disallowedElements: ['style']
                        }}
                    />
                )}
            />
            {errors?.pitch && <p className='startup-form_error'>{errors?.pitch?.message}</p>}
        </div>
        <Button className='startup-form_btn text-white'>
            {isSubmitting ? 'Submitting...' : 'Submit Your Idea'}
            <Send className='size-6'/>
        </Button>
    </form>
  )
}

export default StartupForm