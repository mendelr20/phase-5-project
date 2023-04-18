import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "./App";
import styled from "styled-components";

function PostPage() {
  const { id } = useParams();
  const { user, posts } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userComments, setUserComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editingComment, setEditingComment] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);

  // Find the post with the matching id
  const post = posts.find((post) => post.id === parseInt(id));

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newCommentObject = { content: newComment, user: user };
    if (user) {
      if (userComments.some((comment) => comment.content === newComment)) {
        return;
      }
      setUserComments([...userComments, newCommentObject]);
    }
    setComments([...comments, newCommentObject]);
    setNewComment("");
  };

  const handleEditCommentSubmit = (e) => {
    e.preventDefault();
    const editedCommentObject = { content: editingComment, user: user };
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentToEdit.id) {
        return editedCommentObject;
      }
      return comment;
    });
    setComments(updatedComments);
    setEditingComment("");
    setCommentToEdit(null);
  };
  
  return (
    <Container>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <AuthorLink to={`/users/${post.user.id}`}>
        <ProfilePic src={post.user.profile_pic_url} alt={post.user.username} />
        <Username>{post.user.username}</Username>
      </AuthorLink>
      <Categories>
        Categories:{" "}
        {post.categories.map((category) => (
          <CategoryLink key={category.id} to={`/categories/${category.id}`}>
            #{category.name}{" "}
          </CategoryLink>
        ))}
      </Categories>
      <hr />
      <CommentsContainer>
        <CommentsTitle>Comments:</CommentsTitle>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentContainer key={comment.id}>
              <Comment>
                <CommentContent>{comment.content}</CommentContent>
                <CommentMeta>
                  <CommentAuthor>{comment.user.username}</CommentAuthor>
                  {user && user.id === comment.user.id && (
                    <CommentActions>
                    <CommentEditButton onClick={() => setCommentToEdit(comment)}>
                      Edit
                    </CommentEditButton>
                    <CommentDeleteButton>Delete</CommentDeleteButton>
                  </CommentActions>
                  
                  )}
                </CommentMeta>
              </Comment>
            </CommentContainer>
          ))
        ) : (
          <NoComments>No comments yet</NoComments>
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
            <CommentSubmitButton type="submit">Post</CommentSubmitButton>
          </CommentForm>
        )}
      </CommentsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 0;
`;

const Content = styled.p`
  margin: 0;
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

const CommentEditButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;


const AuthorLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Categories = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CategoryLink = styled(Link)`
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  background-color: #f2f2f2;
  border-radius: 4px;

  &:hover {
    text-decoration: none;
    background-color: #ddd;
  }
`;
const CommentsContainer = styled.div`
  width: 80%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentsTitle = styled.h3`
  margin: 0;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const Comment = styled.div`
  width: 100%;
`;
const CommentContent = styled.div`
  margin-bottom: 10px;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
`;

const Username = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const CommentDeleteButton = styled.button`
  margin-left: 10px;
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
`;

const CommentSubmitButton = styled.button`
  align-self: flex-end;
`;

export default PostPage;
