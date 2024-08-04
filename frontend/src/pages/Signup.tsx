// import React from 'react'
import Quote from "../components/Quote"
import SignupForm from '../components/SignupForm'

export default function Signup() {
  return (
    <div className='grid md:grid-cols-2'>
      <SignupForm />
      <div className="invisible md:visible">
        <Quote/>
      </div>
    </div>
  )
}
