import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters').max(15, 'Phone number must be less than 15 characters'),
})

export const updateUserSchema = userSchema.extend({
  id: z.string(),
})

export type UserFormData = z.infer<typeof userSchema>
export type UpdateUserFormData = z.infer<typeof updateUserSchema>

