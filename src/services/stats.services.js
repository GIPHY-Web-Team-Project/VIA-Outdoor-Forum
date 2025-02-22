import { onValue, ref } from "firebase/database";
import { db } from "../config/firebase-config";

export const subscribeToStats = (callback) => {
    const usersRef = ref(db, 'users');
    const postsRef = ref(db, 'posts');
    const commentsRef = ref(db, 'comments');

    const subscribeUsers = onValue(usersRef, (snapshot) => {
        const users = snapshot.val();
        const totalUsers = users ? Object.keys(users).length : 0;
        callback((prev) => ({ ...prev, totalUsers }));
    });

    const subscribePosts = onValue(postsRef, (snapshot) => {
        const posts = snapshot.val();
        const totalPosts = posts ? Object.keys(posts).length : 0;
        callback((prev) => ({ ...prev, totalPosts }));
    });

    const subscribeComments = onValue(commentsRef, (snapshot) => {
        const comments = snapshot.val();
        const totalComments = comments ? Object.keys(comments).length : 0;
        callback((prev) => ({ ...prev, totalComments }));
    });

    return () => {
        subscribeUsers();
        subscribePosts();
        subscribeComments();
    }
}
