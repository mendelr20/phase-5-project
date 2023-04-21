import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, Input, Label, Error } from "../styles";
import { UserContext } from "./App";

const NewPost = () => {
  const navigate = useNavigate();
  const { user, setPosts, posts, categories } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);

  const [postCategories, setPostCategories] = useState([]);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };
 const handleCategoryChange = (categoryId, checked) => {
    setPostCategories((postCategories) => {
      if (checked) {
        return [...postCategories, categoryId];
      } else {
        return postCategories.filter((id) => id !== categoryId);
      }
    });
  };
  const handlePostSubmit = (e) => {
    e.preventDefault();

    const post = {
      title: title,
      body: body,
      user_id: user.id,
      category_ids: postCategories,
    };

    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: post }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((err) => setErrors(err.errors));
          throw new Error('Network response was not ok.');
        }
      })
      .then(post => {
        setTitle("");
        setBody("");
        posts.push(post.post);
        navigate('/myposts');
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
    
    
  };

  return (
    <Wrapper>
      <Title>Create A Post</Title>
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
        <FieldWrapper>
              <Label htmlFor="categories">Categories</Label>
              {categories.map((category) => (
                <CheckboxWrapper key={category.id}>
                  <input
                    type="checkbox"
                    id={category.id}
                    name="categories"
                    value={category.id}
                    checked={postCategories.includes(category.id)}
                    onChange={(e) => {
                      const categoryId = parseInt(e.target.value);
                      const checked = e.target.checked;
                      handleCategoryChange(categoryId, checked);
                    }}
                  />
                  <label htmlFor={category.id}>{category.name}</label>
                </CheckboxWrapper>
              ))}
            </FieldWrapper>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Wrapper>
  );
};

const CheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;

  label {
    display: block;
    margin-right: 16px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
  }

  input[type="checkbox"] {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;
const Wrapper = styled(Box)`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const FieldWrapper = styled(Box)`
  margin-bottom: 1rem;
`;

export default NewPost;
