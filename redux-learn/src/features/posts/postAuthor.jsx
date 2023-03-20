import { useSelector } from "react-redux";
import {selectAllUsers} from "../users/usersSlice";
import { Link } from "react-router-dom";
const postAuthor = ({userId}) => {
  // const dispatch = useDispatch()
//   useEffect(()=>{
//     dispatch(fetchUsers()).unwrap()
// },[])
  const users = useSelector(selectAllUsers)
  const author = users.find(user => user.id === userId)
  return <span>by {author?<Link to={`/users/${userId}`}>{author.name}</Link>:'Uknown author'}</span>
}

export default postAuthor