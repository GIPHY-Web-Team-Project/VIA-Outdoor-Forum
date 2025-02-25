import LikeButton from "../LikeButton/LikeButton";
import "./Comment.css";

export default function Comment({ comment }) {

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
      <h3 className="comment-title">{comment.title}</h3>
      <p className="comment-content">{comment.content}</p>
      <p className="comment-author">Author: {comment.author}</p>
      <p className="comment-date">Created on: {comment.createdOn}</p>
      <p className="comment-likes">Likes: {getLikesCount()}</p>
      <LikeButton obj={comment} typeProp="comment" isLikedByTrue={comment.likedBy} />
    </div>
  );
}
