import { get, orderByChild, push, query, ref, remove, update, equalTo } from "firebase/database";
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

export const updatePost = async (id, title, content) => {
    await update(ref(db, `posts/${id}`), { title, content });
}

export const getAuthorPosts = async (author) => {
    if (!author) {
        throw new Error("Author is undefined");
    }

    const snapshot = await get(query(ref(db, 'posts'), orderByChild('author'), equalTo(author)));

    if (!snapshot.exists()) {
        return [];
    }

    return Object.values(snapshot.val());
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
    const sortedPosts = [...posts];

    switch (sortBy) {
        case 'recent':
            return sortedPosts.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
        case 'oldest':
            return sortedPosts.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
        case 'likes':
            return sortedPosts.sort((a, b) => Object.keys(b.likedBy || {}).length - Object.keys(a.likedBy || {}).length);
        case 'author':
            return sortedPosts.sort((a, b) => a.author.localeCompare(b.author));
        case 'comments':
            console.log(sortedPosts.sort((a, b) => Object.keys(b.comments || {}).length - Object.keys(a.comments || {}).length));
            return sortedPosts.sort((a, b) => Object.keys(b.comments || {}).length - Object.keys(a.comments || {}).length);
    }
}

export const filterPosts = (posts, filterBy) => {
    const filteredPosts = [...posts];

    switch (filterBy) {
        case 'likes':
            return filteredPosts.filter(post => Object.keys(post.likedBy || {}).length > 0);
        case 'Recent (Last week)':
            return filteredPosts.filter(post => new Date(post.createdOn) > new Date(new Date().setDate(new Date().getDate() - 7)));
    }
}

export const deletePost = async (postId) => {
    await remove(ref(db, `posts/${postId}`));
}