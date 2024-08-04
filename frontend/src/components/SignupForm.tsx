// import React from 'react'
import { Link } from 'react-router-dom'

export default function SignupForm() {
  return (
    <div className='flex flex-col items-center justify-center px-20 w-full border'>
      <h1 className='text-4xl w-full text-center font-bold'>Create an account</h1>
      <h2 className='text-lg text-slate-500 font-semibold'>Already have an account?{" "}
        <Link to={"/signin"}>
          <span className='underline hover:text-slate-800'>Login</span>
        </Link>
      </h2>
      <div className='flex flex-col mt-4 max-w-sm w-full gap-1'>
        <label htmlFor="username" className='text-lg'>Username</label>
        <input type="text" id='username' className='outline-gray-600 border-gray-300 border-2 rounded-md h-8 px-2'/>
        <label htmlFor="email" className='text-lg mt-3'>Email</label>
        <input type="email" id='email' className='outline-gray-600 border-gray-300 border-2 rounded-md h-8 px-2'/>
        <label htmlFor="pass" className='text-lg mt-3'>Password</label>
        <input type="password" id='pass' className='outline-gray-600 border-gray-300 border-2 rounded-md h-8 px-2'/>
        <button className='h-8 bg-black text-white font-semibold mt-2 rounded-md p-1 hover:bg-gray-900'>Sign Up</button>
      </div>
    </div>
  )
}
