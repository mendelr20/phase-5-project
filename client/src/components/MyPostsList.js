import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import { Button } from "../styles";
function PostsList() {
  const { user, posts } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (!posts) {
    return <Loading>Loading posts...</Loading>;
  }

  if (posts.length === 0) {
    return <NoPosts>No posts found.</NoPosts>;
  }

  const userPosts = posts.filter((post) => post.user.id === user.id);

  const filteredPosts = userPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (userPosts.length === 0) {
    return (
      <>
        <NoPosts>No posts found.</NoPosts>
        <Link to="/posts/new">
          <Button>Create a Post</Button>
        </Link>
      </>
    );
  }
  return (
    <div>
      <PostTitle> My Posts</PostTitle>
      <SearchBarWrapper>
        <SearchBar
          type="text"
          placeholder="Search posts"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchBarWrapper>
      <Wrapper>
        {filteredPosts.map((post) => (
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
              Posted on: {new Date(post.created_at).toLocaleDateString()}
            </CreatedAt>
            {user && user.id === post.user.id && (
              <Button as={Link}to={`/posts/${post.id}/edit`}>Edit</Button>
            )}
          </PostCard>
        ))}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin-top: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const PostTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  color: #000;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.input`
  padding: 12px;
  border: none;
  border-radius: 25px;
  width: 500px;
  background-color: #f0f0f0;
  color: #333;
  font-size: 1.2rem;
  font-weight: 400;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px #333;
    background-color: #fff;
  }

  &::placeholder {
    color: #999;
  }
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
  margin: auto;
`;

const Username = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 0 auto;
`;

const NoPosts = styled.p`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  color: #333;
`;

const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: #000;
  margin-bottom: 10px;
  margin-top: 10px;
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
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  font-size: 14px;
`;

const CreatedAt = styled.span`
  font-size: 0.8rem;
  color: #999;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

export default PostsList;
