import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContextProvider";

import Login from "./Login";

function HomePage() {
  const { showLoginForm, setShowLoginForm, user, posts } = useContext(UserContext);
  console.log(posts)
  let featuredPosts = [];
  
  if (posts && posts.length > 0) {
    featuredPosts = posts.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, 4);
  } 
  
 
  return (
    <Wrapper>
      {showLoginForm && <Login setShowLoginModal={setShowLoginForm} />}
      {!user && <WelcomeMessage>Welcome to my blog!</WelcomeMessage>}
      {user && posts && posts.length > 0 && featuredPosts.length > 0 && (
        <FeaturedPostsContainer>
          <h3>Featured Posts</h3>
          <FeaturedPostsList>
            {featuredPosts
              .map((post) => (
                <FeaturedPostItem key={post.id}>
                  <h4>{post.title}</h4>
                  {/* <p>{post.comments} comments</p> */}
                </FeaturedPostItem>
              ))}
          </FeaturedPostsList>
        </FeaturedPostsContainer>
      )}
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
              <a href="https://www.linkedin.com/in/mendel-rosenblum/">LinkedIn</a>
            </li>
          </ul>
        </ContactInformation>
      </ContactContainer>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FeaturedPostsContainer = styled.div`
  margin-top: 48px;
  padding: 24px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const FeaturedPostsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeaturedPostItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h4 {
    font-size: 24px;
    margin: 0;
  }

  p {
    font-size: 18px;
    color: #666;
    margin: 0;
  }
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
};`

export default HomePage;
