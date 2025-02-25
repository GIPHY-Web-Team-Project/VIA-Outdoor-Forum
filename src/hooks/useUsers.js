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

        const unsubscribe = getAllUsers((users) => {
            setUsers(users);
            setOriginalUsers(users);
        })

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [userData, navigate]);

    return { users, setUsers, originalUsers, setOriginalUsers };
}