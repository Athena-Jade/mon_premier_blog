import { useState } from "react";
import "./Register.css";
import {Link, useNavigate} from 'react-router-dom'
import {URL} from '../../url'
import axios from 'axios'
import Navbar from "../../composants/navbar/Navbar";

  function Register() {

  const [username, setUsername]= useState('')
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [error, setError]= useState(false)
    
  const navigate = useNavigate()//permet de rediriger l'user vers la page qu'on veut
   
  const handleRegister =async (e)=>{
    e.preventDefault()
    try {
     const res = await axios.post(URL + "/api/auth/register", {username, email, password})
    // console.log(res.data);
     setUsername(res.data.username)
     setEmail(res.data.email)
     setPassword(res.data.password)
    
     setError(false)
     
     navigate("/login")//dès que l'user est enregistré, il sera redirigé vers page Login
     
    } catch (error) {
      setError(true)
      console.log(error);
    }
  }
   
  return (
   <>
   <Navbar/>
    <form className="register" onSubmit={handleRegister} >
      <h1>Register</h1>
      <input type="text"
        placeholder="username"
        onChange={(e)=>setUsername(e.target.value)}
      />

      <input type="text" 
       placeholder='email' 
       onChange={(e)=>setEmail(e.target.value)}
      />
        
      <input type="password"
        placeholder="password"
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button>Register</button>
      {error &&  <h3 style={{color:"red"}}>Un problème sur votre inscription</h3>}
      <div className="lien-register">
        <p> 
          <Link to='/login'>
           Vous avez déjà un compte, connectez-vous
          </Link>         
        </p>
      </div>     
    </form>
   </>
  )
  
}
  
export default Register
