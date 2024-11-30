import Image from 'next/image'
import React from 'react'
import logoImage from '@/public/logo.png';
import Link from 'next/link';
import { auth, signOut,signIn } from '@/auth';
const Navbar = async () => {
    const session = await auth();
  return (
    <>
        <header className='px-5 py-3 shadow-sm bg-white font-work-sans text-black sticky top-0 backdrop-blur-lg'>
            <nav className='flex justify-between'>
                <Link href={'/'}>
                    <Image src={logoImage} alt='YC Directory' width={144} height={30} />
                </Link>
                {/* links */}
                <div className="flex items-center gap-5">
                    {(session && session?.user)  ? (
                        <>
                            <Link href={'/startup/create'}>
                                <span>Create</span>
                            </Link>
                            <form action={async ()=>{
                                'use server';
                                await signOut({redirectTo: '/'});
                            }}>
                                <button>Sign Out</button>
                            </form>
                            <Link href={'/users/' + session?.id || ''}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async()=>{
                            'use server';
                            await signIn('github');
                        }}>
                            <button>Login</button>
                        </form>
                    )
                }
                </div>
            </nav>
        </header>
    </>
  )
}

export default Navbar