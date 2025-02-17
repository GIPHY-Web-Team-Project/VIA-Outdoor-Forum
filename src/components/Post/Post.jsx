import "./Post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <h3 className="post-title">{post.title.slice(0, 5)}...</h3>
      <button className="post-btn">Show More</button>
    </div>
  );
}
