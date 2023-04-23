import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContextProvider";

function Profile() {
  const { user, posts } = useContext(UserContext);
  const { username } = useParams();

  const filteredPosts = posts.filter((post) => post.user.username === username);

  return (
    <Container>
      <ProfilePic src={user.profile_pic_url} alt={user.username} />
      <Username>{user.username}</Username>
      <PostsList>
        {filteredPosts.map((post) => (
          <PostItem key={post.id}>
            <PostLink href={`/posts/${post.id}`}>{post.title}</PostLink>
          </PostItem>
        ))}
      </PostsList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePic = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const Username = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const PostsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const PostItem = styled.li`
  margin-bottom: 16px;
`;

const PostLink = styled.a`
  font-size: 18px;
  color: #333;
  text-decoration: none;
`;

export default Profile;
