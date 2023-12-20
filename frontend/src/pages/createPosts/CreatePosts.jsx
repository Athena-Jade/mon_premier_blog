import Navbar from '../../composants/navbar/Navbar'
import './CreatePosts.css'
import {ImCross} from 'react-icons/im'
import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { URL } from '../../url'

function CreatePosts() {

  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  const [file,setFile]=useState(null)

  const {user}=useContext(UserContext)

  const [cat,setCat]=useState("")
  const [cats,setCats]=useState([])
      
  const navigate = useNavigate();

  const deleteCategory = (i) => {
    //i index
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };
  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      // console.log(data)
      //img upload
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
        // console.log(imgUpload.data)
      } catch (err) {
        console.log(err);
      }
    }
    
    //post upload
    // console.log(post)
    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  }  
  
  return (
    <>
    <Navbar/>
    <div className="createposts">
      <h1>creer article</h1>
      <form >
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"           
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"            
          />
          <div className='creer-categorie'>
            <div >
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}                
                placeholder="Enter post category"
                type="text"
              />
              <div style={{color:"blue", fontWeight:"bold", margin:"1rem", cursor:"pointer"}}
                onClick={addCategory}                
              >
                 AJOUTER LA CATEGORIE               
              </div>
            </div>

            {/* categories */}
            <div >
              {cats?.map((c, i) => (
                <div
                  key={i}                 
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}                    
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={15}
            cols={30}           
            placeholder="Enter post description"
          /> 
          <button
            onClick={handleCreate}           
          >
            Créer
          </button>
        </form>
    </div>
    
    </>
  )
}

export default CreatePosts
