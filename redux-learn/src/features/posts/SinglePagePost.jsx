import ReactionButton from "./ReactionButton";
import TimeAgo from "./TimeAgo";
import PostAuthor from "./postAuthor";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import {useParams} from 'react-router-dom'
import { Link } from "react-router-dom";

const SinglePagePost = () => {
  const {postID} = useParams()
  console.log(postID)
  const post = useSelector((state)=>selectPostById(state,Number(postID)))
  if(!post){
    return(
        <section>
            <p>
                No Post Found!
            </p>
        </section>
    )
  }
  else{
    return(
        <article>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className="postCredit">
              <Link to={`/post/edit/${post.id}`}>Edit post</Link>
              <PostAuthor userId={post.userId}/>
              <TimeAgo timeStamp={post.date}/>
            </p>
            <ReactionButton post={post}/>
        </article>
    )
}
}

export default SinglePagePost