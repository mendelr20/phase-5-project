import React, { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { Link } from "react-router-dom";
import Login from "./Login";
import { Button } from "../styles";
import "../css/home.css";
function HomePage() {
  const { showLoginForm, setShowLoginForm, user, posts } =
    useContext(UserContext);

  let featuredPosts = [];

  if (posts && posts.length > 0) {
    featuredPosts = posts
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 6);
  }
  return (
    <div className="wrapper">
      {!user && <h2 className="welcome-message">Welcome to my blog!</h2>}
      {showLoginForm && <Login setShowLoginModal={setShowLoginForm} />}
      {user && posts && posts.length > 0 && featuredPosts.length > 0 && (
        <div className="featured-posts-container">
          <h2 className="featured-title">Featured Posts</h2>
          <div className="featured-posts">
            {featuredPosts.map((post) => (
              <div key={post.id} className="featured-post">
                <h4 className="post-title">{post.title}</h4>
                <div className="post-categories">
                  {post.categories.map((category) => (
                    <span key={category.id} className="post-category">
                      #{category.name}
                    </span>
                  ))}
                </div>
                <Button
                  as={Link}
                  className="see-more-button"
                  to={`/posts/${post.id}`}
                >
                  See More
                </Button>
              </div>
            ))}
          </div>
          <Button as={Link} to="/posts" className="see-all-posts-button">
            See All Posts
          </Button>
        </div>
      )}

      {user && (
        <div className="contact-container">
          <div className="contact-information">
            <h5 className="contact-title">Contact Information</h5>
            <ul className="contact-list">
              <li className="contact-item">
                <a href="https://github.com/mendelr20" className="contact-link">
                  Mendel Rosenblum
                </a>
              </li>
              <li className="contact-item">
                <a href="tel:973-650-4936" className="contact-link">
                  Number: 973-650-4936
                </a>
              </li>
              <li className="contact-item">
                <a href="mailto:rosenblummm@gmail.com" className="contact-link">
                  Email: Rosenblummm@gmail.com
                </a>
              </li>
              <li className="contact-item">
                <a
                  href="https://www.linkedin.com/in/mendel-rosenblum/"
                  className="contact-link"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
