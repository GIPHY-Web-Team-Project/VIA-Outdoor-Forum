import { useEffect } from "react";
import Post from "../../components/Post/Post";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <div>
      <h3>Home</h3>
      <Post />
    </div>
  );
}
