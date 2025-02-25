import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../store/app.context";
import { filterPostsAuthor, getAllPosts, sortPosts } from "../../services/posts.services";
import Loading from "../../components/Loading/Loading";
import PostList from '../../components/PostList/PostList';
import { usePosts } from '../../hooks/usePosts';
import { useNavigate } from 'react-router-dom';

export default function MyPosts() {
    const [sort, setSort] = useState('recent');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { user, userData } = useContext(AppContext);
    const { posts, setPosts, originalPosts, setOriginalPosts } = usePosts(userData, navigate);

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

    return (
        <div>
            <h3>My Posts</h3>
            {isLoading ? <Loading /> : (
                <>
                    {user && posts.length > 0 ?
                        <PostList posts={posts} id={'my-posts'} setPosts={setPosts} originalPosts={originalPosts} setOriginalPosts={setOriginalPosts}/> :
                        <p>No posts found.</p>}
                </>
            )}
        </div>
    )
};