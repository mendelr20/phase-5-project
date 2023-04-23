import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import  {UserContext}  from "./UserContext";

function AboutPage() {
  const { user, setShowLogin } = useContext(UserContext);
  return (
    <Wrapper>
      <BoxShadow>
        <Title>TraumaTalks</Title>
        <ContentWrapper>
          <Description>
            Welcome to TraumaTalks, a medical blog primarily focused on
            emergency medicine. Our goal is to provide readers with valuable
            information and insights related to trauma care and emergency
            medicine. Our team of experienced medical professionals, including
            doctors, nurses, and emergency responders, is dedicated to sharing
            their knowledge and expertise with our readers. We cover a wide
            range of topics related to emergency medicine, including trauma
            care, critical care, disaster response, and much more. Whether
            you're a medical professional, a student, or someone who simply
            wants to learn more about emergency medicine, TraumaTalks is the
            perfect resource for you. Our blog is updated regularly with new
            articles, case studies, and other resources that will help you stay
            up-to-date on the latest trends and developments in the field. We
            also welcome guest posts from medical professionals and experts in
            related fields. If you have a topic you'd like to write about, or if
            you're interested in contributing to our blog, please don't hesitate
            to contact us. At TraumaTalks, we believe that education and
            knowledge-sharing are critical to improving emergency medicine and
            trauma care. That's why we're committed to providing high-quality,
            informative content that will help our readers become more
            knowledgeable and effective medical professionals. Thank you for
            visiting TraumaTalks, and we hope you enjoy our blog! If you have
            any questions or comments, please feel free to contact us.
          </Description>
          {user ? (
            <Button as={Link} to="/posts">
              See All Posts
            </Button>
          ) : (
            <Button as={Link} to="/" onClick={() => setShowLogin(true)}>
              Log in to see all posts
            </Button>
          )}
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

export default AboutPage;
//test