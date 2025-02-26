import { push, ref, update, onValue, remove, query, orderByChild, equalTo, get } from "firebase/database";
import { db } from "../config/firebase-config";

export const uploadComment = async (author, postId, content) => {
    const comment = {
        author,
        postId,
        content,
        createdOn: new Date().toString(),
    }

    const result = await push(ref(db, 'comments'), comment);
    const id = result.key;
    await update(ref(db, `comments/${id}`), { id });
    await update(ref(db, `posts/${postId}/comments/${id}`), {[id] : true });
}

export const getAllComments = async (postId, callback) => {
    const commentsRef = ref(db, 'comments');
    const unsubscribe = onValue(commentsRef, (snapshot) => {
        if (snapshot.exists()) {
            const comments = snapshot.val();
            const filteredComments = Object.values(comments).filter(comment => comment.postId === postId);
            callback(filteredComments);
        } else {
            callback([]);
        }
    });
    return unsubscribe;
}

/**
 * Sorts an array of comments based on the specified criteria.
 *
 * @param {Array} comments - The array of comments to be sorted.
 * @param {string} sortBy - The criteria to sort the comments by. 
 *                          Possible values are 'recent', 'oldest', 'likes', and 'author'.
 * @returns {Array} - The sorted array of comments.
 */
export const sortComments = (comments, sortBy) => {
    switch (sortBy) {
        case 'recent':
            return comments.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
        case 'oldest':
            return comments.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
        case 'likes':
            return comments.sort((a, b) => Object.keys(b.likedBy || {}).length - Object.keys(a.likedBy || {}).length);
        case 'author':
            return comments.sort((a, b) => a.author.localeCompare(b.author));
        default:
            return comments;
    }
}

export const deleteComment = async (id) => {
    await remove(ref(db, `comments/${id}`));
}

export const updateComment = async (id, updatedComment) => {
    await update(ref(db, `comments/${id}`), updatedComment);
}

export const getAuthorComments = async (author) => {
    if (!author) {
        throw new Error("Author is undefined");
    }

    const snapshot = await get(query(ref(db, 'comments'), orderByChild('author'), equalTo(author)));

    if (!snapshot.exists()) {
        return [];
    }

    return Object.values(snapshot.val());
}