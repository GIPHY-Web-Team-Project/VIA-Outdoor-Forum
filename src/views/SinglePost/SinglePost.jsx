import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase-config";
import Post from "../../components/Post/Post";

export default function SinglePost() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const unsubscribe = onValue(ref(db, `posts/${id}`), (snapshot) => {

            const updatedPost = snapshot.val();
            setPost({
                ...updatedPost,
                likedBy: Object.keys(updatedPost.likedBy ?? {})
            })

        });

        return () => unsubscribe();
    }, [id]);

    return (
        <>
            {post && <Post post={post} />}
            {/* {post && <CommentSection post={post} />} */}
        </>
    )
}