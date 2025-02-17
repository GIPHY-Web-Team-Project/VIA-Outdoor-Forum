import React from 'react';
import { ref, uploadBytes, getDownloadURL, getStorage} from 'firebase/storage';
import SingleUser from '../SingleUser/SingleUser';
import { useParams, useNavigate, useLocation} from 'react-router-dom';
import { getUserData, updateUserData } from '../../services/users.service';
import { useEffect, useState } from 'react';
import './EditUser.css';

export const EditUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { uid } = useParams();
    const [file, setFile] = useState(null);
    const storage = getStorage();
    
    const [user, setUser] = useState({
        user: { uid },
        userData: location.state?.userData || null,
    });


    const handleAvatarChange = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

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

    const handleUpdate = () => {
        if (file) {
            const storageRef = ref(storage, `profilePictures/${uid}`);
            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    updateUserData(uid, { ...user.userData, profilePicture: downloadURL })
                        .then(() => {
                            console.log('User updated successfully');
                            navigate(`/users/${uid}`);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });
            });
        } else {
            updateUserData(uid, user.userData)
                .then(() => {
                    console.log('User updated successfully');
                    navigate(`/users/${uid}`);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

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
        <div>
            <h1>Update profile:</h1>
            <div id="edit-user-details-container">
                {user.userData && (
                    <div>
                        <div id="profile-picture-edit">
                            <h3>Profile Picture: </h3>
                            <img src={user.userData.profilePicture} alt="Avatar" />
                            <input type="file" onChange={handleAvatarChange}/>
                        </div>
                        <div id="user-details-edit">
                            <div className="row">
                                <h3>Username: </h3>
                                <input 
                                    type="text" 
                                    name="username"
                                    value={user.userData.username} 
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="row">
                                <h3>Email: </h3>
                                <label>{user.userData.email}</label>
                            </div>
                            <div className="row">
                                <h3>First name: </h3>
                                <input 
                                    type="text" 
                                    name="firstName"
                                    value={user.userData.firstName} 
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="row">
                                <h3>Last name: </h3>
                                <input 
                                    type="text" 
                                    name="lastName"
                                    value={user.userData.lastName} 
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={ handleUpdate }>Save</button>
            <button onClick={() => navigate(-1)}>Cancel</button>

        </div>
    );
}

export default EditUser;