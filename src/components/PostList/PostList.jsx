import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './PostList.css';
import { deletePost } from '../../services/posts.services';
import { AppContext } from '../../store/app.context';

export default function PostList({ posts, id, setPosts, originalPosts, setOriginalPosts }) {
    const navigate = useNavigate();

    const { userData } = useContext(AppContext);

    const handleDeleteClick = (postId) => {
        return async () => {
            await deletePost(postId);

            setPosts(posts.filter(post => post.id !== postId));

            setOriginalPosts(originalPosts.filter(post => post.id !== postId));
        };
    };

    return (
        <div id={`forum-list-${id}`}>
            <ul className="post-list">
                {posts.map(post => (
                    <li key={post.id} className="post-item">
                        <p className="post-title">{post.title}</p>
                        <div className="post-meta">
                            <span>{post.createdOn}</span>
                            <label>|</label>
                            <span>{post.author}</span>
                        </div>
                        <button className='btn' onClick={() => navigate(`/posts/${post.id}`)}>Show More</button>
                        {id === 'admin' || userData?.username === post.author && <button id="delete-button-post" onClick={handleDeleteClick(post.id)}>Delete</button>}
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
