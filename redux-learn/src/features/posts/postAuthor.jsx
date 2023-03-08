import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {selectAllUsers,fetchUsers} from "../users/usersSlice";

const postAuthor = ({userId}) => {
  // const dispatch = useDispatch()
//   useEffect(()=>{
//     dispatch(fetchUsers()).unwrap()
// },[])
  const users = useSelector(selectAllUsers)
  const author = users.find(user => user.id === userId)
  return <span>by {author? author.name:'Uknown author'}</span>
}

export default postAuthor