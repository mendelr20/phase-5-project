import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, Input, Label, Error } from "../styles";
import { UserContext } from "./UserContextProvider";

const NewPost = () => {
  const navigate = useNavigate();
  const { user, posts } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const post = {
      title: title,
      body: body,
      user_id: user.id,
    };

    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: post }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((err) => setErrors(err.errors));
          throw new Error("Network response was not ok.");
        }
      })
      .then((post) => {
        setTitle("");
        setBody("");
        posts.push(post.post);
        navigate("/myposts");
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  };

  return (
    <BigWrapper>
      <Title>Create A Post</Title>
      <Wrapper>
        <form onSubmit={handlePostSubmit}>
          <FieldWrapper>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Please enter the title for your post"
              name="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="body">Body</Label>
            <Input
              as="textarea"
              id="body"
              name="body"
              placeholder="Please enter the body for your post"
              value={body}
              onChange={handleBodyChange}
              required
            />
          </FieldWrapper>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Wrapper>
    </BigWrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin-top: 2rem;
  
  border-radius: 8px;
  padding: 1rem;
`;

const BigWrapper = styled(Wrapper)`
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin: 2rem 0;
`;

const FieldWrapper = styled(Box)`
  margin-bottom: 2rem;
`;



export default NewPost;
