import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
        
    },
    Variables:{
        userId:string;
    }
}>();


blogRouter.use("/*",async (c,next)=>{
    const token=c.req.header("Authorization");
    if(!token){
      c.status(401);
      return c.json({message:'Unauthorized'})
    }
    try{
      const payload=await verify(token,c.env.JWT_SECRET);
      if(payload.id){
        c.set("userId",payload.id)
        await next();

      }
      else{
        c.status(401);
        return c.json({message:'Unauthorized'})
      }
    }catch(e){
      c.status(401);
      return c.json({message:'Unauthorized'})
    }
  })
  


blogRouter.post("/",async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body=await c.req.json();
    const blog=await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        authorId:c.get("userId"),
        thumbnail:body.thumbnail
      }
    })
  
    return c.json({message:'Blog created',blogId:blog.id})
})


blogRouter.put("/",async (c)=>{
    const body=await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog=await prisma.post.update({
            where:{
                id:body.id,
                authorId:c.get("userId")
            },
            data:{
                title:body.title,
                content:body.content,
            }
        })
        return c.json({message:'Blog updated',blogId:blog.id})
    }catch(e){
        c.status(411);
        return c.json({message:'Blog not found'})
    }
})

blogRouter.get("/:id",async (c)=>{
    // const body=await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog=await prisma.post.findFirst({
            where:{
                id:c.req.param("id")
            }
        })
        return c.json({message:'Blog fetched',blog:blog})
    }catch(e){
        c.status(411);
        return c.json({message:'Blog not found'})
    }
})
blogRouter.get("/bulk",async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs=await prisma.post.findMany();
    return c.json({message:'Blogs fetched',blogs:blogs})
})