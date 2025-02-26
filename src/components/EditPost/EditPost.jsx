import { useState } from "react";
import { updatePost } from "../../services/posts.services";
import './EditPost.css';

export default function EditPost({ postId, setEdit }) {
    const [post, setPost] = useState({
        title: '',
        content: '',
    });

    const handleUpdateValue = (key, value) => {
        setPost({
            ...post,
            [key]: value,
        });
    }

    const handleEditPost = () => {
        if (!post.title || !post.content) {
            alert('Please fill in all fields!');
            return;
        }
        updatePost(postId, post.title, post.content);
        setEdit(false);
    }

    return (
        <div className='edit-post'>

            <p>Edit Post</p>
            <label htmlFor="title">Title: </label>
            <input value={post.title} onChange={e => handleUpdateValue('title', e.target.value)} type="text" name="title" id="title" />
            <br /> <br />
            <label htmlFor="content">Content: </label>
            <textarea value={post.content} onChange={e => handleUpdateValue('content', e.target.value)} name="content" id="content" cols="30" rows="10"></textarea>
            
            <div className='edit-post-btns'>
            <button className='btn' onClick={handleEditPost}>Save</button>
            <button className='btn' onClick={() => setEdit(false)}>Cancel</button>
            </div>
        </div>
    )
}