import React, { useContext } from 'react'
import {BlogContext} from '../../context/BlogContext'

const Blog = () => {

    const {blogData, blogIdList} = useContext(BlogContext)
        console.log(blogData, blogIdList)
  return (
    <div>
      <h1>This is Blog Page</h1>
    </div>
  )
}

export default Blog
