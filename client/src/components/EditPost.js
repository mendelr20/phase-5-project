import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, Input, Label, Error } from "../styles";
import { UserContext } from "./App";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user, setPosts, posts } = useContext(UserContext);
  const post = posts.find((post) => post.id === parseInt(postId));
  const [title, setTitle] = useState(post ? post.title : "");
  const [body, setBody] = useState(post ? post.body : "");
  const [errors, setErrors] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };
  const id = parseInt(postId);
  console.log(id);
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

  const handleDeletePost = (e) => {
    e.preventDefault();
    fetch(`/posts/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          setPosts(posts.filter((post) => post.id !== id));
          setTitle("");
          setBody("");
          navigate("/myposts");
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <Title>Edit The Post</Title>
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
        <ButtonsWrapper>
          <Button type="submit">Submit</Button>
          <DeleteButtonWrapper>
            <DeleteButton type="button" onClick={handleDeletePost}>
              Delete Post
            </DeleteButton>
          </DeleteButtonWrapper>
        </ButtonsWrapper>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  max-width: 600px;
  margin: 0 auto;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteButtonWrapper = styled.form`
  margin-left: 1rem;
`;

const DeleteButton = styled(Button)`
  background-color: #cc0000;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const FieldWrapper = styled(Box)`
  margin-bottom: 1rem;
`;

export default EditPost;
