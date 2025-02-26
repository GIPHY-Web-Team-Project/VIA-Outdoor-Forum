import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../store/app.context";
import { getAuthorComments } from "../../services/comment.services";
import "./MyComments.css";
import { useNavigate } from 'react-router-dom';
import BackBtn from '../../components/BackBtn/BackBtn';
import { formatDate } from '../../services/date.services';

/**
 * MyComments component fetches and displays comments made by the logged-in user.
 * 
 * This component uses the AppContext to get the user data and fetches the comments
 * made by the user using the getAuthorComments function. It handles loading and error
 * states and displays the comments in a list format. Each comment includes a title,
 * content, author, creation date, and a button to navigate to the related post.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 */
export default function MyComments() {
    const { userData } = useContext(AppContext);
    const [comments, setComments] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

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
    <>
            <BackBtn />
        <div className="my-comments-container">
            <h2>My Comments</h2>
            {comments.length > 0 ? (
                <ul className="my-comments-list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment-item">
                            <h3 className="comment-title">{comment.title}</h3>
                            <p className="comment-content">{comment.content}</p>
                            <p className="comment-author">Author: {comment.author}</p>
                            <p className="comment-date">Created on: {formatDate(comment.createdOn)}</p>
                            <button className='btn' onClick={() => navigate(`/posts/${comment.postId}`)}>Go to Post</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments found.</p> 
            )}
        </div>
    </>
    );
}
