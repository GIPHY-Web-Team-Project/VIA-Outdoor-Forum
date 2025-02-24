import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getAllPosts, sortPosts } from "../../services/posts.services";
import { AppContext } from "../../store/app.context";
import SortMenu from "../../components/SortMenu/SortMenu";
import Loading from "../../components/Loading/Loading";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState('recent');
  const navigate = useNavigate();

  const { user, userData } = useContext(AppContext);

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

  useEffect(() => {
    setPosts((prevPosts) => sortPosts([...prevPosts], sort));
  }, [sort])

  return (
    <div className="home-container">
      <h3>Home</h3>
      {isLoading ? <Loading /> : (
        <>
          <div>
            {user && userData && !userData.isBlocked && <button onClick={() => navigate("/create-post")}>Create Post</button>}
            <SortMenu setSort={setSort} />
          </div>
          {posts.length > 0 ?
            posts.map((post) => {
              return <div key={post.id} className="post">
                <h3 className="post-title">{post.title}</h3>
                <button onClick={() => {
                  if (user) {
                    navigate(`/posts/${post.id}`);
                  } else {
                    navigate('/login');
                  }
                }} className="post-btn">Show More</button>
              </div>
            }) :
            <p>No posts found.</p>}
        </>
      )}
    </div>
  );
}
