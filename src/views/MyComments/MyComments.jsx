import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../store/app.context";
import { getAuthorComments } from "../../services/comment.services";
import "./MyComments.css";

export default function MyComments() {
    const { userData } = useContext(AppContext);
    const [comments, setComments] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (userData?.username) {
            setIsLoading(true);

            getAuthorComments(userData.username)
                .then((comments) => {
                    setComments(comments); 
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching comments:", error);
                    setError("Failed to load comments.");
                    setIsLoading(false);
                });
        }
    }, [userData]);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div className="my-comments-container">
            <h2>My Comments</h2>
            {comments.length > 0 ? (
                <ul className="my-comments-list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment-item">
                            <h3 className="comment-title">{comment.title}</h3>
                            <p className="comment-content">{comment.content}</p>
                            <p className="comment-author">Author: {comment.author}</p>
                            <p className="comment-date">Created on: {comment.createdOn}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments found.</p> 
            )}
        </div>
    );
}
