import { useContext, useState } from "react";
import { uploadPost } from "../../services/posts.services";
import { AppContext } from "../../store/app.context";

export default function CreatePost() {
    const { userData } = useContext(AppContext);

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

    const handleCreatePost = async () => {
        if (!post.title || !post.content) {
            alert('Please fill all fields');
            return;
        }

        if (post.title.trim().length < 16 || post.title.trim().length > 64) {
            alert('Title must be between 16 and 64 characters');
            return;
        }

        if (post.content.trim().length < 32 || post.content.trim().length > 8192) {
            alert('Title must be between 32 and 8192 characters');
            return;
        }


        try {
            await uploadPost(userData.username, post.title, post.content);
            setPost({
                title: '',
                content: '',
            });
        } catch (error) {
            console.error(error);
            alert('Failed to upload post!');
        }
    };

    return (
        <div>
            <h3>Create Post</h3>
            <label htmlFor="title">Title: </label>
            <input value={post.title} onChange={e => handleUpdateValue('title', e.target.value)} type="text" name="title" id="title" />
            <br /> <br />
            <label htmlFor="content">Content: </label>
            <textarea value={post.content} onChange={e => handleUpdateValue('content', e.target.value)} name="content" id="content" cols="30" rows="10"></textarea>
            <br /> <br />
            <button onClick={handleCreatePost}>Create Post</button>
        </div>
    )
};
