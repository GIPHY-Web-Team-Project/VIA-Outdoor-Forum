import { get, set, ref, query, equalTo, orderByChild, update, remove, onValue } from 'firebase/database';
import { db, auth } from '../config/firebase-config';
import { encodeEmail } from '../utils/emailUtils';
import { deleteUser } from 'firebase/auth';

/**
 * Retrieves a user by their email address.
 *
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the user data if found, or null if not found.
 */
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

/**
 * Updates the user data in the database.
 *
 * @param {string} uid - The unique identifier of the user.
 * @param {Object} updatedData - The data to update for the user.
 * @returns {Promise<void>} A promise that resolves when the user data is updated.
 * @throws {Error} If the user is not found.
 */
export const updateUserData = async (uid, updatedData) => {
  const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
  if (snapshot.exists()) {
    const userKey = Object.keys(snapshot.val())[0];
    await update(ref(db, `users/${userKey}`), updatedData);
  } else {
    throw new Error('User not found');
  }
};

/**
 * Deletes a user account from the database and authentication system.
 *
 * @param {string} uid - The unique identifier of the user to be deleted.
 * @throws {Error} If no user is found with the given uid.
 * @returns {Promise<void>} A promise that resolves when the user account is deleted.
 */
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

/**
 * Retrieves all users from the database and invokes the provided callback with the users data.
 *
 * @param {Function} callback - The callback function to be invoked with the users data.
 * @returns {Promise<Function>} - A promise that resolves to the unsubscribe function to stop listening for changes.
 */
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

/**
 * Sorts an array of user objects based on the specified criteria.
 *
 * @param {Array} users - The array of user objects to be sorted.
 * @param {string} sortBy - The criteria to sort the users by. 
 *                          Can be 'newest', 'oldest', or 'name'.
 * @returns {Array} The sorted array of user objects.
 */
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
