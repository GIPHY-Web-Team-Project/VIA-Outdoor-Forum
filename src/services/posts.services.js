import { get, push, ref, update } from "firebase/database";
import { db } from "../config/firebase-config";

export const uploadPost = async (author, title, content) => {
    const post = {
        author,
        title,
        content,
        createdOn: new Date().toString(),
    }

    const result = await push(ref(db, 'posts'), post);
    const id = result.key;
    await update(ref(db, `posts/${id}`), { id });
}

export const getAllPosts = async () => {
    const snapshot = await get(ref(db, 'posts'));

    if (!snapshot.exists()) {
        return [];
    }

    const posts = Object.values(snapshot.val());

    return sortPosts(posts, 'recent');
}

export const sortPosts = (posts, sortBy) => {
    switch (sortBy) {
        case 'recent':
            return posts.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
        case 'oldest':
            return posts.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
        case 'likes':
            return posts.sort((a, b) => Object.keys(b.likedBy || {}).length - Object.keys(a.likedBy || {}).length);
        case 'author':
            return posts;
        case 'comments':
            return posts;
    }
}

