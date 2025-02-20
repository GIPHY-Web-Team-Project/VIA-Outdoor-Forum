import React from 'react';

export default function PostList({ posts, setPosts, originalPosts, setOriginalPosts }) {
    return (
        <div id="forum-list-admin">
            <h2>Posts</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Created on</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{post.createdOn}</td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}