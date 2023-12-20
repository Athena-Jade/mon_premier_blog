//page commentaires des users
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { URL } from "../../url";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function Comment({ c, post }) {
  const { user } = useContext(UserContext);
  
  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(post.userId)
  // console.log(user._id)
  // console.log(post)
  // console.log(user)




  return (
    <div className="principal">
      <div >
        <h3 >@{c.author}</h3>
        <div >
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {user?._id === c?.userId ? (
            <div >
              <p
               
                onClick={() => deleteComment(c._id)}
              >
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p >{c.comment}</p>
      
    </div>
  )
}

export default Comment
