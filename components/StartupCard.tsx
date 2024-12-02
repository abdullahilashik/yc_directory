import { formateDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StartupCard = ({post} : {post: StartupTypeCard}) => {
  return (
    <>
        <li className="startup-card group">
            {/* meta data */}
            <div className="flex-between">
                <p className="start_card_date">
                    {formateDate(post._createdAt)}
                </p>
                <div className="flex gap-1 5">
                    <EyeIcon className='size-6 text-primary'/>
                    <span className='text-16-medium'>{post.views}</span>
                </div>
            </div>
            {/* content author */}
            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${post?.author?._id}`}>
                        <p className="text-16-medium line-clamp-1">{post?.author?.name}</p>
                    </Link>
                    <Link href={`/startup/${post?._id}`}>
                        <h3 className="text-26-semibold line-clamp-1">{post?.title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${post?.author?._id}`}>
                    <Image 
                        src={post?.author?.image || 'https://placeholder.co/48x48'}
                        width={48}
                        height={48}
                        alt='author'
                        className='rounded-full'
                    />
                </Link>
            </div>
            <Link href={`/startup/${post?._id}`}>
                <p className="startup-card_desc">{post?.description}</p>
                <img src={post?.image} className='startup-card_img' alt="" />
            </Link>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/startup/${post?._id}`}>
                    <p className="text-16-medium">{post?.category}</p>
                </Link>
                <Button asChild className='startup-card_btn'>
                    <Link href={`/startup/${post?._id}`}>Details</Link>
                </Button>
            </div>
        </li>
    </>
  )
}

export default StartupCard