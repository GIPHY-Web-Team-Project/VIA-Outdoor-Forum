import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserData } from '../../services/users.service';
import './SingleUser.css';

export const SingleUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        user: null,
        userData: null,
    });
    const { uid } = useParams();


    const handleEditUser = () => {
        navigate(`/users/${uid}/edit`, { state: { userData: user.userData } });
    };

    useEffect(() => {
        if (!uid) return;

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
    }, [uid]);


    return (
        <div>
            <div id="user-details-container">
                <h1>Profile Details</h1>
                {user.userData && (
                    <div>
                        <div id="profile-picture">
                            <img src={user.userData.profilePicture} alt="Avatar" />
                        </div>
                        <div id="user-details">
                            <h3>Username: {user.userData.username}</h3>
                            <h3>Email: {user.userData.email}</h3>
                            <h3>First name:  {user.userData.firstName}</h3>
                            <h3>Last name: {user.userData.lastName}</h3>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={ handleEditUser }>Edit</button>
        </div>
    );
}

export default SingleUser;