import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserData } from '../../services/users.service';
import './SingleUser.css';
import BackBtn from '../../components/BackBtn/BackBtn';

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
        <div id="single-user-container">
            <div id="user-details-container">
                <h1 id="details-text-form">Profile Details</h1>
                {user.userData && (
                    <>
                       
                            {user.userData.profilePicture ? (
                                <img className="img-avatar" src={user.userData.profilePicture} alt="Avatar" />
                            ) : (
                                <img className="img-avatar" src="../../common/images/avatar.jpg" alt="Avatar" />
                            )}
                        
                        <div id="user-details">
                            <h3 className="details-label-user">Username: </h3>
                            <label className="details-value-user">{user.userData.username}</label>
                            <h3 className="details-label-user">Email: </h3>
                            <label className="details-value-user">{user.userData.email}</label>
                            <h3 className="details-label-user">First name:  </h3>
                            <label className="details-value-user">{user.userData.firstName}</label>
                            <h3 className="details-label-user">Last name: </h3>
                            <label className="details-value-user">{user.userData.lastName}</label>
                            { user.userData.isAdmin && (
                                <div>
                                <h3 className="details-label-user">Telephone number: </h3>
                                <label className="details-value-user">{user.userData.telephoneNumber}</label>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div id="btn-details-container">
                <BackBtn />
                <button className="btn-details-controler btn" onClick={ handleEditUser }>Edit</button>
            </div>
        </div>
    );
}

export default SingleUser;