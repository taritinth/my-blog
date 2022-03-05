import { useEffect, useState, useCallback } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import parse from "html-react-parser";
import { Link, useSearchParams } from "react-router-dom";

const Header = styled.div`
  padding-top: 56px;
  margin-bottom: 48px;
`;

const Container = styled.div`
  width: 1240px;
  margin: 0 auto;
  padding: 0 12px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 48px;
`;

const SubTitle = styled.h3`
  font-size: 24px;
`;

const Categories = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 48px;
  row-gap: 10px;
  column-gap: 18px;
`;

const CategoriesBubble = styled.div`
  padding: 6px 12px;
  background-color: white;
  border-radius: 18px;
  border: 1px solid hsl(0deg 0% 10% / 20%);
  cursor: pointer;
  &:hover {
    transition: 0.2s ease;
    transform: translateY(-5px);
  }
`;

const Content = styled.div`
  display: grid;
  column-gap: 24px;
  row-gap: 36px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 960px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Post = styled.div`
  width: 100%;
  /* box-shadow: 0 4px 7px hsl(0 0% 30% / 0.08), 0 9px 14px hsl(0 0% 30% / 0.09); */
`;

const ImageWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  object-fit: cover;
`;

const PostTitle = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: 500;
  font-size: 22px;
  margin-top: 24px;
  cursor: pointer;
`;

const PostExcerpt = styled.div`
  color: gray;
  margin-top: 12px;
  a {
    color: gray;
  }
`;

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  const [category, setCategory] = useState(
    searchParams.get("categories") ?? ""
  );

  const getPosts = useCallback(async () => {
    const response = await axios.get(
      `https://c602db66-2aea-4297-ba3f-1e4ec687b9bc.mock.pstmn.io/wp-json/wp/v2/posts?${
        category ? searchParams : ""
      }`
    );
    setPosts(response.data);
  }, [category, searchParams]);

  const getCategories = async () => {
    const response = await axios.get(
      "https://c602db66-2aea-4297-ba3f-1e4ec687b9bc.mock.pstmn.io/wp-json/wp/v2/categories"
    );
    setCategories(response.data);
  };

  useEffect(() => {
    getPosts();
  }, [category, getPosts]);

  useEffect(() => {
    getCategories();
  }, []);

  const onCategoryChange = (categoryId) => {
    setCategory(categoryId);
    if (categoryId) {
      setSearchParams({ categories: categoryId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Container>
      <Header>
        <Title>Hey, Reader !</Title>
        <SubTitle>What kind of content do you like ?</SubTitle>
        <Categories>
          <CategoriesBubble onClick={() => onCategoryChange("")}>
            All
          </CategoriesBubble>
          {categories.map((category, index) => (
            <CategoriesBubble
              key={index}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </CategoriesBubble>
          ))}
        </Categories>
      </Header>
      <Content>
        {posts.map((post, index) => (
          <Post key={index}>
            <Link to={`/posts/${post.id}`}>
              <ImageWrapper>
                <Image src="https://fswd-wp.devnss.com/wp-content/uploads/2022/02/5a203da0-1347-3568-971c-4fc7a92f064c.png"></Image>
              </ImageWrapper>
            </Link>
            <div style={{ marginTop: 18 }}>
              <PostTitle to={`/posts/${post.id}`}>
                {post.title.rendered}
              </PostTitle>
            </div>
            <PostExcerpt>{parse(post.excerpt.rendered)}</PostExcerpt>
          </Post>
        ))}
      </Content>
    </Container>
  );
};

export default Posts;
