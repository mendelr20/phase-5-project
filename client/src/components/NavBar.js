import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import "../css/navbar.css";

function NavBar() {
  const { user, setUser, setShowLoginForm } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        setShowLoginForm(true);
        navigate("/");
      }
    });
  }

  function handleLoginClick() {
    setShowLoginForm(true);
    navigate("/");
  }

  return (
    <header className="navbar">
      <h1 className="logo">
        <Link to="/">TraumaTalks</Link>
      </h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {user && (
          <>
            <Link to="/posts">Posts</Link>
            <Link to="/myposts">My Posts</Link>
            <Link to="/posts/new">New Post</Link>
            <div className="profile">
              <button onClick={handleLogoutClick}>
                Logout {user.username}
              </button>
              <img src={user.profile_pic_url} alt={user.username} />
            </div>
          </>
        )}
        {!user && (
          <>
            <button onClick={handleLoginClick}>Login</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
