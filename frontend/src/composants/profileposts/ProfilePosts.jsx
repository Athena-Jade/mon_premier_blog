import "./ProfilePosts.css";

import { IF } from "../../url";
const ProfilePosts = ({ p }) => {
  // console.log(p)
  return (
    <section className="profile-posts">
      <div className="contenu-profile">       
        <img className="img-profile" src={IF + p.photo} alt="" />
      </div>

      <div className="droite">
        <h3 style={{textAlign:'center'}}>{p.title}</h3>
        <div className="config">
          <p className="author">@{p.username}</p>
          <div className="date">           
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </div>
          <div className="date">
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>           
          </div><br />
        </div>
        <div className="description">
          <p style={{marginTop:'1rem'}} >{p.desc.slice(0, 200) + " ...Lire la suite"}</p>
        </div>
        
      </div>
    </section>
  );
};

export default ProfilePosts;
