import {z} from 'zod';

export const StartupCreateSchema = z.object({
    title: z.string({required_error: 'Title is required'}).min(4, {message: 'Minimum of 4 characters arequired'}),
    description: z.string({required_error: 'Title is required'}).min(4, {message: 'Minimum of 4 characters arequired'}),
    category: z.string({required_error: 'Title is required'}).min(4, {message: 'Minimum of 4 characters arequired'}),
    image_url: z.string().url().optional(),
    pitch: z.string({required_error: 'Title is required'}).min(4, {message: 'Minimum of 4 characters arequired'}),
    
})