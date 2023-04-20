import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./App";
import Login from "./Login";

function HomePage() {
  const { showLoginForm, setShowLoginForm } = useContext(UserContext);

  return (
    <Wrapper>
      {showLoginForm && <Login setShowLoginModal={setShowLoginForm} />}
      <ContactInformation>
        <h5>
          <a href="https://github.com/mendelr20">Mendel Rosenblum</a>
          <br />
          <br />
          <a href="tel:973-650-4936">Number: 973-650-4936</a>
          <br />
          <br />
          <a href="mailto:rosenblummm@gmail.com">
            Email: Rosenblummm@gmail.com
          </a>
        </h5>
      </ContactInformation>
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

const ContactInformation = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h5 {
    font-size: 18px;
    text-align: center;
    line-height: 1.6;

    a {
      color: #663399;
      text-decoration: none;
      margin-bottom: 8px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default HomePage;
