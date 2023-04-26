import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import { Error, Button } from "../styles";
import styled from "styled-components";

function PostPage() {
  const { id } = useParams();
  const { user, posts, setPosts } = useContext(UserContext);
  const navigate = useNavigate();

  const post = posts.find((post) => post.id === parseInt(id));

  const [comments, setComments] = useState(post.comments);

  const [errors, setErrors] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [newComment, setNewComment] = useState();
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    navigate(`/posts/${post.id}/edit`);
  };
  const handleNewClick = () => {
    setShowCommentForm(true)
    setEditMode(false);
    setNewComment('')
  }

  function handleCommentEdit(comment) {
    setShowCommentForm(false)
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
      } else {
        r.json().then((err) => setErrors(err.errors));
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

      {post.categories.length > 0 ? (
        <CategoryList>
          Categories:{" "}
          {post.categories.map((category) => (
            <Category key={category.id}>#{category.name} </Category>
          ))}
        </CategoryList>
      ) : (
        <p>
          This post has not been associated with any categories yet.
          {post.user.id === user.id && (
            <p>
              Click the edit button down below to add categories to this post
            </p>
          )}
        </p>
      )}

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
                    src={comment.user.profile_pic_url}
                    alt={post.user.username}
                  />
                  <CommentAuthor>
                    {comment.user.first_name} {comment.user.last_name} (@
                    {comment.user.username})
                  </CommentAuthor>
                  {user && user.id === comment.user.id && (
                    <CommentActions>
                      <Button onClick={() => handleCommentEdit(comment)}>
                        Edit
                      </Button>
                      <Button onClick={() => deleteComment(comment.id)}>
                        Delete
                      </Button>
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
            <Button type="submit">Update The Comment</Button>
          </CommentForm>
        )}
        {post.user.id === user.id && (
          <Button onClick={handleEditClick}>Edit This Post</Button>
        )}

        {!showCommentForm && (
          <ButtonBorder>
            <Button onClick={handleNewClick}>
              Write a comment
            </Button>
          </ButtonBorder>
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
            <Button type="submit">Post</Button>
          </CommentForm>
        )}
      </CommentsContainer>
    </Container>
  );
}

const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: #000;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const ButtonBorder = styled.div`
  margin-top: 20px;
`;

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
  color: #333;
`;

const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  margin-right: 10px;
  align-items: center;
  text-align: center;
  color: #333;
`;

const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
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
  overflow: auto;
`;

const Content = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
  color: #333;
  text-align: justify;
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
  padding: 5px;
`;

const Username = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  padding: 5px;
`;

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin-top: 0.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const Category = styled.li`
  background-color: tan;
  color: #fff;
  padding: 10px 15px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  font-size: 14px;
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

export default PostPage;
