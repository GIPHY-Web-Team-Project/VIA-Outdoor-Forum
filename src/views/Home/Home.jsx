import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../services/posts-services";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts()

  }, []);

  return (
    <div className="home-container">
      <h3>Home</h3>
      <Post />
    </div>
  );
}
