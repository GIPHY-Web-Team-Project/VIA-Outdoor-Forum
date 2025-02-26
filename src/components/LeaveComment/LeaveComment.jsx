import { useContext, useState } from "react";
import { uploadComment } from "../../services/comment.services";
import { AppContext } from "../../store/app.context";
import "./LeaveComment.css";

/**
 * LeaveComment component allows users to leave a comment on a post.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.post - The post object to which the comment is related.
 * @returns {JSX.Element} The rendered LeaveComment component.
 * 
 * @example
 * <LeaveComment post={post} />
 * 
 * @function
 * @name LeaveComment
 * 
 * @description
 * This component provides a textarea for users to input their comments and a button to submit the comment.
 * It validates the comment content to ensure it is not empty and its length is between 1 and 8192 characters.
 * On successful submission, the comment is uploaded and the textarea is cleared.
 * 
 * @throws Will alert the user if the comment content is empty or does not meet the length requirements.
 * Will also alert the user if there is an error during the comment upload process.
 */
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
