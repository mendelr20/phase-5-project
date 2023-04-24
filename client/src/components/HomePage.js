import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContextProvider";
import { Link } from "react-router-dom";
import Login from "./Login";
import { Button } from "../styles";

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
    <Wrapper>
      {!user && <WelcomeMessage>Welcome to my blog!</WelcomeMessage>}
      {showLoginForm && <Login setShowLoginModal={setShowLoginForm} />}
      {user && posts && posts.length > 0 && featuredPosts.length > 0 && (
        <>
          <FeaturedPostsContainer>
            <FeaturedPosts>
              {featuredPosts.map((post) => (
                <Post key={post.id}>
                  <h4>{post.title}</h4>
                  <p></p>
                    {post.categories.map((category) => (
                      <h5 key={category.id}>#{category.name}</h5>
                    ))}
                
                  <Button
                    as={Link}
                    className="see-more"
                    to={`/posts/${post.id}`}
                  >
                    See More
                  </Button>
                </Post>
              ))}
            </FeaturedPosts>
            <SeeAllPostsButton as={Link} to="/posts">
              See All Posts
            </SeeAllPostsButton>
          </FeaturedPostsContainer>
        </>
      )}

      {user && (
        <ContactContainer>
          <ContactInformation>
            <h5>Contact Information</h5>
            <ul>
              <li>
                <a href="https://github.com/mendelr20">Mendel Rosenblum</a>
              </li>
              <li>
                <a href="tel:973-650-4936">Number: 973-650-4936</a>
              </li>
              <li>
                <a href="mailto:rosenblummm@gmail.com">
                  Email: Rosenblummm@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mendel-rosenblum/">
                  LinkedIn
                </a>
              </li>
            </ul>
          </ContactInformation>
        </ContactContainer>
      )}
    </Wrapper>
  );
}

const FeaturedPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const Post = styled.article`
  margin-right: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  margin: 0 8px 16px 8px;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  &:hover {
    transform: translateY(-4px);
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  h2 {
    font-size: 36px;
    margin-bottom: 8px;
    text-align: center;
    color: #663399;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  p {
    margin-bottom: 16px;
    font-size: 20px;
    text-align: center;
    color: #666;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .link {
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 4px 8px;
    background-color: #f2f2f2;
    border-radius: 4px;
    color: #333;
    font-size: 14px;
    max-width: 100%;
    overflow-wrap: break-word;
  }
  

  
  .see-more {
    align-self: center;
    margin-top: 16px;
    background-color: #663399;
    color: white;
    &:hover {
      background-color: #512b8b;
    }
  }



  h5 {
    display: flex;
    margin-right: 8px;
    padding: 4px 8px;
    background-color: #f2f2f2;
    border-radius: 4px;
    color: #333;
    font-size: 14px;
    max-width: 100%;
    overflow-wrap: break-word;
  }
`;

const FeaturedPosts = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  transform: translate3d(0, 0, 0);
  transition: transform 0.25s ease-out;
  &:hover {
    transform: translate3d(0, -5px, 0);
  }
`;


const SeeAllPostsButton = styled(Button)`
  margin-top: 48px;
  background-color: #663399;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 16px 32px;

  &:hover {
    background-color: #512b8b;
  }
`;

const Wrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContactContainer = styled.div`
  margin-top: 48px;
  padding: 24px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const WelcomeMessage = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 48px;
`;

const ContactInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h5 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 18px;
      text-align: center;
      line-height: 1.6;
      margin-bottom: 8px;

      a {
        color: #663399;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
};`;

export default HomePage;
