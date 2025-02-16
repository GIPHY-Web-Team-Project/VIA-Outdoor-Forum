import { NavLink, useNavigate } from "react-router-dom"
import './Header.css'
export default function Header() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <header>
            <div className="button-container">
                <button id="btn-register" onClick={ handleRegister }>Register</button>
                <button>Login</button>
            </div>
        </header>
    )
}