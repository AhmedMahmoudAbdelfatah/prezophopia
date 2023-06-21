/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate, Outlet } from "react-router-dom";
import './NavBar.css'
import { useContext } from "react";
import { UserContext } from "../../features/UserContext";

export default function Navbar() {
    
    const { user, logout } = useContext(UserContext);


    return (
        <>
            <header className="header">
                <div className="container">
                <div className="logo">PREZOPHOPIA</div>
                <ul className="nav-bar">
                <li className="section"><Link className="link" to={"/"}>Home</Link></li>
                <li className="section"><Link className="link" to={"/posts"}>Posts</Link></li>
                {
                    !user?.accessToken && (
                        <>
                            <li className="btn"><Link className="link" to={"/signin"}>Login</Link></li>
                            <li className="btn"><Link className="link" to={"/register"}>Register</Link></li>
                        </>)
                }
                {
                    user?.accessToken && (
                        <>
                            <li className="section"><Link className="link" to={"/profile"}>Profile</Link></li>    
                            <li className="section"><Link className="link" to={"/stream"}>Stream</Link></li>    
                            <li className="btn" onClick={logout}>Log out</li>
                        </>
                )}
                </ul>
                </div>
            </header>
            <Outlet />
        </>
    )
}
