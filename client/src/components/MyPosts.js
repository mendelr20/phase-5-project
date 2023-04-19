import React from "react";
import styled from "styled-components";
import { Box } from "../styles";
import MyPostsList from "./MyPostsList";

function MyPosts() {
  return (
    <Wrapper>
      <BoxShadow>
        <Title> My Posts</Title>
        <ContentWrapper>
          <Description>
            <MyPostsList/>
          </Description>
        </ContentWrapper>
      </BoxShadow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #ebebeb;
`;

const BoxShadow = styled(Box)`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin-top: 40px;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #0077c2;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Description = styled.p`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  color: #333;
`;

export default MyPosts;
