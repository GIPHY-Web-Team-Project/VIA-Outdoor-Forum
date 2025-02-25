import { useContext } from "react";
import { AppContext } from "../../store/app.context";
import { like, unlike } from "../../services/like.services";

export default function LikeButton({ obj, typeProp }) {
    const { userData } = useContext(AppContext);

const isLikedByUser = () => {
    if (Array.isArray(obj.likedBy)) {
        return obj.likedBy.includes(userData?.uid);
    } else if (typeof obj.likedBy === 'object') {
        return obj.likedBy && obj.likedBy[userData?.uid];
    }
    return false;
};

const toggleLike = async (id, type) => {
    const isLiked = isLikedByUser();

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
};

    return (
        <>
            <button className="like-btn" onClick={() => toggleLike(obj, obj.id, typeProp)}>
            {isLikedByUser() ? 'Unlike' : 'Like'}
            </button>
        </>
    )
}