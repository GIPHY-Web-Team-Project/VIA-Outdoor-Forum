import { useContext } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../store/app.context";
import Loading from "../../components/Loading/Loading";
import PostList from '../../components/PostList/PostList';
import { usePosts } from '../../hooks/usePosts';
import { HOME } from '../../common/enums';

export default function Home() {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const { posts, setPosts, originalPosts, setOriginalPosts, isLoading } = usePosts(userData, navigate);

  return (
    <div className="home-container">
      <h3 className='title'>Home</h3>
      {userData && !userData.isBlocked && <button className='btn' id='create-post-btn' onClick={() => navigate("/create-post")}>Create Post</button>}
      {isLoading ? <Loading /> : (
        <>
          {posts.length > 0 ?
            <PostList posts={posts} id={HOME} setPosts={setPosts} originalPosts={originalPosts} setOriginalPosts={setOriginalPosts} />:
            <p>No posts found.</p>}
        </>
      )}
    </div>
  );
}
