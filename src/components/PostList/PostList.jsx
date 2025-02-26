import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './PostList.css';
import { deletePost, filterPosts, sortPosts } from '../../services/posts.services';
import { AppContext } from '../../store/app.context';
import SortMenu from '../SortMenu/SortMenu';
import { formatDate } from '../../services/date.services';

export default function PostList({ posts, id, setPosts, originalPosts, setOriginalPosts }) {
    const navigate = useNavigate();
    const [ filterMethod, setFilterMethod ] = useState('all');
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
    
    useEffect(() => {
        if (JSON.stringify(posts) !== JSON.stringify(sortedPosts)) {
            setPosts(sortedPosts);
            setOriginalPosts(sortedPosts);
        }
    }, [sortedPosts, posts, setPosts, setOriginalPosts]);
    
    useEffect(() => {
        if (filterMethod === 'all') {
            setPosts(originalPosts);
        } else {
            setPosts(filterPosts(originalPosts, filterMethod));
        }
    }, [filterMethod, originalPosts, setPosts]);

    return (
        <div id={`forum-list-${id}`}>
            <SortMenu posts={posts} setSort={setSort} setFilterMethod={setFilterMethod} id={id} />
            <ul className="post-list">
                {posts.map(post => (
                    <li key={post.id} className="post-item">
                        <p className="post-title">{post.title}</p>
                        <label className="post-list-content">{post.content.slice(0, 31)}...</label>
                        <div className="post-meta">
                        <span>{formatDate(post.createdOn)}</span>
                        <span>{post.author}</span>
                        </div>
                        <button className='btn post-list-btn' onClick={() => {
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
