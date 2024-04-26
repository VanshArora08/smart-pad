// import React from 'react'
import Quote from "../components/Quote"
import SignupForm from '../components/SignupForm'

export default function Signup() {
  return (
    <div className='grid grid-cols-2'>
      <SignupForm />
      <Quote/>
    </div>
  )
}
