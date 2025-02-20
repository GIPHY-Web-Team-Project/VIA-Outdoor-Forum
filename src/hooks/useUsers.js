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

        getAllUsers()
            .then(users => {
                setUsers(users);
                setOriginalUsers(users);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, [userData, navigate]);

    return { users, setUsers, originalUsers, setOriginalUsers };
}