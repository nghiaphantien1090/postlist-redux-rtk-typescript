import { Header } from "./Header"
import { AddPost } from "./AddPost"
import { PostList } from "./PostList"
import EditablePost from "./EditablePost"
import { useGetPostsQuery } from "../api/apiSlice"
import { PostManager } from "./PostManager"
export function Home() {
    const { data: posts } = useGetPostsQuery()
    return (
        <div>
            <Header />
            <AddPost />
            <PostManager>
                <>
                    <PostList posts={posts} />
                    <EditablePost />
                </>
            </PostManager>
        </div>
    )
}