import React from 'react';
import UserActions from '../../components/UserActions/UserActions';
import PostActions from '../../components/PostActions/PostActions';
import './AdminDashboard.css';
import BackBtn from '../../components/BackBtn/BackBtn';

export default function AdminDashboard({ selectedOption }) {

    return (
        <div className="admin-dashboard">
            <BackBtn />
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