import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { encodeEmail } from '../utils/emailUtils';

export const getUserByEmail = async (email) => {
  const encodedEmail = encodeEmail(email);
  const snapshot = await get(ref(db, `users/${encodedEmail}`));
  if(snapshot.exists()) {
    return snapshot.val();
  }
};

export const createUserHandle = async (email, uid, username, firstName, lastName) => {
  const encodedEmail = encodeEmail(email);

  const user = {
    email,
    uid,
    username,
    firstName,
    lastName,
    createdOn: new Date().toString(),
    profilePicture: '../common/avatar.jpg',
  };

  await set(ref(db, `users/${encodedEmail}`), user);
};

export const getUserData = async (uid) => {
  const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
  if(snapshot.exists()) {
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
