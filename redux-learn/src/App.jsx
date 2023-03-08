import { useState } from 'react'
import Counter from './features/counter/counter'
import PostsList from './features/posts/PostsList'
import Form from './features/posts/form'
import {Routes,Route, Navigate} from 'react-router-dom'
import SinglePagePost from './features/posts/SinglePagePost'
import Layout from './components/Layout'
import EditPost from './features/posts/EditPost'
import UserPage from './features/users/UserPage'
import UsersList from './features/users/UsersList'
// import reactLogo from './assets/react.svg'
// import './App.css'

function App() {

  return(
      <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='Counter' element={<Counter/>}/>
      <Route index element={<PostsList/>}/>
      <Route path='post'>
      <Route index element={<Form/>}/>
      <Route path=':postID' element={<SinglePagePost/>}/>
      <Route path='edit/:postID' element={<EditPost/>}/>
      </Route>
      <Route path='users'>
        <Route index element={<UsersList/>}/>
        <Route path=':userID' element={<UserPage/>}/>
      </Route>
      <Route path='*' element={<Navigate to='/' replace/>}/>
      </Route>
      </Routes>
  )
}

export default App
