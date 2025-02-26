import { useContext, useState } from "react";
import { deleteComment, updateComment } from "../../services/comment.services";
import LikeButton from "../LikeButton/LikeButton";
import "./Comment.css";
import { AppContext } from "../../store/app.context";
import { formatDate } from '../../services/date.services';

/**
 * Comment component renders a single comment with options to edit or delete if the user is the author or an admin.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.comment - The comment data.
 * @param {string} props.comment.id - The unique identifier of the comment.
 * @param {string} props.comment.content - The content of the comment.
 * @param {string} props.comment.author - The author of the comment.
 * @param {string} props.comment.createdOn - The creation date of the comment.
 * @param {Array|Object} props.comment.likedBy - The list or object of users who liked the comment.
 *
 * @example
 * const comment = {
 *   id: '1',
 *   content: 'This is a comment',
 *   author: 'user1',
 *   createdOn: '2023-10-01',
 *   likedBy: ['user2', 'user3']
 * };
 * <Comment comment={comment} />
 *
 * @returns {JSX.Element} The rendered Comment component.
 */
export default function Comment({ comment }) {
  const { userData } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState({
    content: comment.content,
  });

  
  const handleInputChange = (e) => {
    setEditedComment({
      ...editedComment,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSave = async () => {
    if (!editedComment.content) {
      alert("Content cannot be empty");
      return;
    }
    try {
      await updateComment(comment.id, editedComment);
      setIsEditing(false); 
    } catch (error) {
      console.error("Error updating comment", error);
    }
  };


  const getLikesCount = () => {
    if (Array.isArray(comment.likedBy)) {
      return comment.likedBy.length;
    } else if (typeof comment.likedBy === 'object') {
      return Object.keys(comment.likedBy).length;
    }
    return 0;
  };

  return (
    <div className="comment">
      {isEditing ? (
        <div className="edit-form">
          <textarea
            name="content"
            value={editedComment.content}
            onChange={handleInputChange}
            className="edit-content"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-author">Author: {comment.author}</p>
          <p className="comment-date">Created on: {formatDate(comment.createdOn)}</p>
          <p className="comment-likes">Likes: {getLikesCount()}</p>
          <LikeButton obj={comment} typeProp='comment' /> 
        </>
      )}

      {userData && userData.username === comment.author && (
        <button className='btn' onClick={() => setIsEditing(true)}>Edit</button>
      )}

      {userData &&
        (userData.username === comment.author || userData.isAdmin) && (
          <button className='btn delete-btn' onClick={() => deleteComment(comment.id)}>Delete</button>
        )}
    </div>
  );
}

