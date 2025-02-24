import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../store/app.context';
import { createUserHandle, getUserByEmail } from '../../services/users.service';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { nameCheck } from '../../utils/nameUtils';
import Modal from '../../components/Modal/Modal';
import './Register.css';

export default function Register () {
    const { setAppState } = useContext(AppContext);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        isAdmin: false,
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();
    
    const register = () => {
        if (!user.email || !user.password) {
        return alert('Please enter email and password');
        }
    
        console.log('Registering user: ', user.email);
        getUserByEmail(user.email)
        .then(userFromDB => {
            if(userFromDB) {
                throw new Error(`User with email ${user.email} already exists`);
            }
    
            if (!nameCheck(user.firstName) || !nameCheck(user.lastName)) {
                throw new Error('First and last names must be between 4 and 32 characters and contain only letters');
            }
            return createUserWithEmailAndPassword(auth, user.email, user.password);
        })
        .then(userCredential => {
            const username = user.username || user.email.split('@')[0];
            return createUserHandle(user.email, userCredential.user.uid, username, user.firstName, user.lastName)
        .then(() => {
            signOut(auth);
            setModalMessage('Registration successful! Please log in.');
            setShowModal(true);
            })
        })
        .catch(error => {
            alert(error.message);
        });
    }
    
    const updateUser = (prop) => (e) => {
        setUser({
        ...user,
        [prop]: e.target.value,
        });
    }
    
    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login');
    }

    return (
        <div id="register-form-id">
        <h3 id="register-text">Register</h3>
        <div>
            <label className="register-label-form" htmlFor="firstName">First name: </label>
            <input className="register-input-form" value={user.firstName} onChange={updateUser('firstName')} type="text" name="firstName" id="firstName" />
            <br /><br />
            <label className="register-label-form" htmlFor="lastName">Last name: </label>
            <input className="register-input-form" value={user.lastName} onChange={updateUser('lastName')} type="text" name="lastName" id="lastName" />
            <br /><br />
            <label className="register-label-form" htmlFor="username">Username: </label>
            <input className="register-input-form" value={user.username} onChange={updateUser('username')} type="text" name="username" id="username"/>
            <br /><br />
            <label className="register-label-form" htmlFor="email">Email: </label>
            <input className="register-input-form" value={user.email} onChange={updateUser('email')} type="email" name="email" id="email"/>
            <br /><br />
            <label className="register-label-form" htmlFor="password">Password: </label>
            <input className="register-input-form" value={user.password} onChange={updateUser('password')} type="password" name="password" id="password" />
            <br /><br />
            <button onClick={register} id="btn-register-form">Register</button>
        </div>
        <Modal show={showModal} handleClose={handleCloseModal} message={modalMessage} />
        </div>
    );
}