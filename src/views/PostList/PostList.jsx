import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './PostList.css';

export default function PostList({ posts, setPosts, originalPosts, setOriginalPosts }) {
    const navigate = useNavigate();

    const handleTitleClick = (postID) => {
        navigate(`/posts/${postID}`);
    }
    
    return (
        <div id="forum-list-admin">
            <ul className="post-list">
                {posts.map(post => (
                    <li key={post.id} className="post-item">
                        <button className="post-title-button" onClick={() => handleTitleClick(post.id)}>
                            {post.title}
                        </button>
                        <label className="post-content">{post.content}</label>
                        <div className="post-meta">
                            <span>{post.createdOn}</span>
                            <label>|</label>
                            <span>{post.author}</span>
                        </div>
                        <button id="delete-button-post">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

PostList.propTypes = {
    posts: PropTypes.array,
    setPosts: PropTypes.func,
    originalPosts: PropTypes.array,
    setOriginalPosts: PropTypes.func,
};
