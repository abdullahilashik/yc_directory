import { defineQuery } from "next-sanity";

export const STARTUP_QUERIES = defineQuery(
    `*[_type=='startup' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc){
            _id,
            title,
            slug,
            description,
            author -> {
            _id,
            name,
            bio,
            image
            },
            image,
            views,
            category,
            pitch,
            _createdAt
        }`
)

export const STARTUP_BY_ID_QUERY = defineQuery(`*[_type=='startup' && _id match $id][0]{
  _id,
    _createdAt,
  title,
    slug,
    description,
    author -> {
      _id,
      name,
      username,
      bio,
      image
    },
    image,
    views,
    category,
    pitch
}`);
export const STARTUP_VIEWS_BY_ID_QUERY = defineQuery(`*[_type=='startup' && _id match $id][0]{
    _id,    
    views,
}`);

export const AUTHOR_BY_GITHUB_ID = defineQuery(`*[_type=="author" && id == $id][0]{
  _id,
    name,
    username,
    image,
    bio
}`);