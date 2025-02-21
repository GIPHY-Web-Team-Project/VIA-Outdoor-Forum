import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../store/app.context";
import { filterPostsAuthor, getAllPosts, sortPosts } from "../../services/posts.services";
import SortMenu from "../../components/SortMenu/SortMenu";
import { set } from "firebase/database";
import Loading from "../../components/Loading/Loading";
import { YOUR_POSTS } from "../../common/enums";

export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState('recent');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { user, userData } = useContext(AppContext);

    useEffect(() => {

        setIsLoading(true);

        getAllPosts()
            .then((posts) => filterPostsAuthor(posts, userData?.username))
            .then((filteredPosts) => {
                setPosts(filteredPosts)
                setIsLoading(false);
            })
            .catch((error) => {
                alert(`Couldn't load posts: ${error.message}`);
                console.error(error.message);
                setIsLoading(false);
            });
    }, [user, userData]);

    useEffect(() => {
        setPosts((prevPosts) => {
            if (!Array.isArray(prevPosts)) return [];
            return sortPosts([...prevPosts], sort)
        });
    }, [sort])



    return (
        <div>
            <h3>Your Posts</h3>
            {isLoading ? <Loading /> : (
                <>
                    <SortMenu setSort={setSort} yourPosts={YOUR_POSTS} />
                    {user && posts.length > 0 ?
                        posts.map((post) => {
                            return (
                                <div key={post.id} className="post">
                                    <h3 className="post-title">{post.title}</h3>
                                    <button onClick={() => navigate(`/posts/${post.id}`)} className="post-btn">Show More</button>
                                </div>
                            )
                        }) :
                        <p>No posts found.</p>}
                </>
            )}
        </div>
    )
};