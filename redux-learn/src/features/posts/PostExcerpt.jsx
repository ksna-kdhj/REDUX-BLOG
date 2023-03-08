import ReactionButton from "./ReactionButton";
import TimeAgo from "./TimeAgo";
import PostAuthor from "./postAuthor";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

let PostExcerpt = ({postId}) => {
  const post = useSelector(state => selectPostById(state,postId))
  return (
    <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0,100)}</p>
            <p className="postCredit">
              <Link to={`post/${post.id}`}>View post</Link>
              <Link to={`post/edit/${post.id}`}>Edit post</Link>
              <PostAuthor userId={post.userId}/>
              <TimeAgo timeStamp={post.date}/>
            </p>
            <ReactionButton post={post}/>
        </article>
  )
}



export default PostExcerpt