import { useContext } from "react";
import "./Post.css";
import { AppContext } from "../../store/app.context";
import { likePost, unlikePost } from "../../services/posts.services";
import { encodeEmail } from "../../utils/emailUtils";

export default function Post({ post }) {

  const { userData } = useContext(AppContext);

  { userData && console.log(encodeEmail(userData?.uid)) };

  const toggleLike = async () => {
    const isLiked = post.likedBy.includes(userData?.uid);

    try {
      if (isLiked) {
        await unlikePost(userData.uid, post.id);
      } else {
        await likePost(userData.uid, post.id);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to like post!');

    }
  }

  return (
    <div className="post">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>
      <p className="post-author">Author: {post.author}</p>
      <p className="post-date">Created on: {post.createdOn}</p>
      <p className="post-likes">Likes: {post.likedBy.length}</p>
      <button className="post-like-btn" onClick={toggleLike}>
        {post.likedBy.includes(userData?.uid) ? 'Unlike' : 'Like'}
      </button>
    </div>
  );
}
