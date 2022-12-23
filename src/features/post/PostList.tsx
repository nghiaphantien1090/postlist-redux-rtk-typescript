import { Post } from "../type"
import { Link } from 'react-router-dom'
export function PostList({ posts }: { posts: Post[] | undefined }) {
    return (
        <div className=' px-10 lg:w-[500px] divide-y-[1px] divide-emerald-900'>
            <h1 className=' text-xl text-slate-800'>Post</h1>
            <ul className=' pt-3'>
                {
                    posts?.map((post) => <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.name}</Link>
                    </li>)
                }
            </ul>
        </div>
    )
}