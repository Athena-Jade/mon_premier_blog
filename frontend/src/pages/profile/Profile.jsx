import ProfilePosts from "../../composants/profileposts/ProfilePosts";
import axios from "axios";
import Navbar from "../../composants/navbar/Navbar";
import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { URL, IF } from "../../url";
import { UserContext } from "../../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";

function Profile() {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      // console.log(res.data);
      setUpdated(true);
    } catch (error) {
      // console.log(error);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(user)
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      // console.log(res.data)
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  return (
    <div>
      <Navbar />
      <section className="profile-user">
        
        <div style={{ maxWidth: "50%" }} className="user-profile-posts">
          <h1>Vous aviez écrit:</h1>
          {posts?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>
        <div className="form-profile">
          <div className="contenu-form-profile">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Your email"
              type="email"
            />
            {/**/}{" "}
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your password"
              type="password"
            />
            <div className="box-update-delete">
              <button onClick={handleUserUpdate} className="btn-profile">
                Mise à jour
              </button>
              <button onClick={handleUserDelete} className="btn-profile">
                Supprimer
              </button>
            </div>
            {updated && <h3>votre profil a été mis à jour avec succès!</h3>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
