import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './index.css'
import { extendedApiSlice } from './features/posts/postsSlice'
import {usersApiSlice} from './features/users/usersSlice'
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate())
store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <Routes>
      <Route path='/*' element={<App/>}/>
      </Routes>
  </Provider>
  </BrowserRouter>

)
