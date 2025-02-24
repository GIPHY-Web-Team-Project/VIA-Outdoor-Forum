import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { AppContext } from "../../store/app.context"
import { useContext, useState } from "react"
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import './Header.css'

export default function Header({ onOptionSelect, selectedOption }) {
    const navigate = useNavigate();
    const location = useLocation();
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
    <header className={location.pathname === '/' ? 'home-header' : ''}>
      <div className="home-button-container">
        <button onClick={() => navigate('/')} id="home-button">
          <img src="../../common/images/home-icon.jpg" />
        </button>
      </div>
      {userData?.isAdmin && location.pathname === '/admin' &&
        <div id="admin-options-list">
          <div className="admin-header">
            <h4 id="admin-intro">Admin</h4>
          </div>
          <div className="admin-nav">
          <button
            className={`admin-select-options ${selectedOption === 'users' ? 'active' : ''}`}
            onClick={() => onOptionSelect('users')}
          >
            Users
          </button>
          <button
            className={`admin-select-options ${selectedOption === 'posts' ? 'active' : ''}`}
            onClick={() => onOptionSelect('posts')}
          >
            Posts
          </button>
          </div>
        </div>
      }
      <div className="button-container">
        {!user && <button id="btn-register" onClick={handleRegister} className="user-control">Register</button>}
        {!user && <button onClick={handleLogin} className="user-control">Login</button>}
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
                  {userData && userData.isAdmin && <li><NavLink to="/admin" onClick={() => setDropdownOpen(false)}>Admin Dashboard</NavLink></li>}
                  <li><button onClick={logout} className="user-control" id="logout-control">Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      {location.pathname === '/' &&
        <div className="welcome-container">
          {userData && <span id="welcome-intro">Welcome, {userData.firstName}!</span>}
        </div>
      }
    </header>
  )
}