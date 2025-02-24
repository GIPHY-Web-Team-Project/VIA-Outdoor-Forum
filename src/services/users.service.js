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

export const deleteUserAccount = async () => {
  const user = auth.currentUser;
  if (user) {
    const encodedEmail = encodeEmail(user.email);
    const userRef = ref(db, `users/${encodedEmail}`);
    await remove(userRef);
    await deleteUser(user);
  } else {
    throw new Error('No user is currently signed in.');
  }
};

export const getAllUsers = async (callback) => {
  const usersRef = ref(db, 'users');
  const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
          const users = Object.values(snapshot.val());
          return callback(users);
      } else {
          return callback([]);
      }
  });
  return unsubscribe;
};