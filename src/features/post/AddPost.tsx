import { useAddPostMutation } from "../api/apiSlice"
import React, { useState ,useEffect} from "react"
import { Post } from "../type"
import  MessageToast  from "../util/toast"
export function AddPost() {
  const [post, setPost] = useState<Pick<Post, 'name'>>({ name: '' })
  const [addPost] = useAddPostMutation()
  const handlePostContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ name: e.target.value })
  }
  const [isToast, setToast] = useState(false)

  const handleAddPost = async () => {
    await addPost(post).unwrap()
      .catch(error => {
        setToast(prev => { prev = true; return prev })
      })
  }
  useEffect(() => {
    const timeId = setTimeout(() => {
      setToast(false)
    }, 2000);
    return () => {
      clearTimeout(timeId)
    }
  }, [isToast])
  return (
    <div className='my-9 mx-9 flex'>
      <input type="text" tabIndex={-1} className='px-3 w-[400px] h-9 outline-0 border-[0.5px]
         border-slate-700' placeholder='Please input post...'
        value={post.name}
        onChange={handlePostContent}
      />
      <button tabIndex={-1} className=' mx-9 px-3 h-9 border-slate-700 border-[0.5px]  bg-red-300'
        onClick={handleAddPost}
      >Add post</button>
      <div>
        {isToast ? <MessageToast /> : null
        }
      </div>
    </div>
  )
}