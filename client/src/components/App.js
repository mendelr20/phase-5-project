import React, { useEffect, useState } from "react";
import { Routes ,Route } from 'react-router-dom';

import About from "./About";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import Posts from "./Posts";
import MyPosts from "./MyPosts"
import NewPost from "./NewPost"
import EditPost from "./EditPost";
import PostPage from "./PostPage";
// create a context for the user
export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [posts, setPosts] = useState();
 
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    fetch("/posts")
      .then((r) => r.json())
      .then((r) => setPosts(r.posts));
  }, []);

  // if (!user) return <Login onLogin={setUser} />;

  return (
    // wrap the app in the user context provider
    <UserContext.Provider value={{ user, setUser, showLoginForm, setShowLoginForm, posts, setPosts}}>
      <>
      
        <NavBar />
        <main>
          <Routes>
            <Route path='/about' element={<About/>} />
            <Route path='/posts' element={<Posts/>} />
            <Route path='/myposts' element={<MyPosts/>}/>
            <Route path='/posts/new' element={<NewPost/>}/>
            <Route path='/posts/:id' element={<PostPage/>}/>
            <Route path='/posts/:postId/edit' element={<EditPost/>}/>
            <Route path='/' element={<HomePage/>} />
          </Routes>
        </main>
      </>
    </UserContext.Provider>
  );
}

export default App;

