import { useContext } from "react";
import LikeButton from "../LikeButton/LikeButton";
import "./Post.css";
import { AppContext } from "../../store/app.context";

export default function Post({ post }) {

  const { user, userData } = useContext(AppContext);

  console.log(userData)

  return (
    <div className="post">
      <div className="post-info">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.content}</p>
        <p className="post-author">Author: {post.author}</p>
        <p className="post-date">Created on: {post.createdOn}</p>
        <p className="post-likes">Likes: {post.likedBy.length}</p>
      </div>
      <div className="post-btns">
        {user && userData.username === post.author && < button className="edit-btn">Edit</button>}
        <LikeButton obj={post} typeProp='post' />
      </div>
    </div >
  );
}
