import React from 'react';
import { useParams } from 'react-router-dom'
import { ParamsPost } from '../type';
import { useState ,useEffect,useRef} from 'react';
import { useDeletePostMutation, useGetPostQuery,useUpdatePostMutation} from '../api/apiSlice';
import { Post } from '../type';
export default function EditablePost() {
  const { id } = useParams<ParamsPost>() as ParamsPost
  const [deletePost] = useDeletePostMutation()
  const { data: Post } = useGetPostQuery(id)
  console.log('re-render post',Post?.name)
  const [post, setPost] = useState<Post | undefined>(Post)
  const [isShowEditBtn, setShowEditBtn] = useState<boolean>(true)
  const refEditContent = useRef<HTMLInputElement>(null)
  const [updatePost] = useUpdatePostMutation()
  useEffect(() => {
    if (Post) {
      setPost(Post)
      setPostContent(Post.name)
    }
  }, [Post])
  const handleShowPostContent = () => {
    setShowEditBtn(false)
    setPostContent(Post?Post.name:'')
    refEditContent.current?.focus()
  }
  const handleDeletePost = async () => {
    try {
      await deletePost(id)
      setPost(undefined)
      setPostContent('')
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleUpdatePost = () => {
    if (post) {
      updatePost(post)
    }
  }
  const EditPostsElement = () => {
    return (
      <div className='flex'>
        <button tabIndex={-1} className=' mx-1 px-1 h-9 border-slate-700 border-[0.5px]  bg-red-300'
        onClick={handleUpdatePost}
        >Edit post</button>
        <button tabIndex={-1} className=' mx-1 px-1 h-9 border-slate-700 border-[0.5px]  bg-red-300'
          onClick={handleDeletePost}
        >Delete</button>
        <button tabIndex={-1} className=' mx-1 px-1 h-9 border-slate-700 border-[0.5px]  bg-red-300'
          onClick={handleCanleEdit}
        >Cancle</button>
      </div>
    )
  }
  const [postContent,setPostContent]=useState('')
  const handleCanleEdit = () => {
    setShowEditBtn(true)
    setPostContent('')
  }
  const ShowPostsElemment = () => {
    return (
      <button tabIndex={-1} className=' mx-9 px-3 h-9 border-slate-700 border-[0.5px]  bg-red-300'
        onClick={handleShowPostContent}
      >Show post</button>
    )
  }
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostContent(e.target.value)
    setPost(prev => {
      const newPost = prev ? { ...prev, name:e.target.value } : undefined
      return newPost
    })
  }
  return (
    Post && id ?
      <div className='block'>
        <div className='flex'>
          <input type="text" className='px-3 w-[400px] h-9 outline-0 border-[0.5px]  border-slate-700' placeholder=''
            tabIndex={-1} value={postContent} ref={refEditContent}
            onChange={handleChangeInput} />
          {isShowEditBtn ? <ShowPostsElemment /> : <EditPostsElement />}
        </div>
        <p className='py-6'>
          {post ? post.id : null}
        </p>
      </div>
      :
      null
  )
}