import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Button } from "../styles";
import { UserContext } from "./UserContextProvider";
import "../css/about.css";
function AboutPage() {
  const { user, setShowLogin } = useContext(UserContext);
  return (
    <div class="wrapper">
      <div class="box-shadow">
        <h1 class="title">TraumaTalks</h1>
        <div class="content-wrapper">
          <p class="description">
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
          </p>
          {user ? (
            <Button as={Link} to="/posts">
              See All Posts
            </Button>
          ) : (
            <Button as={Link} to="/" onClick={() => setShowLogin(true)}>
              Log in to see all posts
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
