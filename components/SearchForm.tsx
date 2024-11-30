import Form from 'next/form'
import React from 'react'
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = ({query}) => {
    console.log('Search params: ', query);    
    console.log('Query: ', query);
  return (
    <Form action={'/'} scroll={false} className='search-form'>
        <input 
            name='query'
            type="text"
            defaultValue={query || ''} 
            placeholder='Search startups'
            className='w-full outline-none h-full'
        
        />
        <div className="flex items-center gap-2">
            {query && <SearchFormReset />}
            <button className='search-btn text-white' type='submit'>
                <Search className='size-5'/>
            </button>
        </div>
    </Form>
  )
}

export default SearchForm