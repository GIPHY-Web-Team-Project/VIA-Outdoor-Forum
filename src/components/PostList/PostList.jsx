import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './PostList.css';
import { deletePost, sortPosts } from '../../services/posts.services';
import { AppContext } from '../../store/app.context';
import SortMenu from '../SortMenu/SortMenu';

export default function PostList({ posts, id, setPosts, originalPosts, setOriginalPosts }) {
    const navigate = useNavigate();
    const [ sort, setSort ] = useState('recent');
    const { user, userData } = useContext(AppContext);

    const handleDeleteClick = (postId) => {
        return async () => {
            await deletePost(postId);
            setPosts(posts.filter(post => post.id !== postId));
            setOriginalPosts(originalPosts.filter(post => post.id !== postId));
        };
    };

    const sortedPosts = useMemo(() => {
        return sortPosts(posts, sort);
    }, [posts, sort]);

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString(undefined, options);
    }

    useEffect(() => {
        if (JSON.stringify(posts) !== JSON.stringify(sortedPosts)) {
            setPosts(sortedPosts);
            setOriginalPosts(sortedPosts);
        }
    }, [sortedPosts, posts, setPosts, setOriginalPosts]);

    

    return (
        <div id={`forum-list-${id}`}>
            <SortMenu posts={posts} setSort={setSort} myPosts={id} />
            <ul className="post-list">
                {posts.map(post => (
                    <li key={post.id} className="post-item">
                        <p className="post-title">{post.title}</p>
                        <label className="post-content">{post.content}</label>
                        <div className="post-meta">
                        <span>{formatDate(post.createdOn)}</span>
                        <span>{post.author}</span>
                        </div>
                        <button className='btn' onClick={() => {
                            if (!user) {
                                navigate('/login');
                            } else {
                                navigate(`/posts/${post.id}`)
                            }
                        }}>Show More</button>
                        {(id === 'admin' || userData?.username === post.author) && <button id="delete-button-post" onClick={handleDeleteClick(post.id)}>Delete</button>}
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
