import React, { useContext, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import UserList from '../../views/UserList/UserList';
import { useUsers } from '../../hooks/useUsers';
import { updateUserData, deleteUserAccount } from '../../services/users.service';
import { AppContext } from '../../store/app.context';
import { useNavigate } from 'react-router-dom';

export default function UserActions() {
    const { userData } = useContext(AppContext);
    const navigate = useNavigate();
    const { users, setUsers, originalUsers, setOriginalUsers } = useUsers(userData, navigate);

    const handleDeleteUser = (uid) => {
        deleteUserAccount(uid)
            .then(() => {
                setUsers(users.filter(user => user.uid !== uid));
                setOriginalUsers(originalUsers.filter(user => user.uid !== uid));
                alert('User deleted successfully');
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const handleBlock = async (uid) => {
        if (!uid) {
            return;
        }
    
        const user = users.find(user => user.uid === uid);
        await updateUserData(uid, { isBlocked: !user.isBlocked });
    
        const updatedUsers = users.map(user => 
            user.uid === uid ? { ...user, isBlocked: !user.isBlocked } : user
        );
        setUsers(updatedUsers);
        setOriginalUsers(updatedUsers);
    };
    
    const handleAdmin = async (uid) => {
        if (!uid) {
            return;
        }
    
        const user = users.find(user => user.uid === uid);
        await updateUserData(uid, { isAdmin: !user.isAdmin });

        const updatedUsers = users.map(user => 
            user.uid === uid ? { ...user, isAdmin: !user.isAdmin } : user
        );
        setUsers(updatedUsers); 
        setOriginalUsers(updatedUsers);
    };

    return (
        <div id="user-list-admin">
            <SearchBar
                searchId="search"
                searchOptions={['username', 'email', 'name']}
                setData={setUsers}
                originalData={originalUsers}
            />
            <UserList
                users={users}
                setUsers={setUsers}
                handleAdmin={handleAdmin}
                handleBlock={handleBlock}
                handleDeleteUser={handleDeleteUser}
            />
        </div>
    );
}