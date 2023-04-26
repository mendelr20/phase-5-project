import { useContext } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Button } from "../styles";
import { UserContext } from "./UserContextProvider";
function Login({ onLogin }) {
  const { showLogin, setShowLogin } = useContext(UserContext);

  return (
    <Wrapper>
      <ContentWrapper>
        {showLogin ? (
          <>
            <LoginForm onLogin={onLogin} />
            <Divider />
            <LoginMessage>
              Don't have an account? &nbsp;
              <Button color="secondary" onClick={() => setShowLogin(false)}>
                Sign Up
              </Button>
            </LoginMessage>
          </>
        ) : (
          <>
            <SignUpForm onLogin={onLogin} />
            <Divider />
            <LoginMessage>
              Already have an account? &nbsp;
              <Button  onClick={() => setShowLogin(true)}>
                Log In
              </Button>
            </LoginMessage>
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
}
const LoginMessage = styled.h4`
color: #333;
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
  text-align: center;
  background-color: #fff;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;
