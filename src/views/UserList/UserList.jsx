import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import SortUsers from '../../components/SortUsers/SortUsers'; 
import { sortUsers }  from '../../services/users.service';
import './UserList.css';

export default function UserList({ users, setUsers, handleAdmin, handleBlock, handleDeleteUser }) {
    const [ sort, setSort ] = useState('newest');
    const navigate = useNavigate();

    const sortedUsers = useMemo(() => {
        return sortUsers(users, sort);
    }, [users, sort]);

    useEffect(() => {
        if (JSON.stringify(users) !== JSON.stringify(sortedUsers)) {
            setUsers(sortedUsers);
        }
    }, [sortedUsers, users, setUsers]);

    const handleProfileClick = (uid) => {
        navigate(`/users/${uid}`);
    };

    const handleAdminClick = (uid) => {
        handleAdmin(uid);
        setUsers(users.map(user => user.uid === uid ? { ...user, isAdmin: !user.isAdmin } : user));
    }

    const handleBlockClick = (uid) => {
        handleBlock(uid);
        setUsers(users.map(user => user.uid === uid ? { ...user, isBlocked: !user.isBlocked } : user));
    }

    return (
        <div id="user-list-admin">
            <SortUsers users={users} setSort={setSort}/>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.uid} className="user-item">
                        <img
                            src={user.profilePicture || "../../common/images/avatar.jpg"}
                            alt="Avatar"
                            className="user-avatar"
                            onClick={() => handleProfileClick(user.uid)}
                        />
                        <h3>{user.username}</h3>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.email}</p>
                        <div className="user-buttons">
                            <button
                                className="user-admin-button"
                                onClick={() => handleAdminClick(user.uid)}>{user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                            </button>
                            <button
                                className="user-block-button"
                                onClick={() => handleBlockClick(user.uid)}>{user.isBlocked ? 'Unblock' : 'Block'}
                            </button>
                            <button className="user-remove-button" onClick={() => handleDeleteUser(user.uid)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

UserList.propTypes = {
    users: PropTypes.array,
    handleAdmin: PropTypes.func,
    handleBlock: PropTypes.func,
    handleDeleteUser: PropTypes.func,
};