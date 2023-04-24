import React, { useEffect, useState } from "react";
import  UserContext from "./UserContext";

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [posts, setPosts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          setShowLoginForm(false);
        });
      }
    });

    fetch("/posts")
      .then((r) => r.json())
      .then((r) => setPosts(r.posts));

    fetch("/categories")
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories);
      });
  }, []);

  const contextValue = {
    user,
    setUser,
    showLoginForm,
    setShowLoginForm,
    posts,
    setPosts,
    categories,
    setCategories,
    showLogin,
    setShowLogin,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}


export { UserContext, UserContextProvider as default };