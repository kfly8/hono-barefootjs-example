import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  bio: z.string().max(200, 'Bio must be 200 characters or less').optional().default(''),
})

export type UserInput = z.infer<typeof userSchema>
