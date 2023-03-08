import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './index.css'
import { fetchPosts } from './features/posts/postsSlice'
import { fetchUsers } from './features/users/usersSlice'
import { useDispatch } from 'react-redux'

store.dispatch(fetchPosts())
store.dispatch(fetchUsers())
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <Routes>
      <Route path='/*' element={<App/>}/>
      </Routes>
  </Provider>
  </BrowserRouter>

)
