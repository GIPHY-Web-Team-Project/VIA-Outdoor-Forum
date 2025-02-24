import { useContext } from "react";
import { AppContext } from "../../store/app.context";
import { like, unlike } from "../../services/like.services";

export default function LikeButton({ obj, typeProp, isLikedByTrue }) {
    const { userData } = useContext(AppContext);

    const toggleLike = async (obj, id, type) => {
        const isLiked = obj.likedBy.includes(userData?.uid);

        try {
            if (isLiked) {
                await unlike(userData.uid, id, type);
            } else {
                await like(userData.uid, id, type);
            }
        } catch (error) {
            console.error(error);
            alert(`Failed to like ${type}!`);

        }
    }

    return (
        <>
            <button className="like-btn" onClick={() => toggleLike(obj, obj.id, typeProp)}>
               {!obj.likedBy ? 'Like' : obj.likedBy.includes(userData?.uid) ? 'Unlike' : 'Like'}
            </button>
        </>
    )
}