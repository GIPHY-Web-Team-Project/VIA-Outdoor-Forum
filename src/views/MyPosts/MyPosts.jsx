import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../store/app.context";
import { getAuthorPosts } from "../../services/posts.services";
import Loading from "../../components/Loading/Loading";
import PostList from '../../components/PostList/PostList';
import { MY_POSTS } from '../../common/enums';

export default function MyPosts() {
    const [isLoading, setIsLoading] = useState(false);
    const { user, userData } = useContext(AppContext);
    const [posts, setPosts] = useState([]);
    const [originalPosts, setOriginalPosts] = useState([]);


    useEffect(() => {
        setIsLoading(true);

        if (userData?.username) {
            getAuthorPosts(userData.username)
                .then((filteredPosts) => {
                    setPosts(filteredPosts)
                    setIsLoading(false);
                })
                .catch((error) => {
                    alert(`Couldn't load posts: ${error.message}`);
                    console.error(error.message);
                    setIsLoading(false);
                });
        }
    }, [user, userData]);

    return (
        <div>
            <h3>My Posts</h3>
            {isLoading ? <Loading /> : (
                <>
                    {user && posts.length > 0 ?
                        <PostList posts={posts} id={MY_POSTS} setPosts={setPosts} originalPosts={originalPosts} setOriginalPosts={setOriginalPosts}/> :
                        <p>No posts found.</p>}
                </>
            )}
        </div>
    )
};