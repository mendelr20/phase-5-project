import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import About from "./About";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import Posts from "./Posts";
import MyPosts from "./MyPosts";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";

function App() {
  const { user } = useContext(UserContext);

  return (
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
  );
}

export default App;
