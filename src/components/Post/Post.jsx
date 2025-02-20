import LikeButton from "../LikeButton/LikeButton";
import "./Post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>
      <p className="post-author">Author: {post.author}</p>
      <p className="post-date">Created on: {post.createdOn}</p>
      <p className="post-likes">Likes: {post.likedBy.length}</p>
      <LikeButton obj={post} typeProp='post' />
    </div>
  );
}
