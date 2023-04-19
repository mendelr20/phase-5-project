import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "./App";

function PostsList() {
  const { user, posts } = React.useContext(UserContext);

  if (!posts) {
    return <Loading>Loading posts...</Loading>;
  }

  if (posts.length === 0) {
    return <NoPosts>No posts found.</NoPosts>;
  }

  return (
    <Wrapper>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <ProfilePic
            src={post.user.profile_pic_url}
            alt={post.user.username}
          />
          <Username>{post.user.username}</Username>
          <Link to={`/posts/${post.id}`}>
            <Title>{post.title}</Title>
          </Link>
          <CategoryList>
            {post.categories.map((category) => (
              <Category key={category.id}>#{category.name}</Category>
            ))}
          </CategoryList>
          <CreatedAt>
            {new Date(post.created_at).toLocaleDateString()}
          </CreatedAt>
          {user && user.id === post.user.id && (
            <EditLink to={`/posts/${post.id}/edit`}>Edit</EditLink>
          )}
        </PostCard>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin-top: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: #fff;
`;

const Loading = styled.p`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  color: #333;
`;

const PostCard = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: #fff;
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

const NoPosts = styled.p`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  color: #333;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: #0077c2;
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
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CategoryLink = styled(Link)`
  color: #333;
  text-decoration: none;
  border-radius: ;
`;

const CreatedAt = styled.span`
  font-size: 0.8rem;
  color: #999;
`;

const EditLink = styled(Link)`
  margin-top: 0.5rem;
  color: #333;
  text-decoration: underline;
`;

export default PostsList;
