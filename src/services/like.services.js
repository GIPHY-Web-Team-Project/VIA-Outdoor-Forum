import { ref, update } from "firebase/database";
import { db } from "../config/firebase-config";


export const like = async (handle, id, type) => {
    let updatedObj;
    if (type === 'post') {
        updatedObj = {
            [`posts/${id}/likedBy/${handle}`]: true,
            [`users/${handle}/likedPosts/${id}`]: true,
        }
    } else if (type === 'comment') {
        updatedObj = {
            [`comments/${id}/likedBy/${handle}`]: true,
            [`users/${handle}/likedComments/${id}`]: true,
        }
    }

    console.log(updatedObj)
    return update(ref(db), updatedObj);
}

export const unlike = async (handle, id, type) => {
    let updatedObj;
    if (type === 'post') {
        updatedObj = {
            [`posts/${id}/likedBy/${handle}`]: null,
            [`users/${handle}/likedPosts/${id}`]: null,
        }
    } else {
        updatedObj = {
            [`comments/${id}/likedBy/${handle}`]: null,
            [`users/${handle}/likedComments/${id}`]: null,
        }
    }


    return update(ref(db), updatedObj);
}