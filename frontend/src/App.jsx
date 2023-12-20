import './App.css'
import {Route, Routes} from'react-router-dom'



import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import PostDetails from './pages/postDetails/PostDetails'
import CreatePosts from './pages/createPosts/CreatePosts'
import EditPost from './pages/editpost/EditPost'
import { UserContextProvider } from './context/UserContext'
import Profile from './pages/profile/Profile'
import MyBlogs from './pages/myblog/MyBlogs'

function App() {
 
  return (
    <>

  <UserContextProvider>
    <Routes>
      <Route path ="/" element ={<Home/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/register' element ={<Register/>}/>
      <Route path='/write' element ={<CreatePosts/>}/>
      <Route path='/posts/post/:id' element ={ <PostDetails/>}/>
      <Route path='/edit/:id' element = {<EditPost/>}/>
      <Route path='/myblogs/:id' element = {<MyBlogs/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
    </Routes>
  </UserContextProvider>    
    </>
  )
}

export default App
