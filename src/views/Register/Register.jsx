import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../store/app.context';
import { createUserHandle, getUserByEmail } from '../../services/users.service';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { nameCheck } from '../../utils/nameUtils';
import './Register.css';

export default function Register () {
    const { setAppState } = useContext(AppContext);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    });
    
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
            const username = user.username || `user_${userCredential.user.uid}`;
            return createUserHandle(user.email, userCredential.user.uid, username, user.firstName, user.lastName)
        .then(() => {
            setAppState({
            user: userCredential.user,
            userData: null,
            });
            alert('Registration successful!');
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
    
    return (
        <div id="register-form-id">
        <h3>Register</h3>
        <div>
            <label htmlFor="firstName">First name: </label>
            <input value={user.firstName} onChange={updateUser('firstName')} type="text" name="firstName" id="firstName" />
            <br /><br />
            <label htmlFor="lastName">Last name: </label>
            <input value={user.lastName} onChange={updateUser('lastName')} type="text" name="lastName" id="lastName" />
            <br /><br />
            <label htmlFor="username">Username: </label>
            <input value={user.username} onChange={updateUser('username')} type="text" name="username" id="username" placeholder='optional'/>
            <br /><br />
            <label htmlFor="email">Email: </label>
            <input value={user.email} onChange={updateUser('email')} type="text" name="email" id="email"/>
            <br /><br />
            <label htmlFor="password">Password: </label>
            <input value={user.password} onChange={updateUser('password')} type="password" name="password" id="password" />
            <br /><br />
            <button onClick={register} id="btn-register-form">Register</button>
        </div>
        </div>
    );
}