import React, { useContext } from 'react';
import { AppContext } from "../../store/app.context";
import { useNavigate } from 'react-router-dom';
import UserActions from '../../components/UserActions/UserActions';
import PostActions from '../../components/PostActions/PostActions';
import { useUsers } from '../../hooks/useUsers';
import { usePosts } from '../../hooks/usePosts';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const { userData } = useContext(AppContext);
    const navigate = useNavigate();
    const { users, setUsers, originalUsers, setOriginalUsers } = useUsers(userData, navigate);
    const { posts, setPosts, originalPosts, setOriginalPosts } = usePosts(userData, navigate);

    const handleSearch = (searchFor) => {
        if (searchFor === 'users') {
            document.getElementById('user-list-admin').style.display = 'block';
            document.getElementById('forum-list-admin').style.display = 'none';
        }
        if (searchFor === 'posts') {
            document.getElementById('user-list-admin').style.display = 'none';
            document.getElementById('forum-list-admin').style.display = 'block';
        }
    }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div id="admin-actions">
                <button onClick={() => handleSearch('users')}>Users</button>
                <button onClick={() => handleSearch('posts')}>Posts</button>
            </div>
            <UserActions />
            <PostActions />
        </div>
    );
}