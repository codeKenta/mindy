import React from 'react'
import Heading from '../Elements/Heading'
import PostForm from '../Forms/PostForm'

const NewPost = () => {
  return (
    <section>
      <Heading level={1}>New story</Heading>
      <PostForm />
    </section>
  )
}

export default NewPost
