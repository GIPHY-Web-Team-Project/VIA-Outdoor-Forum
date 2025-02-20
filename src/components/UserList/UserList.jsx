import React from 'react';

export default function UserList({ users, handleAdmin, handleBlock, handleDeleteUser }) {
    return (
        <div id="user-list-admin">
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.uid}>
                            <td>{user.username}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleAdmin(user.uid)}>{user.isAdmin ? "Remove admin" : "Make admin"}</button>
                                <button onClick={() => handleBlock(user.uid)}>{user.isBlocked ? "Unblock" : "Block"}</button>
                                <button onClick={() => handleDeleteUser(user.uid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}