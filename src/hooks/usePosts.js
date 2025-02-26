import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/posts.services';

/**
 * Custom hook to fetch and manage posts.
 *
 * @param {Object} userData - The user data object.
 * @param {Function} navigate - The navigate function from react-router-dom.
 * @returns {Object} An object containing posts, setPosts, originalPosts, setOriginalPosts, and isLoading.
 *
 */
export const usePosts = (userData, navigate) => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [originalPosts, setOriginalPosts] = useState([]);

    useEffect(() => {
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