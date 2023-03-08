import { useDispatch } from "react-redux";
import { addNewPost } from "./postsSlice";
import { useState } from "react";
import {selectAllUsers} from '../users/usersSlice'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const form = () => {
  const navigate = useNavigate()
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const [userId,setUserId] = useState('')
  const [addRequestStatus,setAddRequestStatus]=useState('idle')
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()
  const onTitleInput = (e) => setTitle(e.target.value)
  const onContentInput = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setUserId(e.target.value)
  const canSave = [title,content,userId].every(Boolean) && addRequestStatus==='idle'

  const handleSave = (e)=>{
    if(canSave){
      try{
        setAddRequestStatus('pending')
        dispatch(addNewPost({title,body:content , userId})).unwrap()
    // setTitle('')
    // setContent('')
    // setUserId('')
    navigate('/')
      }catch(err){
        console.error('Failed to save the post',err)
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
        <h2>Add a new post</h2>
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
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="content">Content:</label>
            <textarea
            id="content"
            name="content"
            value={content}
            onChange = {onContentInput}/>
        <div><button type="button" onClick={handleSave} disabled={!canSave}>Save Post</button></div>
        </form>
    </section>
  )
  
}

export default form