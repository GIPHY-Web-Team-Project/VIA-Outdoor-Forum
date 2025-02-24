import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import UserActions from '../../components/UserActions/UserActions';
import PostActions from '../../components/PostActions/PostActions';
import SortMenu from '../../components/SortMenu/SortMenu';
import { sortPosts } from "../../services/posts.services";
import './AdminDashboard.css';

export default function AdminDashboard({ selectedOption }) {

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