import './Navbar.css'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {FaBars} from 'react-icons/fa'
import Menu from '../menu/Menu'
import { useContext, useState } from 'react'
import {UserContext} from '../../context/UserContext'

function Navbar() {
  const [prompt, setPrompt]= useState("")
  //console.log(prompt);

  const [menu, setmenu]= useState(false) //false car le menu est fermé
  const navigate = useNavigate();
  const path = useLocation().pathname

  const showMenu =()=>{
    setmenu(!menu)
  }

  const {user} = useContext(UserContext)
 // console.log(user);
  return (
    <>
    <nav className='navbar'>
      <h1 className='titre-navbar' >
        <Link style={{textDecoration:'none', color:'black'}}to='/'>Mon Blog</Link>
      </h1> 

     {/**  <div className="search-bar">
        <p onClick={()=>navigate(prompt? "?search" +prompt:navigate("/"))}><BsSearch/> </p>
        <input onChange={(e)=>setPrompt(e.target.value)} className='input-search' type="text" placeholder='Rechercher un article' />
      </div>*/}

        {path === "/" && (
          <div className="flex justify-center items-center space-x-0">
            <p
              onClick={() =>
                navigate(prompt ? "?search=" + prompt : navigate("/"))
              }
              className="cursor-pointer"
            >
              <BsSearch style={{cursor:'pointer'}} />
            </p>
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="outline-none px-3 "
              placeholder="Rechercher un article"
              type="text"
            />
          </div>
      )}
    
      <ul className='menu-cache'>
        {user? (          
          <h3 >
            <Link style={{color:'black'}}to="/write">Ecrire un article</Link>  <br />
            <p style={{color:'blue', marginTop:'1rem'}}> Welcome {user.username}! </p>                     
          </h3>
           ):(
            <h3>
              <Link to="/login">Connexion</Link>
          </h3>
        )}

        {user? (
          <div onClick={showMenu}>
          <p >
            <FaBars />             
          </p>
          {menu && <Menu />}
        </div>
        ):(
          <h3>
            <Link to="/register">Inscription</Link>
          </h3>
        )}        
      </ul>
             
    </nav>
      
    </>
  )
}

export default Navbar
