import React, { useEffect, useState } from "react";
import { Routes ,Route } from 'react-router-dom';

import About from "./About";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import Posts from "./Posts";
import Post from "./PostPage"
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
            <Route path='/posts/:id' element={<Post/>} />
            <Route path='/' element={<HomePage/>} />
          </Routes>
        </main>
      </>
    </UserContext.Provider>
  );
}

export default App;

// create a my posts page
//create a my comments page
//user page - see info and click on the post
// see categories page which will display all post with that categories
// create a posts page
// crud to my posts 
//crud to my comments
//create categories