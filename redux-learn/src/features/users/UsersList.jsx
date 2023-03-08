import { useSelector,useDispatch } from 'react-redux'
import { fetchUsers, selectAllUsers } from './usersSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const renderedUsers = users.map(user => (
  <li key={user.id}>
    <Link to={`/users/${user.id}`}>
        {user.name}
    </Link>
  </li>))

  useEffect(()=>{
    dispatch(fetchUsers()).unwrap()
  },[users])
    return (
        <section>
            <h2>Users</h2>
            <ul>{renderedUsers}</ul>
        </section>
  )
}

export default UsersList