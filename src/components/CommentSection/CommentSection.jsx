import { useEffect, useState } from "react";
import { getAllComments } from "../../services/comment.services";
import LeaveComment from "../LeaveComment/LeaveComment";
import "./CommentSection.css";
import { useParams } from "react-router-dom";

export default function CommentSection({ post }) {
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

    return (
        <div className="comment-section">
            <LeaveComment post={post} />
            <div className="comments-list">
                {comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                        <p className="comment-author"><strong>{comment.author}</strong></p>
                        <p className="comment-content">{comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
