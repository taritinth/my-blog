import axios from "axios";
import parse from "html-react-parser";
import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components/macro";

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
  width: 100%;
  max-height: 415px;
  object-fit: cover;
`;

const PostTitle = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.5rem;
  cursor: pointer;
`;

const PostExcerpt = styled.div`
  color: gray;
  margin-top: 12px;
  a {
    color: gray;
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
  /* border: 1px solid hsl(0deg 0% 10% / 20%); */
  border-radius: 18px;
  @media (max-width: 600px) {
    flex-direction: row;
    width: 100%;
  }
`;

const AuthorImageWrapper = styled.div`
  width: 96px;
  height: 96px;
  overflow: hidden;
  border-radius: 50%;
`;

const AuthorImage = styled.img`
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuthorName = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 8px;
`;

// const ViewProfile = styled(Link)`
//   color: inherit;
//   text-decoration: none;
//   margin-top: 12px;
//   padding: 6px 12px;
//   background-color: white;
//   border-radius: 18px;
//   border: 1px solid hsl(0deg 0% 10% / 20%);
//   width: fit-content;
//   cursor: pointer;
//   &:hover {
//     background-color: hsl(0deg 0% 35% / 20%);
//   }
// `;

const AuthorProfile = () => {
  const params = useParams();

  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);

  const getAuthor = useCallback(async () => {
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
  }, [params]);

  const getPosts = useCallback(async () => {
    const response = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/posts?author=${params.authorId}`,
      {
        headers: {
          Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
        },
      }
    );
    setPosts(response.data);
  }, [params]);

  useEffect(() => {
    getAuthor();
    getPosts();
  }, [getAuthor, getPosts]);

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
              </PostList>
              <PostAuthor>
                <AuthorImageWrapper>
                  <AuthorImage src={author.avatar_urls["96"]} />
                </AuthorImageWrapper>
                <AuthorInfo>
                  <AuthorName to={`/authors/${author.id}`}>
                    {author.name}
                  </AuthorName>
                </AuthorInfo>
              </PostAuthor>
            </Content>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default AuthorProfile;
