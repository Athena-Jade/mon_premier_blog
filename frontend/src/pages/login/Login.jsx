import "./Login.css";
import axios from "axios";
import {URL} from '../../url'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

function Login() { 
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [error, setError]= useState(false)

  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()//permet de rediriger l'user vers la page qu'on voudrait

  const handleLogin = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(URL + "/api/auth/login", {email, password}, {withCredentials:true})
      //console.log(res.data);
      setUser(res.data)
      navigate("/")//dès que l'user est connecté le rediriger vers la page accueil (Home)
      
    } catch (error) {
      setError(true)
      console.log(error);
    }
  }

  return (
    <>  
    <form className ="login" onSubmit={handleLogin} >
      <h1>Login</h1>
      <input type="text"
        placeholder="email"
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input type="password"
        placeholder="password"
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button>Login</button>
      {error &&  <h3 style={{color:"red"}}>Un problème sur votre inscription</h3>}{/**si erreur alors affiche message */}
      <div className='lien-register'>
        <p >
          <Link to='/register'>Vous n'avez de compte, inscrivez-vous </Link>       
        </p>
      </div>     
    </form>
    </>
  )
}

export default Login
