import React, { useContext } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import PostList from '../PostList/PostList';
import { usePosts } from '../../hooks/usePosts';
import { AppContext } from '../../store/app.context';
import { useNavigate } from 'react-router-dom';

export default function PostActions() {
    const { userData } = useContext(AppContext);
    const navigate = useNavigate();
    const { posts, setPosts, originalPosts, setOriginalPosts } = usePosts(userData, navigate);

    return (
        <div id="forum-list-admin">
            <SearchBar
                searchId="search-posts"
                searchOptions={['title', 'author']}
                data={posts}
                setData={setPosts}
                originalData={originalPosts}
            />
            <PostList posts={posts} />
        </div>
    );
}