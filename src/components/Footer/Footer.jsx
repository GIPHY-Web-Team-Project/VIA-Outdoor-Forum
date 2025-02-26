import React, { useEffect } from 'react';
import './Footer.css';
import { useState } from 'react';
import { subscribeToStats } from '../../services/stats.services';


/**
 * Footer component that displays statistics and copyright information.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 *
 * @returns {JSX.Element} The rendered footer component.
 */
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
            <p>Total Posts: {stats.totalPosts} &nbsp;&nbsp;|&nbsp;&nbsp; Total Comments: {stats.totalComments} &nbsp;&nbsp;|&nbsp;&nbsp; Total Users: {stats.totalUsers}</p>   
            <p>©2025 VIA Outdoor Forum</p>
        </footer>
    )
}