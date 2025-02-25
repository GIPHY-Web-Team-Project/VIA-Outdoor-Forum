import { useContext, useState } from "react";
import { deleteComment, updateComment } from "../../services/comment.services";
import LikeButton from "../LikeButton/LikeButton";
import "./Comment.css";
import { AppContext } from "../../store/app.context";

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
          <p className="comment-date">Created on: {comment.createdOn}</p>
          <p className="comment-likes">
            Likes: {comment.likedBy ? comment.likedBy.length : 0}
          </p>
          <LikeButton obj={comment} typeProp="comment" /> 
        </>
      )}

      {userData && userData.username === comment.author && (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}

      {userData &&
        (userData.username === comment.author || userData.isAdmin) && (
          <button onClick={() => deleteComment(comment.id)}>Delete</button>
        )}
    </div>
  );
}

