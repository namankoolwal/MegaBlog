import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/conf'
import { Container } from '../components'
import { PostForm } from '../components'

const EditPost = () => {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            service.getPost(slug)
            .then((post)=>{
                setPost(post)
            })
        }else{
            navigate('/')
        }
    },[slug, navigate])

  return (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  )
}

export default EditPost