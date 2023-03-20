import { useParams } from "react-router-dom"
import {  useSelector } from "react-redux"
import { selectUserById } from "./usersSlice"
import {useGetPostsByUserIdQuery} from '../posts/postsSlice'
import { Link } from "react-router-dom"

const UserPage = () => {
  const {userID} = useParams()
  const {
    data:userPosts,
          isError,
          isLoading,
        isSuccess,
      error} = useGetPostsByUserIdQuery(userID)

  const user = useSelector((state)=>selectUserById(state,Number(userID)))
  
  let renderedPosts
  if(isLoading){
    renderedPosts = <p>Loading...</p>
  }
  else if(isSuccess){
    const {ids,entities} = userPosts
      renderedPosts = ids.map(id=>(
        <li key={id}>
            <Link to={`/post/${id}`}>{entities[id].title}</Link>
        </li>
      ))
  } 
  else if (isError){
    renderedPosts = <p>{error}</p>
  }
return ( <section>
    <h2>{user?.name}'s posts</h2>
    <ol>{renderedPosts}</ol>
    </section> )
}

export default UserPage