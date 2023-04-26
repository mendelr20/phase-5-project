import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import About from "./About";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import PostsList from "./PostsList";
import MyPostsList from "./MyPostsList";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import "../css/app.css";

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="app-container">
      <NavBar className="navbar" />
      <main className="container">
        <Routes className="routes">
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />

          {user ? (
            <>
              <Route path="/posts" element={<PostsList />} />
              <Route path="/myposts" element={<MyPostsList />} />
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
    </div>
  );
}

export default App;
