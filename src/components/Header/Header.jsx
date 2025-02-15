import { NavLink, useNavigate } from "react-router-dom"
import './Header.css'
export default function Header() {
    const navigate = useNavigate();

    return (
        <header>
            <div className="button-container">
                <button id="btn-register">Register</button>
                <button>Login</button>
            </div>
        </header>
    )
}