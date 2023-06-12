/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import useLocalStorage from "../../customHooks/useLocalStorage"
import './NavBar.css'

export default function Navbar() {
    
    const [user, setUser] = useLocalStorage("user", "");
    const logOut = () => {
        setUser("");
        localStorage.removeItem("imgUrl");
    }

    return (
        <header className="header">
            <div className="container">
            <div className="logo">PREZOPHOPIA</div>
            <ul className="nav-bar">
            <li className="section"><Link className="link" to={"/"}>Home</Link></li>
            <li className="section"><Link className="link" to={"/posts"}>Posts</Link></li>
            {
                !user && (
                    <>
                        <li className="btn"><Link className="link" to={"/signin"}>Login</Link></li>
                        <li className="btn"><Link className="link" to={"/register"}>Register</Link></li>
                    </>)
            }
            {
                user && (
                    <>
                        <li className="section"><Link className="link" to={"/profile"}>Profile</Link></li>    
                        <li className="btn" onClick={logOut}>Log out</li>
                    </>
            )}
            </ul>
            </div>
        </header>
    )
}
