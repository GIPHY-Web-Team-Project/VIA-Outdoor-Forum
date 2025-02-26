import React from 'react';
import { ref, uploadBytes, getDownloadURL, getStorage} from 'firebase/storage';
import SingleUser from '../SingleUser/SingleUser';
import { useParams, useNavigate, useLocation} from 'react-router-dom';
import { getUserData, updateUserData, deleteUserAccount } from '../../services/users.service';
import { useEffect, useState } from 'react';
import './EditUser.css';

export const EditUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { uid } = useParams();
    const [avatar, setAvatar] = useState(null);

    const [user, setUser] = useState({
        user: { uid },
        userData: location.state?.userData || null,
    });

    /**
     * Handles the change event for an image input.
     * Reads the selected file and sets the avatar state with the base64-encoded image.
     *
     * @param {Event} event - The change event triggered by the file input.
     */
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);  // The base64-encoded image
            };
            reader.readAsDataURL(file);
        }
    };

    /**
     * Handles input change events for form fields.
     *
     * @param {Object} e - The event object.
     * @param {Object} e.target - The target element of the event.
     * @param {string} e.target.name - The name of the input field.
     * @param {string} e.target.value - The value of the input field.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            userData: {
                ...prevState.userData,
                [name]: value,
            },
        }));
    };

    /**
     * Handles the update of user data.
     * If an avatar is provided, it updates the user's profile picture.
     * Then, it calls the updateUserData function with the user ID and updated data.
     * On success, it navigates to the user's page.
     * On failure, it logs the error to the console.
     *
     * @function handleUpdate
     */
    const handleUpdate = () => {
        const updatedData = { ...user.userData };
        if (avatar) {
            updatedData.profilePicture = avatar;
        }
        updateUserData(uid, updatedData)
            .then(() => {
                console.log('User updated successfully');
                navigate(`/users/${uid}`);
            })
            .catch(error => {
                console.log(error);
            });
    };

    /**
     * Handles the deletion of a user account.
     * 
     * This function calls the deleteUserAccount function with the user's UID,
     * logs a success message to the console, and navigates to the register page
     * upon successful deletion. If an error occurs, it logs the error to the console.
     * 
     * @function handleDelete
     * @returns {void}
     */
    const handleDelete = () => {
        deleteUserAccount(user.userData.uid)
            .then(() => {
                console.log('User deleted successfully');
                navigate('/register');
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (!uid || user.userData) return;

        getUserData(uid)
            .then(data => {
                if (data) {
                    const userData = data[Object.keys(data)[0]];
                    setUser({
                        user: { uid },
                        userData,
                    });
                } else {
                    console.log('User not found');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [uid, user.userData]);

    return (
        <div id="edit-user-details-container"> 
            <h1 id="details-edit-form">Update profile:</h1>
            <div id="edit-user-content">
                {user.userData && (
                    <div>
                        <div id="profile-picture-edit">
                            <h5 className="input-label-edit-form">Profile Picture: </h5>
                            {user.userData.profilePicture && <img id="user-avatar-edit" src={user.userData.profilePicture} alt="Avatar" />}
                            <input type="file" onChange={handleImageChange} id="file-selector" accept="image/*"/>
                        </div>
                        <div id="user-details-edit">
                            <div className="row">
                                <h5 className="input-label-edit-form">Username: </h5>
                                <label className="input-edit-form">{user.userData.username}</label>
                            </div>
                            <div className="row">
                                <h5 className="input-label-edit-form">Email: </h5>
                                <input className="input-edit-form" 
                                    type="text" 
                                    name="firstName"
                                    value={user.userData.email} 
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="row">
                                <h5 className="input-label-edit-form">First name: </h5>
                                <input className="input-edit-form" 
                                    type="text" 
                                    name="firstName"
                                    value={user.userData.firstName} 
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="row">
                                <h5 className="input-label-edit-form">Last name: </h5>
                                <input className="input-edit-form" 
                                    type="text" 
                                    name="lastName"
                                    value={user.userData.lastName} 
                                    onChange={handleInputChange}
                                />
                            </div>
                            {user.userData.isAdmin && (
                                    <div className="row">
                                        <h5 className="input-label-edit-form">Telephone number: </h5>
                                        <input className="input-edit-form" 
                                            type="number" 
                                            name="telephoneNumber"
                                            value={user.userData.telephoneNumber} 
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
            </div>
            <div id="button-container-edit">
                <button className="btn-control-edit" onClick={ handleUpdate }>Save</button>
                <button className="btn-control-edit" onClick={() => navigate(-1)}>Cancel</button>
            </div>
            <div id="btn-delete-account">
                <button id="btn-control-delete" onClick={handleDelete}>Delete Account</button>
            </div>
        </div>
    );
}

export default EditUser;