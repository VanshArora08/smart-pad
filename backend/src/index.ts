import { Hono } from 'hono'

const app = new Hono()

app.post('/api/v1/signup',(c)=>{
  return c.json({message:'Signup'})
})

app.post('/api/v1/signin',(c)=>{
  return c.json({message:'Signin'})
})

app.post('/api/v1/blog',(c)=>{
  return c.json({message:'Blog Created'})
})

app.put('/api/v1/blog',(c)=>{
  return c.json({message:'Blog Updated'})
})

app.get('/api/v1/blog/:id',(c)=>{
  return c.json({message:'Blog List'})
})



export default app
