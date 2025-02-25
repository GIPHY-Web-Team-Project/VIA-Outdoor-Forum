import { get, set, ref, query, equalTo, orderByChild, update, remove, onValue } from 'firebase/database';
import { db, auth } from '../config/firebase-config';
import { encodeEmail } from '../utils/emailUtils';
import { deleteUser } from 'firebase/auth';

export const getUserByEmail = async (email) => {
  const encodedEmail = encodeEmail(email);
  const snapshot = await get(ref(db, `users/${encodedEmail}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
};

export const createUserHandle = async (email, uid, username, firstName, lastName) => {

  const user = {
    email,
    uid,
    username,
    firstName,
    lastName,
    isAdmin: false,
    createdOn: new Date().toString(),
    profilePicture: '',
    isBlocked: false,
    telephoneNumber: '',
  };

  await set(ref(db, `users/${uid}`), user);
};

export const getUserData = async (uid) => {
  const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
  if (snapshot.exists()) {
    return snapshot.val();
  }
};

export const updateUserData = async (uid, updatedData) => {
  const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
  if (snapshot.exists()) {
    const userKey = Object.keys(snapshot.val())[0];
    await update(ref(db, `users/${userKey}`), updatedData);
  } else {
    throw new Error('User not found');
  }
};

export const deleteUserAccount = async (uid) => {
  const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
  if (snapshot.exists()) {
    const userKey = Object.keys(snapshot.val())[0];
    const userRef = ref(db, `users/${userKey}`);
    await remove(userRef);

    const user = auth.currentUser;
    if (user && user.uid === uid) {
      await deleteUser(user);
    }
  } else {
    throw new Error('No user found.');
  }
};

export const getAllUsers = async (callback) => {
  const usersRef = await ref(db, 'users');
  const unsubscribe = await onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
          const users = Object.values(snapshot.val());
          return callback(users);
      } else {
          return callback([]);
      }
  });
  return unsubscribe;
};

export const sortUsers = (users, sortBy) => {
  const sortedUsers = [...users];

  switch (sortBy) {
      case 'newest':
          return sortedUsers.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
      case 'oldest':
          return sortedUsers.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
      case 'name':
          return sortedUsers.sort((a, b) => a.username.localeCompare(b.username));
  }
}
