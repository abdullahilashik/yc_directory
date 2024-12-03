import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata = {
    title: "Submit Startup",
    description: "Create a startup pitch that's gonna blow everyone's mind!"
}

const StartupCreate = async () => {
    const session = await auth();
    if(!session){
        redirect('/');
    }
  return (
    <>
        <section className='pink_container !min-h-[230px]'>
            <h1 className="heading">Submit Your Startup</h1>
        </section>
        <StartupForm />
    </>
  )
}

export default StartupCreate