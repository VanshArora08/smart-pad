import z from 'zod'

// signup
export const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string()
})

export type SignupInput = z.infer<typeof signupInput>


// login
export const loginInput = z.object({
  username: z.string().email(),
  password: z.string().min(6)
})

export type LoginInput = z.infer<typeof loginInput>


// create blog
export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  thumbnail: z.string()
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

// update blog
export const updateBlogInput = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  thumbnail: z.string()
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>