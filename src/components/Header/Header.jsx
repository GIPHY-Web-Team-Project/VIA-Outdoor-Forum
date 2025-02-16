import { NavLink, useNavigate } from "react-router-dom"
import './Header.css'
export default function Header() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <header>
            <div className="button-container">
                <button id="btn-register" onClick={ handleRegister }>Register</button>
                <button onClick={ handleLogin }>Login</button>
            </div>
        </header>
    )
}