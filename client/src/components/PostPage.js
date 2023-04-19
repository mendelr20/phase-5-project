import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./App";
import { Error } from "../styles";
import styled from "styled-components";

function PostPage() {
  const { id } = useParams();
  const { user, posts, setPosts } = useContext(UserContext);

  const post = posts.find((post) => post.id === parseInt(id));

  const [comments, setComments] = useState(post.comments);

  const [errors, setErrors] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [newComment, setNewComment] = useState();
  const [editMode, setEditMode] = useState(false);

  function handleCommentEdit(comment) {
    setEditMode(true);
    setCommentToEdit(comment);
    setNewComment(comment.body);
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`/comments/${commentToEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: newComment,
        post_id: post.id,
        user_id: user.id,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setPosts((prevPosts) => {
            const updatedPosts = prevPosts.map((prevPost) => {
              if (prevPost.id === post.id) {
                const updatedComments = prevPost.comments.map((comment) => {
                  if (comment.id === commentToEdit.id) {
                    return data;
                  } else {
                    return comment;
                  }
                });
                return {
                  ...prevPost,
                  comments: updatedComments,
                };
              } else {
                return prevPost;
              }
            });
            return updatedPosts;
          });
                
          
          setEditMode(false);
          setNewComment("");
          setErrors([]);
          console.log(data);
          setComments((prevComments) => {
            const updatedComments = prevComments.filter(
              (comment) => comment.id !== commentToEdit.id
            );
            return [...updatedComments, data];
          });
        });
      }
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    fetch(`/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: newComment,
        post_id: post.id,
        user_id: user.id,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setPosts((prevPosts) => {
            const updatedPosts = prevPosts.map((prevPost) => {
              if (prevPost.id === post.id) {
                return {
                  ...prevPost,
                  comments: [...prevPost.comments, data],
                };
              }
              return prevPost;
            });
            return updatedPosts;
          });
          setShowCommentForm(false);
          setNewComment("");
          setErrors([]);
          setComments([...comments, data]);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  function deleteComment(commentId) {
    fetch(`/comments/${commentId}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setPosts((posts) => {
          const updatedPosts = posts.map((post) => {
            const updatedComments = post.comments.filter(
              (comment) => comment.id !== commentId
            );
            return {
              ...post,
              comments: updatedComments,
            };
          });
          return updatedPosts;
        });
        setEditMode(false);
        setNewComment("");
        setComments((comments) =>
          comments.filter((comment) => comment.id !== commentId)
        );
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Container>
      <Title>{post.title}</Title>
      <Content>{post.body}</Content>

      <ProfilePic src={post.user.profile_pic_url} alt={post.user.username} />
      <Username>{post.user.username}</Username>

      <Categories>
        Categories:{" "}
        {post.categories.map((category) => (
          <Category key={category.id}>#{category.name} </Category>
        ))}
      </Categories>

      <hr />
      <CommentsContainer>
        <CommentsTitle>Comments:</CommentsTitle>
        {post.comments.length > 0 ? (
          comments.map((comment) => (
            <CommentContainer key={comment.id}>
              <Comment>
                <CommentContent>{comment.body}</CommentContent>
                <CommentMeta>
                  <ProfilePic
                    src={post.user.profile_pic_url}
                    alt={post.user.username}
                  />
                  <CommentAuthor>
                    {comment.user.first_name} {comment.user.last_name} (@
                    {comment.user.username})
                  </CommentAuthor>

                  {user && user.id === comment.user.id && (
                    <CommentActions>
                      <CommentEditButton
                        onClick={() => handleCommentEdit(comment)}
                      >
                        Edit
                      </CommentEditButton>
                      <CommentDeleteButton
                        onClick={() => deleteComment(comment.id)}
                      >
                        Delete
                      </CommentDeleteButton>
                    </CommentActions>
                  )}
                </CommentMeta>
              </Comment>
            </CommentContainer>
          ))
        ) : (
          <NoComments>No comments yet</NoComments>
        )}
        {editMode && (
          <CommentForm onSubmit={handleEditSubmit}>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Update a comment"
            />
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
            <CommentSubmitButton type="submit">Update</CommentSubmitButton>
          </CommentForm>
        )}
        {!showCommentForm && (
          <WriteCommentButton onClick={() => setShowCommentForm(true)}>
            Write a comment
          </WriteCommentButton>
        )}
        {showCommentForm && (
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a comment"
            />
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
            <CommentSubmitButton type="submit">Post</CommentSubmitButton>
          </CommentForm>
        )}
      </CommentsContainer>
    </Container>
  );
}

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const CommentContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: #fff;
  align-items: center;
`;

const CommentContent = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  align-items: center;
`;

const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: center;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  margin-right: 10px;
  align-items: center;
  text-align: center;
`;

const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CommentEditButton = styled.button`
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const CommentDeleteButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: #fff;
`;

const Title = styled.h1`
  margin-top: 0;
`;

const Content = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
  color: #333;
  text-align: justify;
`;

const WriteCommentButton = styled.button`
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #27ae60;
  }
`;

const Categories = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Category = styled.p`
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  background-color: #f2f2f2;
  border-radius: 4px;
`;

const CommentsTitle = styled.h3`
  margin: 0;
`;

const Comment = styled.div`
  width: 100%;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const Username = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const NoComments = styled.p`
  font-style: italic;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CommentInput = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  min-height: 80px;
`;

const CommentSubmitButton = styled.button`
  align-self: flex-end;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

export default PostPage;
