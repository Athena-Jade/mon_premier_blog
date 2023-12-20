import {useContext, useEffect, useState} from 'react'
import Navbar from '../../composants/navbar/Navbar'
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function EditPost() {
  const postId = useParams().id
  const {user} = useContext(UserContext)

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const fetchPost = async ()=>{
    try {
      const res = await axios.get(URL + "/api/posts/" + postId)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFile(res.data.photo)
      setCats(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async (e) => {
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
    try{
      const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
      navigate("/posts/post/"+res.data._id)
      // console.log(res.data)

    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=> {
    fetchPost()
  }, [postId])

  const deleteCategory = (i) => {
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

  return (
    <>
   <Navbar/>
   <div>
        <h1 >Update a post</h1>
        <form >
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter post title"           
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"           
          />
          <div >
            <div >
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                
              >
                Ajouter
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
            value={desc}
            rows={15}
            cols={30}
            
            placeholder="Enter post description"
          />
          <button
            onClick={handleUpdate}
            
          >
            mise à jour
          </button>
        </form>
      </div>
     </>
  )
}

export default EditPost
