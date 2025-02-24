import LikeButton from "../LikeButton/LikeButton";
import "./Comment.css";

export default function Comment({ comment }) {
  return (
    <div className="comment">
      <h3 className="comment-title">{comment.title}</h3>
      <p className="comment-content">{comment.content}</p>
      <p className="comment-author">Author: {comment.author}</p>
      <p className="comment-date">Created on: {comment.createdOn}</p>
      <p className="comment-likes">Likes: {comment.likedBy ? comment.likedBy.length : 0}</p>
      <LikeButton obj={comment} typeProp="comment" />
    </div>
  );
}
