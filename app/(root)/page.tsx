import SearchForm from '@/components/SearchForm'
import StartupCard from '@/components/StartupCard';
import React from 'react'

export const metadata = {
  title: 'YC Directory'
}

const HomePage = async ({searchParams} : {searchParams : Promise<{query?: string}>}) => {
  const query = (await searchParams).query;
  

  const posts = [
    {
      _createdAt: new Date().toDateString(),
      views: 55,
      author: {_id: 1, name: 'Ashik'},
      _id: 1,
      description: 'This is a description',
      image: 'https://images.pexels.com/photos/7868892/pexels-photo-7868892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Robotics',
      title: 'We robots'
    }
  ];

  return (
    <>
      <section className='pink_container'>
        <h1 className="heading">Pitch Your Startup<br/>Connect with Entrepreneurs</h1>
        <p className='sub-heading !max-w-3xl'>Submit ideas, vote on pitches. Get noticed.</p>
        <SearchForm query={query}/>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  )
}

export default HomePage