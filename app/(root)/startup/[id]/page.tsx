import { formateDate } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
const md = markdownit();



export const generateMetadata = async({params} : {params: Promise<{id: string}>}) => {
    const id = (await params).id;
    const {data: startup} = await sanityFetch({query: STARTUP_BY_ID_QUERY, params: {id}});
    if(startup){
        return {
            title: startup.title,
            description: startup.description
        }
    }
}

const StartupDetailsPage =  async ({params} : {params: Promise<{id: string}>}) => {
    const id = (await params).id;
    const {data: startup} = await sanityFetch({query: STARTUP_BY_ID_QUERY, params: {id}});
    console.log('Startups: ', startup);
    const parsedContent = md.render(startup?.pitch || '');

  return (
    <>
        <section className='pink_container !min-h-[230px]'>
            <p className='tag'>{formateDate(startup?._createdAt)}</p>
            <h1 className="heading">{startup?.title}</h1>
            <p className="sub-heading !max-w-5xl">{startup?.description}</p>
        </section>
        <section className="section_container">
            <img src={startup?.image} alt={startup?.title} className='w-full h-auto rounded-xl' />
            <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                <div className="flex-between gap-5">
                    <Link href={`/user/${startup?.author?._id}`} className='flex items-center gap-2'>
                        <Image
                            src={startup?.author?.image || 'https://placeholder.co/64x64'}
                            alt="avatar"
                            className="rounded-full drop-shadow-lg object-cover"
                            height={64}
                            width={64}
                        />
                        <div>
                            <p className="text-20-medium">{startup?.author?.name}</p>
                            <p className="text-16-medium !text-black">@{startup?.author?.username}</p>
                        </div>
                    </Link>
                    <p className="category-tag">{startup?.category}</p>
                </div>
                <h3 className="text-30-bold">Pitch Details</h3>
                {
                    startup?.pitch ? (
                        <article 
                            className='prose max-w-4xl font-work-sans break-all'
                        dangerouslySetInnerHTML={{__html: parsedContent}} />
                    ) : (
                        <p className="no-result">No Content found</p>
                    )
                }
            </div>
            {/* TODO: editors pick */}
            <Suspense fallback={<Skeleton className='view_skeleton' />}>
                <View id={startup?._id} />
            </Suspense>
        </section>
        <section>

        </section>
    </>
  )
}

export default StartupDetailsPage