import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign} from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

userRouter.post('/signup',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body=await c.req.json();
    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password
      }
    })
  
    const token=await sign({
      id:user.id
    },c.env.JWT_SECRET,)
    return c.json({message:'Signup',token:token})
  })
  
  userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json();
    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    });
    if(!user){
      c.status(400);
      return c.json({message:'User not found'})
    }
  
    const token=await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({message:'Signin',token})
  })
  
