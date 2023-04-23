import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import About from "./About";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import Posts from "./Posts";
import MyPosts from "./MyPosts";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";

function App() {
  const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(!user);
  const [posts, setPosts] = useState();
  const [categories, setCategories] = useState();
  const [showLogin, setShowLogin] = useState(true);
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setShowLoginForm(false)
        });
      }
    });
    fetch("/posts")
      .then((r) => r.json())
      .then((r) => setPosts(r.posts));

    fetch("/categories")
      .then((response) => response.json())
      .then((categories) => {
        // Do something with the categories, such as rendering them in the DOM
        setCategories(categories);
      })

  }, []);
console.log(posts)
  // if (!user) return <Login onLogin={setUser} />;

  return (
    // wrap the app in the user context provider
    <UserContext.Provider
      value={{
        user,
        setUser,
        showLoginForm,
        setShowLoginForm,
        posts,
        setPosts,
        showLogin,
        setShowLogin,
        categories,
        setCategories,
      }}
    >
      <>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />

            {user ? (
              <>
                <Route path="/posts" element={<Posts />} />
                <Route path="/myposts" element={<MyPosts />} />
                <Route path="/posts/new" element={<NewPost />} />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="/posts/:postId/edit" element={<EditPost />} />
              </>
            ) : (
              <Route
                path="*"
                element={
                  <Navigate
                    to="/"
                    replace
                    state={{
                      from: window.location.pathname,
                    }}
                  />
                }
              />
            )}
          </Routes>
        </main>
      </>
    </UserContext.Provider>
  );
}

export default App;
