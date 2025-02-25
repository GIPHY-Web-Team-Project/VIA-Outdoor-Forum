import { useState, useEffect } from 'react';
import { getAllUsers } from '../services/users.service';

export const useUsers = (userData, navigate) => {
    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);

    useEffect(() => {
        if (!userData?.isAdmin) {
            navigate('/');
            return;
        }

        const fetchAllUsers = async() => {
            const unsubscribe = await getAllUsers((users) => {
            setUsers(users);
            setOriginalUsers(users);
        })

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
        }

        fetchAllUsers();
    }, [userData, navigate]);

    return { users, setUsers, originalUsers, setOriginalUsers };
}