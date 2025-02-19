import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getAllPosts, sortPosts } from "../../services/posts.services";
import { AppContext } from "../../store/app.context";
import { use } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState('recent');
  const navigate = useNavigate();

  const { user } = useContext(AppContext);

  useEffect(() => {
    getAllPosts()
      .then((posts) => setPosts(posts))
      .catch((error) => {
        alert(`Couldn't load posts: ${error.message}`);
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    setPosts(sortPosts(posts, sort));
  }, [sort]);


  return (
    <div className="home-container">
      <div>
        <h3>Home</h3>
        {user && <button onClick={() => navigate("/create-post")}>Create Post</button>}
      </div>
      {user && posts.length > 0 ?
        posts.map((post) => {
          return <div key={post.id} className="post">
            <h3 className="post-title">{post.title}</h3>
            <button onClick={() => navigate(`/posts/${post.id}`)} className="post-btn">Show More</button>
          </div>
        }) :
        <p>No posts found.</p>}
    </div>
  );
}
