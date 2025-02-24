import React, { useEffect } from 'react';
import './Footer.css';
import { useState } from 'react';
import { subscribeToStats } from '../../services/stats.services';


export default function Footer() {
    const [stats, setStats] = useState({totalPosts: 0, totalComments: 0, totalUsers: 0});
    useEffect(() => {
        const unsubscribe = subscribeToStats(setStats);
        return () => {
            unsubscribe();
        }
    }, []);
    return (
        <footer>
            <p>©2025 VIA Outdoor Forum</p>
            <p>Total Posts: {stats.totalPosts}</p>
            <p>Total Comments: {stats.totalComments}</p>
            <p>Total Users: {stats.totalUsers}</p>    
        </footer>
    )
}