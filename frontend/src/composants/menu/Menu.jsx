import {Link, useNavigate} from 'react-router-dom'
import './Menu.css'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import {URL} from '../../url'

function Menu() {
 const {user} = useContext(UserContext) 
 const {setUser}= useContext(UserContext) 
 const navigate= useNavigate()

  const handleLogout = async()=>{
    try {
      const res = await axios.get(URL + "/api/auth/logout", {withCredentials:true})
      //console.log(res);
      setUser(null)
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <nav className='menu'>
      <ul  className='menu-items'>
        {!user && (
          <li> 
            <Link style={{color:'black'}} to='/login'>connexion</Link>
          </li>
        )}

        {!user && (
          <li> 
            <Link style={{color:'black'}} to='/register'>Inscription</Link>
          </li>
        )}

        {user && (
          <li> 
            <Link  to={"/profile/" + user._id}>Profile</Link>
          </li>
        )}

        {user && (
          <li> 
            <Link  to='/write'>Ecrire un article</Link>
          </li>
        )}

        {user && (
          <li > 
            <Link to={"/myblogs/" + user._id}>My blogs</Link>
          </li>
        )} 
        
        {user && (
          <li  className='deconnexion' onClick={handleLogout}> 
            <Link>Déconnexion</Link>          
          </li>
        )}
      </ul>
    </nav>
      
    </>
  )
}

export default Menu
