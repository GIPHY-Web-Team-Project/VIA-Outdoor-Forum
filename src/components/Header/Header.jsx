import { NavLink, useNavigate } from "react-router-dom"
import { AppContext } from "../../store/app.context"
import { useContext, useState } from "react"
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import './Header.css'

export default function Header() {
    const navigate = useNavigate();
    const { user, userData, setAppState } = useContext(AppContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogin = () => {
    navigate('/login');
  }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }
    
    
    const logout = () => {
      signOut(auth)
        .then(() => {
          setAppState({
            user: null,
            userData: null
          });
          navigate('/login');
          setDropdownOpen(false);
        })
        .catch((error) => {
          console.error(error.message);
        })
    }
    

    return (
        <header>
            <div className="button-container">
            {!user && <button id="btn-register" onClick={ handleRegister } className="user-control">Register</button>}
            {!user && <button onClick={ handleLogin } className="user-control">Login</button>}
            {user && (
                    <div className="avatar-container" id="btn-profile">
                        <img
                            src={userData?.profilePicture || "../../common/images/avatar.jpg"}
                            alt="Avatar"
                            className="btn-profile"
                            onClick={toggleDropdown}
                        />
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li><NavLink to={`/users/${user.uid}`} onClick={() => setDropdownOpen(false)}>My profile</NavLink></li>
                                    <li>My posts</li>
                                    <li>Favorites</li>
                                    <li>My comments</li>
                                    <li><button onClick={logout} className="user-control" id="logout-control">Logout</button></li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="welcome-container">
                {userData && <span>Welcome, {userData.firstName}!</span>}
                
            </div>
        </header>
    )
}