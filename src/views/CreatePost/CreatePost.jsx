import { useContext, useState } from "react";
import { uploadPost } from "../../services/posts.services";
import { AppContext } from "../../store/app.context";
import { useNavigate } from "react-router-dom";
import BackBtn from '../../components/BackBtn/BackBtn';
import './CreatePost.css';

/**
 * CreatePost component allows users to create a new post.
 * It includes form fields for the post title and content, and validates the input before submission.
 *
 * @component
 * @returns {JSX.Element} The rendered CreatePost component.
 *
 */
export default function CreatePost() {
    const { userData } = useContext(AppContext);

    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        content: '',
    });

    /**
     * Updates the post state with the given key-value pair.
     *
     * @param {string} key - The key to update in the post state.
     * @param {string} value - The value to set for the given key.
     */
    const handleUpdateValue = (key, value) => {
        setPost({
            ...post,
            [key]: value,
        });
    }

     /**
     * Handles the creation of a new post.
     * Validates the input fields and uploads the post if valid.
     */
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
            await uploadPost(userData.username, post.title, post.content)
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
    <>
        <div className="create-post-container">
            <h3>Create Post</h3>
            <label htmlFor="title">Title: </label>
            <input value={post.title} onChange={e => handleUpdateValue('title', e.target.value)} type="text" name="title" id="create-title-input" />
            <br /> <br />
            <label htmlFor="content">Content: </label>
            <textarea value={post.content} onChange={e => handleUpdateValue('content', e.target.value)} name="content" id="create-content-textarea" cols="30" rows="10"></textarea>
            <br /> <br />
            <div className='create-post-btns'>
                <button className='create-post-btn btn' onClick={() => {
                    handleCreatePost();
                    navigate(`/`);
                    }
                    }>Create Post
                </button>
                <BackBtn />
            </div>
        </div>
    </>
    )
};
