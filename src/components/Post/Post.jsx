import { useContext, useState } from "react";
import LikeButton from "../LikeButton/LikeButton";
import "./Post.css";
import { AppContext } from "../../store/app.context";
import EditPost from "../EditPost/EditPost";
import BackBtn from '../BackBtn/BackBtn';
import { formatDate } from '../../services/date.services';

export default function Post({ post }) {
  const [edit, setEdit] = useState(false);
  const { user, userData } = useContext(AppContext);

  return (
  <>
    <BackBtn />
    <div className="post">
      <div className="post-info">
        {!edit && (
          <>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
          </>
        )}
        {edit && <EditPost postId={post.id} setEdit={setEdit} />}
        <p className="post-author">Author: {post.author}</p>
        <p className="post-date">Created on: {formatDate(post.createdOn)}</p>
        <p className="post-likes">Likes: {post.likedBy.length}</p>
      </div>

      <div className="post-btns">
        {user && userData?.username === post.author && < button className="edit-btn" onClick={() => setEdit(true)}>Edit</button>}
        <LikeButton obj={post} typeProp='post' />
      </div>
    </div >
  </>
  );
}
