import { useParams, useNavigate } from "react-router-dom";
import "./PostDetails.css";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Navbar from "../../composants/navbar/Navbar";
import axios from "axios";
import { URL, IF } from "../../url";
import { UserContext } from "../../context/UserContext";
import { useEffect, useState, useContext } from "react";
import Loader from '../../composants/loader/Loader'
import Comment from '../../composants/comment/Comment'

function PostDetails() {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      // console.log(res.data)
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try{
      const res=await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
      console.log(res.data)
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );

      // fetchPostComments()
      // setComment("")
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      {loader ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="postdetails">
          <div>
            <h1>{post.tile}</h1> {/** UNIQUEMENT si l'user est l'auteur de l'arcticle il pourra le supprimer ou le modifier */}
            {user?._id === post?.userId && (
              <div className="modifier-supprimer">
                <p className="modifier" onClick={() => navigate("/edit/" + postId)}>
                  Modifier<BiEdit style={{cursor:"pointer", color:"blue"}} />
                </p>
                <p className="supprimer"onClick={handleDeletePost}>
                  Supprimer<MdDelete style={{cursor:"pointer", color:"red"}}/>
                </p>
              </div>
            )}
          </div>

         
          <div className="photo-texte">                            
            <div className="box-img-details">
               <img className="img-postdetails" src={IF + post.photo} alt="" />               
            </div>
            
            <div className="box-texte">
               <p>@{post.username}</p>
               <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p> <br />
              <p className="mx-auto mt-8">{post.desc}</p>              
            </div>          
          </div>
         
          <div ><br />
            <p>Categories:</p>
            <div className="champs-categorie">
              {post.categories?.map((c, i) => (
                <>
                  <div className="nom-categorie" key={i} >
                    {c}
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="comments">
            <h3 >Commentaires:</h3><br />
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>

          {/* write a comment */}
          <div className="write-comment" >
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              
            />
            <button
              onClick={postComment}             
            >
              Ajouter un Commentaire
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetails;
