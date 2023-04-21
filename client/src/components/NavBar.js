import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import { UserContext } from "./App";

function NavBar() {
  const { user, setUser, setShowLoginForm } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate('/')
      }
    });
  }

  function handleLoginClick() {
    if (location.pathname === "/about") {
      setShowLoginForm(true);
    } else {
      setShowLoginForm((prevState) => !prevState);
    }
    navigate("/");
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">TraumaTalks</Link>
      </Logo>
      {user ? (
        <Profile>
          <img src={user.profile_pic_url} alt={user.username} />
          <p>
            {user.first_name} {user.last_name}
          </p>
        </Profile>
      ) : null}
      <Nav>
        <Button as={Link} to="/">
          Home
        </Button>
        <Button as={Link} to="/about">
          About
        </Button>
        {user ? (
          <>
            <Button as={Link} to="/posts">
              Posts
            </Button>
            <Button as={Link} to="/myposts">
              My Posts
            </Button>
            <Button as={Link} to="/posts/new">
              New Post
            </Button>
            <Button onClick={handleLogoutClick}>Logout {user.username}</Button>
          </>
        ) : (
          <Button variant="outline" onClick={handleLoginClick}>
            Login
          </Button>
        )}
      </Nav>
    </Wrapper>
  );
}
const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: #663399;
  margin: 0;
  line-height: 1;
  flex-grow: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  margin-top: 16px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
  }

  p {
    font-size: 1rem;
    font-weight: bold;
  }
`;

export default NavBar;
