import { useContext, useState } from "react";
import { uploadComment } from "../../services/comment.services";
import { AppContext } from "../../store/app.context";
import "./LeaveComment.css";

export default function LeaveComment({ post }) {
    const { userData } = useContext(AppContext);

    const [comment, setComment] = useState({
        content: '',
    });

    const handleUpdateValue = (key, value) => {
        setComment({
            ...comment,
            [key]: value,
        });
    }

    const handleLeaveComment = async () => {
        if (!comment.content) {
            alert('Please fill the field');
            return;
        }

        if (comment.content.trim().length < 1 || comment.content.trim().length > 8192) {
            alert('Comment must be between 1 and 8192 characters');
            return;
        }

        try {
            await uploadComment(userData.username, post.id, comment.content);
            setComment({
                content: '',
            });
        } catch (error) {
            console.error(error);
            alert('Failed to upload comment!');
        }
    };

    return (
        <div className="leave-comment">
            <label htmlFor="content" className="comment-label">Leave Comment: </label>
            <textarea 
                value={comment.content} 
                onChange={e => handleUpdateValue('content', e.target.value)} 
                name="content" 
                id="content" 
                cols="15" 
                rows="5"
                className="comment-textarea"
            ></textarea>
            <br />
            <button onClick={handleLeaveComment} className="comment-button">Post</button>
        </div>
    );
}
