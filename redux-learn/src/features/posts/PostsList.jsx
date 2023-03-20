import { useSelector} from "react-redux";
import { selectPostIds } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";
import { useGetPostsQuery } from "./postsSlice";
const postsList = () => {
  const{
    isSuccess,
    isError,
    isLoading,
    error
  } = useGetPostsQuery()
  // const dispatch = useDispatch()
    const orderedPostIds = useSelector(selectPostIds)
    // useEffect(()=>{
    //   if  (postStatus==='idle')
    //   dispatch(fetchPosts()).unwrap()
    // },[postStatus])

    let renderedPosts
    if (isLoading)
    renderedPosts = <p>Loading...</p>
    else if(isSuccess){
    renderedPosts = orderedPostIds.map(postId => <PostExcerpt key={postId} postId={postId}/>)
    }
    else{
      renderedPosts = <p>{error}</p>
    }
  return (
    <section>
        <h2>Posts</h2>
        {renderedPosts}
    </section>
  )
}

export default postsList