import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getAllPosts, sortPosts } from "../../services/posts.services";
import { AppContext } from "../../store/app.context";
import SortMenu from "../../components/SortMenu/SortMenu";
import Loading from "../../components/Loading/Loading";
import PostList from '../../components/PostList/PostList';
import { usePosts } from '../../hooks/usePosts';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, userData } = useContext(AppContext);
  const { posts, setPosts, originalPosts, setOriginalPosts } = usePosts(userData, navigate);
  
  useEffect(() => {
    setIsLoading(true);

    getAllPosts()
      .then((posts) => {
        if (user) {
          setPosts(posts);
        } else {
          setPosts(posts.slice(0, 10));
        }

        setIsLoading(false);
      })
      .catch((error) => {
        alert(`Couldn't load posts: ${error.message}`);
        console.error(error.message);
        setIsLoading(false);
      });
  }, [user]);

  return (
    <div className="home-container">
      <h3>Home</h3>
      {isLoading ? <Loading /> : (
        <>
          <div>
            {user && userData && !userData.isBlocked && <button onClick={() => navigate("/create-post")}>Create Post</button>}
          </div>
          {posts.length > 0 ?
            <PostList posts={posts} id={'user'} setPosts={setPosts} originalPosts={originalPosts} setOriginalPosts={setOriginalPosts} />:
            <p>No posts found.</p>}
        </>
      )}
    </div>
  );
}
