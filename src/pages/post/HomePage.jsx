import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";

import Post from "../../components/Post";
import Categories from "./components/Categories";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 1240px;
  margin: 0 auto;
  padding: 0 12px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Header = styled.div`
  padding-top: 56px;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 3rem;
`;

const SubTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 300;
`;

const Content = styled.div`
  display: grid;
  column-gap: 24px;
  row-gap: 36px;
  margin-bottom: 72px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 960px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  const [category, setCategory] = useState(
    searchParams.get("categories") ?? ""
  );

  let activeParams = searchParams.getAll("categories");

  const getPosts = useCallback(async () => {
    const response = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/posts?${
        category ? searchParams : ""
      }`,
      {
        headers: {
          Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
        },
      }
    );
    setPosts(response.data);
  }, [category, searchParams]);

  const getCategories = async () => {
    const response = await axios.get(
      "https://fswd-wp.devnss.com/wp-json/wp/v2/categories",
      {
        headers: {
          Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
        },
      }
    );
    setCategories(response.data);
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
    if (categoryId) {
      setSearchParams({ categories: categoryId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Hey, Reader !</Title>
          <SubTitle>What kind of content do you like ?</SubTitle>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              isActive={activeParams}
              onCategoryChange={handleCategoryChange}
            />
          )}
        </Header>
        <Content>
          {posts.map((post, index) => (
            <Post
              key={index}
              id={post.id}
              title={post.title.rendered}
              excerpt={post.excerpt.rendered}
            />
          ))}
        </Content>
      </Container>
    </Wrapper>
  );
};

export default HomePage;
