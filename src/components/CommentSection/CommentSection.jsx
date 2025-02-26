import { useEffect, useState, useContext } from "react";
import { deleteComment, getAllComments } from "../../services/comment.services";
import LeaveComment from "../LeaveComment/LeaveComment";
import "./CommentSection.css";
import { useParams } from "react-router-dom";
import Comment from '../Comment/Comment';
import { AppContext } from '../../store/app.context';

/**
 * CommentSection component renders the comment section for a given post.
 * It fetches and displays comments and allows users to leave new comments if they are not blocked.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.post - The post object for which comments are being displayed.
 * @returns {JSX.Element} The rendered CommentSection component.
 *
 * @example
 * <CommentSection post={post} />
 */
export default function CommentSection({ post }) {
    const { userData } = useContext(AppContext);
    const [comments, setComments] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchComments = async () => {
            const unsubscribe = getAllComments(id, setComments)
            return () => {
                unsubscribe();
            }
        };

        fetchComments();
    }, [post.id]);

    const handleDelete = async (id) => {
        try {
            await deleteComment(id);
        } catch (error) {
            console.error(error);
            alert('Failed to delete comment!');
            
        }
    }

    return (
        <div className="comment-section">
            { userData && !userData.isBlocked && 
            <LeaveComment post={post} />
            }
            <div className="comments-list">
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} handleDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}
