import { useContext, useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../services/posts-services";
import { AppContext } from "../../store/app.context";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const { user } = useContext(AppContext);

  useEffect(() => {
    getAllPosts()

  }, []);

  return (
    <div className="home-container">
      <div>
        <h3>Home</h3>
        {user && <button onClick={() => navigate("/create-post")}>Create Post</button>}
      </div>
      <Post />
    </div>
  );
}
