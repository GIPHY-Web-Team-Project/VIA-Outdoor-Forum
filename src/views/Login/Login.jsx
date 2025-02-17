import { AppContext } from "../../store/app.context"
import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import './Login.css';

export default function Login() {

  const { setAppState } = useContext(AppContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const login = () => {

    if(!user.email || !user.password) {
      return alert('Please enter email and password');
    }

    signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      setAppState({
        user: userCredential.user,
        userData: null,
      });


      navigate(location.state?.from.pathname ?? '/');
    })
    .catch((error) => {
      console.error(error.message);
    });
  }

const updateUser = (prop) => (e) => {
  setUser({
    ...user,
    [prop]: e.target.value,
  });
}

  return (
    <div id="login-form-id">
      <h3>Login</h3>
      <div>
        <label htmlFor="email">Email: </label>
        <input value={user.email} onChange={updateUser('email')} type="text" name="email" id="email" />
        <br /><br />
        <label htmlFor="password">Password: </label>
        <input value={user.password} onChange={updateUser('password')} type="password" name="password" id="password" />
        <button onClick={login} id="btn-login-form">Login</button>
      </div>
    </div>
  )
}