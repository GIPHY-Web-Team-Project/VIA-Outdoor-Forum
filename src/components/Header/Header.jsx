import { NavLink, useNavigate } from "react-router-dom"
import { AppContext } from "../../store/app.context"
import { useContext } from "react"
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import './Header.css'
import { useReducer } from "react";

export default function Header() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogin = () => {
    navigate('/login');
  }

  const { user, userData, setAppState } = useContext(AppContext);

  const logout = () => {
    signOut(auth)
      .then(() => {
        setAppState({
          user: null,
          userData: null
        });
        navigate('/login');
      })
      .catch((error) => {
        console.error(error.message);
      })
  }


  return (
    <header>
      <div className="button-container">
        {!user && <button id="btn-register" onClick={handleRegister}>Register</button>}
        {!user && <button id="btn-login" onClick={handleLogin}>Login</button>}
        {user && <button onClick={logout} id="btn-logout">Logout</button>}
        {user && <NavLink to={`/users/${user.uid}`} id="btn-profile">Profile</NavLink>}
      </div>
      <div className="welcome-container">
        {userData && <span>Welcome, {userData.firstName}!</span>}

      </div>
    </header>
  )
}