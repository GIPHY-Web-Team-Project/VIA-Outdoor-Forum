import React, { useContext, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import UserList from '../../views/UserList/UserList';
import { useUsers } from '../../hooks/useUsers';
import { deleteUserAccount, updateUserData } from '../../services/users.service';
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

    const handleBlock = (uid) => {
        if (!uid) {
            return;
        }

        const user = users.find(user => user.uid === uid);
        updateUserData(uid, { isBlocked: !user.isBlocked })
            .then(() => {
                setUsers(users.map(user => {
                    if (user.uid === uid) {
                        user.isBlocked = !user.isBlocked;
                    }
                    return user;
                }));
                setOriginalUsers(originalUsers.map(user => {
                    if (user.uid === uid) {
                        user.isBlocked = !user.isBlocked;
                    }
                    return user;
                }));
            })
            .catch(error => console.error('Error updating user:', error));
    };

    const handleAdmin = (uid) => {
        if (!uid) {
            return;
        }

        const user = users.find(user => user.uid === uid);
        updateUserData(uid, { isAdmin: !user.isAdmin })
            .then(() => {
                setUsers(users.map(user => {
                    if (user.uid === uid) {
                        user.isAdmin = !user.isAdmin;
                    }
                    return user;
                }));
                setOriginalUsers(originalUsers.map(user => {
                    if (user.uid === uid) {
                        user.isAdmin = !user.isAdmin;
                    }
                    return user;
                }));
            })
            .catch(error => console.error('Error updating user:', error));
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
                handleAdmin={handleAdmin}
                handleBlock={handleBlock}
                handleDeleteUser={handleDeleteUser}
            />
        </div>
    );
}