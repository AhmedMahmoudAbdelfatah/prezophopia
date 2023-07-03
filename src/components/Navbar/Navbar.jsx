



/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";
import { UserContext } from "../../features/UserContext";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useContext(UserContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };




    return (
      <>
        <header className={`header ${isMenuOpen ? "open" : ""}`}>
        <div className="container">
        <span className="logo">PREZOPHOPIA</span>
            <div className={`nav-wrapper ${isMenuOpen ? "open" : ""}`}>
            <ul className={`nav-bar ${isMenuOpen ? "open" : ""}`}>
                <li className="section">
                <Link className="link" to={"/"}>
                    Home
                </Link>
                </li>
                <li className="section"><Link className="link" to={"/posts"}>Posts</Link></li>
                {
                    user.accessToken ? (
                        <>
                            <li className="section"><Link className="link" to={`/profile/${user.id}`}>Profile</Link></li>
                            <li className="section"><Link className="link" to={"/stream"}>Stream</Link></li>
                            <li className="section"><Link className="link" to={"/chat"}>Chat</Link></li>
                            <span style={{color: "#3180e7"}}>{user.username}</span>
                            <li className="btn" onClick={logout}><Link className="link"> Logout</Link></li>
                        </>
                    ) 
                    :        
                    <>
                        <li className="btn"><Link className="link" to={"/signin"}>Login</Link></li>
                        <li className="btn"><Link className="link" to={"/register"}>Register</Link></li>
                    </>
                }
            </ul>
            <div className="toggle-menu" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            </div>
        </div>
        </header>
        <Outlet />
      </>
  );
}


