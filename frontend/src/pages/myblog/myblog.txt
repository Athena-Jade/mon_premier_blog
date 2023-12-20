
import Navbar from '../../composants/navbar/Navbar'
import { UserContext } from '../../context/UserContext'
import { useState, useEffect, useContext, useLocation } from 'react'
import axios from 'axios'
import { URL } from '../../url'
import HomePosts from '../../composants/homeposts/HomePosts'
import Loader from '../../composants/loader/Loader'
import { Link } from 'react-router-dom'

function MyBlogs() {
  const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)
  // console.log(user)

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/posts/user/"+user._id)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search])

  return (
    <div>
      <Navbar/>

      <div >
        {loader?<div ><Loader/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <HomePosts key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 >No posts available</h3>}
        </div>
      
    </div>
  )
}

export default MyBlogs
