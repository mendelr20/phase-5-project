import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, Input, Label, Error } from "../styles";
import { UserContext } from "./App";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { user, setPosts, posts, categories,  } =
    useContext(UserContext);

  const post =
    posts.length > 0
      ? posts.find((post) => post.id === parseInt(postId))
      : null;
  const [title, setTitle] = useState(post ? post.title : "");
  const [body, setBody] = useState(post ? post.body : "");

  const [errors, setErrors] = useState([]);
  const [postCategories, setPostCategories] = useState(
    post ? post.categories.map((category) => category.id) : []
  );

  const handleCategoryChange = (categoryId, checked) => {
    setPostCategories((postCategories) => {
      if (checked) {
        return [...postCategories, categoryId];
      } else {
        return postCategories.filter((id) => id !== categoryId);
      }
    });
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const id = parseInt(postId);

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const post = {
      title: title,
      body: body,
      user_id: user.id,
      category_ids: postCategories,
    };

    fetch(`/posts/${id}`, {
      method: "PATCH",
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
        }
      })
      .then((editedPost) => {
        setPosts((posts) =>
          posts.map((p) => (p.id === editedPost.post.id ? editedPost.post : p))
        );

        navigate("/myposts");
        console.log(posts);
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
      {posts ? (
        <>
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
            <FieldWrapper>
              <Label htmlFor="categories">Categories</Label>
              {categories.length
                ? categories.map((category) => (
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
                  ))
                : null}
            </FieldWrapper>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
            <ButtonsWrapper>
              <Button type="submit">Submit</Button>
              <ButtonsWrapper>
                <GoBackButton
                  type="button"
                  onClick={() => navigate(`/posts/${id}`)}
                >
                  Go To The Post
                </GoBackButton>
              </ButtonsWrapper>
              <DeleteButtonWrapper>
                <DeleteButton type="button" onClick={handleDeletePost}>
                  Delete Post
                </DeleteButton>
              </DeleteButtonWrapper>
            </ButtonsWrapper>
          </form>
        </>
      ) : (
        <Loading>Loading post...</Loading>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  max-width: 600px;
  margin: 0 auto;
`;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;

  button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
  }
`;

const GoBackButton = styled.button`
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  margin-right: 10px;

  &:hover {
    background-color: #999;
  }
`;

const Loading = styled.p`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  color: #333;
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
