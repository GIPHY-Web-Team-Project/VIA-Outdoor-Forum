import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate,  } from 'react-router-dom';
import './UserList.css';

export default function UserList({ users, handleAdmin, handleBlock, handleDeleteUser }) {
    const navigate = useNavigate();

    const handleProfileClick = (uid) => {
        navigate(`/users/${uid}`);
    };

    return (
        <div id="user-list-admin">
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
                            { user.isAdmin &&
                            <button 
                            className="user-admin-button" 
                            onClick={() => handleAdmin(user.uid)}>Remove admin</button>
                            }
                            { !user.isAdmin &&
                            <button 
                            className="user-admin-button" 
                            onClick={() => handleAdmin(user.uid)}>Make admin</button>
                            }
                            { user.isBlocked &&
                            <button 
                            className="user-block-button" 
                            onClick={() => handleBlock(user.uid)}>Unblock</button>
                            }
                            { !user.isBlocked &&
                            <button 
                            className="user-block-button" 
                            onClick={() => handleBlock(user.uid)}>Block</button>
                            }
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
