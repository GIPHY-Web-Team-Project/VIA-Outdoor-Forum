import React, { useContext, useState } from 'react';
import { AppContext } from "../../store/app.context";
import { useNavigate } from 'react-router-dom';
import UserActions from '../../components/UserActions/UserActions';
import PostActions from '../../components/PostActions/PostActions';
import { useUsers } from '../../hooks/useUsers';
import { usePosts } from '../../hooks/usePosts';
import Header from '../../components/Header/Header';
import './AdminDashboard.css';

export default function AdminDashboard({ onOptionSelect, selectedOption }) {
    const { userData } = useContext(AppContext);
    const navigate = useNavigate();
    const { users, setUsers, originalUsers, setOriginalUsers } = useUsers(userData, navigate);
    const { posts, setPosts, originalPosts, setOriginalPosts } = usePosts(userData, navigate);

    return (
        <div className="admin-dashboard">
            { selectedOption === 'users' && (
            <div id="user-list-admin" className="admin-list">
                <UserActions />
            </div>
            )}
            { selectedOption === 'posts' && (
            <div id="forum-list-admin" className="admin-list">
                <PostActions />
            </div>
            )}
        </div>
    );
}