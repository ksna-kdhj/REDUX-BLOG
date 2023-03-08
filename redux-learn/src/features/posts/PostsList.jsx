import { useSelector} from "react-redux";
import { selectPostIds,getPostError,getPostStatus } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";
const postsList = () => {
  // const dispatch = useDispatch()
    const orderedPostIds = useSelector(selectPostIds)
    const error = useSelector(getPostError)
    const postStatus = useSelector(getPostStatus)
    // useEffect(()=>{
    //   if  (postStatus==='idle')
    //   dispatch(fetchPosts()).unwrap()
    // },[postStatus])

    let renderedPosts
    if (postStatus === 'loading')
    renderedPosts = <p>Loading...</p>
    else if(postStatus==='succeeded'){
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