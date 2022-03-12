import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Post from "../../components/Post";
import Author from "../../components/Author";

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

const Content = styled.div`
  display: flex;
  margin-bottom: 72px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PostList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-right: 24px;
  @media (max-width: 600px) {
    margin-right: 0px;
  }
`;

const PostAuthor = styled.div`
  /* align-self: flex-start; */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 15px;
  width: 30%;
  height: fit-content;
  padding: 0px 24px 24px;
  border-radius: 18px;
  @media (max-width: 600px) {
    flex-direction: row;
    width: 100%;
  }
`;

const AuthorPage = () => {
  const params = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);

  const getAuthor = async () => {
    if (params.authorId) {
      const response = await axios.get(
        `https://fswd-wp.devnss.com/wp-json/wp/v2/users/${params.authorId}`,
        {
          headers: {
            Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
          },
        }
      );
      if (response.data?.status !== "404") {
        setAuthor(response.data);
      }
    }
  };

  const getPosts = async () => {
    const response = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/posts?author=${params.authorId}`,
      {
        headers: {
          Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
        },
      }
    );
    setPosts(response.data);
  };

  useEffect(() => {
    getAuthor();
    getPosts();
  }, []);

  return (
    <Wrapper>
      <Container>
        {posts && author && (
          <>
            <Header>
              <Title>Posts by {author.name}</Title>
            </Header>
            <Content>
              <PostList>
                {posts.map((post, index) => (
                  <Post
                    key={index}
                    id={post.id}
                    title={post.title.rendered}
                    excerpt={post.excerpt.rendered}
                  />
                ))}
              </PostList>
              <PostAuthor>
                <Author author={author} />
              </PostAuthor>
            </Content>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default AuthorPage;
