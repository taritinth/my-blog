import axios from "axios";
import parse from "html-react-parser";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Author from "../../components/Author";
import Comment from "./components/Comment";
import ReplyBox from "./components/ReplyBox";
import PostInfo from "./components/PostInfo";

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

const PostContent = styled.div`
  flex: 1;
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
  /* border: 1px solid hsl(0deg 0% 10% / 20%); */
  border-radius: 18px;
  @media (max-width: 600px) {
    flex-direction: row;
    width: 100%;
  }
`;

const Divider = styled.hr`
  margin: 24px 0;
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 24px;
  margin-bottom: 72px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CommentHeader = styled.h1`
  font-size: 2rem;
`;

const Post = () => {
  const params = useParams();
  const [author, setAuthor] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const getPost = useCallback(async () => {
    const response = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/posts/${params.postId}`,
      {
        headers: {
          Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
        },
      }
    );

    if (response.data?.status !== "404") {
      setPost(response.data);
    }
  }, [params]);

  const getAuthor = useCallback(async () => {
    if (post) {
      const response = await axios.get(
        `https://fswd-wp.devnss.com/wp-json/wp/v2/users/${post.author}`,
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
  }, [post]);

  const getComments = useCallback(async () => {
    if (post) {
      const response = await axios.get(
        `https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${post.id}`,
        {
          headers: {
            Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
          },
        }
      );
      if (response.data?.status !== "404") {
        setComments(response.data);
      }
    }
  }, [post]);

  const onSubmitComment = async () => {
    try {
      if (reply) {
        setLoading(true);
        const response = await axios.post(
          `https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${post.id}`,
          {
            content: reply,
          },
          {
            headers: {
              Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
            },
          }
        );

        if (response.data?.status === "approved") {
          getComments();
          setReply("");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [getPost]);

  useEffect(() => {
    getAuthor();
    getComments();
  }, [post, getAuthor, getComments]);

  return (
    <Wrapper>
      <Container>
        {post && author && (
          <>
            <Header>
              <Title>{post.title.rendered}</Title>
              <PostInfo
                authorId={author.id}
                authorName={author.name}
                date={post.date}
              />
            </Header>
            <Content>
              <PostContent>{parse(post.content.rendered)}</PostContent>
              <PostAuthor>
                <Author author={author} viewProfile />
              </PostAuthor>
            </Content>
            <Comments>
              <Divider />
              <CommentHeader>Comments ({comments.length})</CommentHeader>
              {comments
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((comment, index) => (
                  <Comment
                    key={index}
                    authorName={comment.author_name}
                    authorAvatar={comment.author_avatar_urls["48"]}
                    content={comment.content.rendered}
                    date={comment.date}
                  />
                ))}
              <ReplyBox
                commentValue={reply}
                handleSubmit={onSubmitComment}
                handleCommentChange={setReply}
                loading={loading}
              />
            </Comments>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default Post;
