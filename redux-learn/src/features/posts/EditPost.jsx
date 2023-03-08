import { useEffect, useState } from "react";
import { selectPostById, editPost, fetchPosts} from '../posts/postsSlice'
import { selectAllUsers } from "../users/usersSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deletePost } from "../posts/postsSlice";
const lskey = 'edit'
const lskeyUsers= 'users'
const EditPost = () => {
  const dispatch = useDispatch()
  const {postID} = useParams()
  const navigate = useNavigate()
  const users = useSelector(selectAllUsers)
  const [addRequestStatus,setAddRequestStatus]=useState('idle')
  // console.log(JSON.parse(localStorage.getItem(lskey)))
  const post =useSelector((state) => selectPostById(state,Number(postID)))
  ||JSON.parse(localStorage.getItem(lskey))
  // console.log(post)
  const [title,setTitle] = useState(post?.title)
  const [content,setContent] = useState(post?.body)
  const [userId,setUserId] = useState(post?.userId)
  // console.log(post.userId)
  if (!post) {
    return (
        <section>
            <h2>Post not found!</h2>
        </section>
    )
}  const onTitleInput = (e) => setTitle(e.target.value)
  const onContentInput = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setUserId(Number(e.target.value))
  const canSave = [title,content,userId].every(Boolean) && addRequestStatus==='idle'
  useEffect(()=>{
    localStorage.setItem(lskey,JSON.stringify(post))
  },[post])
  const handleDelete = (e) =>{
    try{
      setAddRequestStatus('pending')
      dispatch(deletePost({id: post.id})).unwrap()
      navigate('/')
    }catch(err){
      console.error('Failed to delete the post',err)
    }finally{
      setAddRequestStatus('idle')
    }
  }
  const handleSave = (e)=>{
    if(canSave){
      try{
        setAddRequestStatus('pending')
        dispatch(editPost({id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
        navigate(`/post/${post.id}`)
      }catch(err){
        console.error('Failed to update the post',err)
      }finally{
        setAddRequestStatus('idle')
      }
}
  }
  const userOptions = users.map(user =>(
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return(
    <section>
        <h2>Edit post</h2>
        <form>
        <label htmlFor="title">Title:</label>
        <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={onTitleInput}/>
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value="" defaultValue={post.userId}></option>
          {userOptions}
        </select>
        <label htmlFor="content">Content:</label>
            <textarea
            id="content"
            name="content"
            value={content}
            onChange = {onContentInput}/>
        <div><button type="button" onClick={handleSave} disabled={!canSave}>Save Post</button>
        </div>
        <div><button type="button" onClick={handleDelete}>Delete Post</button></div>
        </form>
    </section>
  )
  
}

export default EditPost