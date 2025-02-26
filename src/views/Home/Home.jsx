import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../services/posts.services";
import { AppContext } from "../../store/app.context";
import Loading from "../../components/Loading/Loading";
import PostList from '../../components/PostList/PostList';
import { usePosts } from '../../hooks/usePosts';

export default function Home() {
  const navigate = useNavigate();
  const { user, userData } = useContext(AppContext);
  const { posts, setPosts, originalPosts, setOriginalPosts, isLoading } = usePosts(userData, navigate);

  return (
    <div className="home-container">
      <h3 className='title'>Home</h3>
      {isLoading ? <Loading /> : (
        <>
          {posts.length > 0 ?
            <PostList posts={posts} id={'home'} setPosts={setPosts} originalPosts={originalPosts} setOriginalPosts={setOriginalPosts} />:
            <p>No posts found.</p>}
        </>
      )}
    </div>
  );
}
