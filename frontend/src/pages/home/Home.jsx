
//ce fichier Home est le parent de HomePosts
import HomePosts from "../../composants/homeposts/HomePosts";
import Navbar from "../../composants/navbar/Navbar";
import axios from "axios";
import { URL, IF } from "../../url";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../composants/loader/Loader";
import { UserContext } from '../../context/UserContext'


function Home() {
  const { search } = useLocation();
  // console.log(search)
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);//barre de recherche search
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  // console.log(user)

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      // console.log(res.data)
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      <div >
        {loader ? (
          <div >
            <Loader width={15}/>
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <>
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts key={post._id} post={post} />                
              </Link>             
            </>
          ))
        ) : (
          <h3>Aucun article ne correspond à votre recherche</h3>
        )}
        
      </div>
     
    </>
  );
}

export default Home;
