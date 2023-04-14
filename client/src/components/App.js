import React, { useEffect, useState } from "react";
import { Routes ,Route } from 'react-router-dom';

import About from "./About";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
// import Login from "./Login";
// import RecipeList from "./RecipeList";
// import HomePage from "./HomePage";
// import NewRecipe from "./NewRecipe";
// import MyReviews from "./MyRecipes";
// import RecipePage from "./RecipePage";

// create a context for the user
export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [posts, setPosts] = useState([]);
  console.log(posts)
  console.log(user)
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    fetch("/posts")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  // if (!user) return <Login onLogin={setUser} />;

  return (
    // wrap the app in the user context provider
    <UserContext.Provider value={{ user, setUser, showLoginForm, setShowLoginForm }}>
      <>
      
        <NavBar />
        <main>
          <Routes>
            {/* <Route path="/new">
              <NewRecipe setRecipes={setRecipes} />
            </Route> */}
            {/* <Route path="/myrecipes">
              <MyReviews recipes={recipes} />
            </Route> */}
            {/* <Route path="/recipes/:id">
              <RecipePage
                setRecipes={setRecipes}
                user={user}
                recipes={recipes}
              />
            </Route> */}
            {/* <Route path="/recipes">
              <RecipeList recipes={recipes} />
            </Route> */}
            <Route path='/about' element={<About/>} />
            <Route path='/' element={<HomePage/>} />
          </Routes>
        </main>
      </>
    </UserContext.Provider>
  );
}

export default App;
