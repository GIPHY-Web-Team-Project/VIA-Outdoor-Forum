import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/posts.services';

export const usePosts = (userData, navigate) => {
    const [posts, setPosts] = useState([]);
    const [originalPosts, setOriginalPosts] = useState([]);

    useEffect(() => {
        if (!userData?.isAdmin) {
            navigate('/');
            return;
        }

        getAllPosts()
            .then(posts => {
                setPosts(posts);
                setOriginalPosts(posts);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, [userData, navigate]);

    return { posts, setPosts, originalPosts, setOriginalPosts };
}