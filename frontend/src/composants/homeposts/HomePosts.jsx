import "./HomePosts.css";

import { IF } from "../../url";
//je passe les props qui viennent de Home.js
function HomePosts({ post }) {
  return (
    <>
      <div className="contenair-homeposts">
        <div className="gauche">         
          <img className="img-homeposts" src={IF + post.photo} alt="photos" />         
        </div>

        <div className="droite">
           <h2 style={{textAlign:'center', color:"black", fontWeight:'bold'}}>{post.title}</h2>
          <div className="contenu-droite">            
            <p style={{color:'black'}}>@ {post.username}</p>
            <p style={{color:'gray'}}>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p style={{color:'gray'}}>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
                             
          <div className="article-homepost">
            <p style={{color:'black'}}className="description-article-homeposts">
              {post.desc.slice(0, 200) + " ... Read more"}
            </p>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default HomePosts;
