import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { selectUserById,fetchUsers } from "./usersSlice"
import {fetchPosts, selectAllPosts,selectPostByUser} from '../posts/postsSlice'
import { Link } from "react-router-dom"

const UserPage = () => {
  const dispatch = useDispatch()
  const {userID} = useParams()
  const userPosts = useSelector(state=>selectPostByUser(state,Number(userID)))

  const user = useSelector((state)=>selectUserById(state,Number(userID)))
  
  const renderedPosts = userPosts.map(post=>(
    <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ))
return ( <section>
    <h2>{user?.name}'s posts</h2>
    <ol>{renderedPosts}</ol>
    </section> )
}

export default UserPage