import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/posts.services';

export const usePosts = (userData, navigate) => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [originalPosts, setOriginalPosts] = useState([]);

    useEffect(() => {
        // if (!userData.isAdmin) {
        //     navigate('/');
        //     return;
        // }
        setIsLoading(true);

        getAllPosts()
            .then(posts => {
                setPosts(posts);
                setOriginalPosts(posts);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                alert(`Couldn't load posts: ${error.message}`);
                setIsLoading(false);
            });
    }, [userData, navigate]);

    return { posts, setPosts, originalPosts, setOriginalPosts, isLoading };
}