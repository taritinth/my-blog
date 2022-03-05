import axios from "axios";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
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

const PostInfo = styled.h3`
  font-size: 1.25rem;
  font-weight: 300;
`;

const AuthorLink = styled(Link)`
  color: hsl(0deg 0% 0%);
  font-weight: 500;
  text-decoration: none;
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

const ViewProfile = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin-top: 12px;
  padding: 6px 12px;
  background-color: white;
  border-radius: 18px;
  border: 1px solid hsl(0deg 0% 10% / 20%);
  width: fit-content;
  cursor: pointer;
  &:hover {
    background-color: hsl(0deg 0% 35% / 20%);
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

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid hsl(0deg 0% 10% / 10%);
  border-radius: 18px;
`;

const CommentAuthorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CommentAuthorImageWrapper = styled.div`
  width: 48px;
  height: 48px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 12px;
`;

const CommentAuthorImage = styled.img`
  object-fit: cover;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentAuthorName = styled.h3`
  font-size: 1rem;
`;

const CommentCreateAt = styled.span`
  font-weight: 300;
`;

const CommentContent = styled.div`
  padding: 24px 0;
`;

const LeaveReply = styled.h2`
  margin-bottom: 12px;
  font-size: 2rem;
  font-weight: 400;
`;

const CommentTextArea = styled.textarea`
  margin: 12px 0;
  padding: 12px;
  min-height: 150px;
  resize: vertical;
  border-radius: 12px;
  border: 1px solid hsl(0deg 0% 10% / 10%);
  background-color: hsl(0deg 0% 10% / 2.5%);
`;

const CommentAuthorTextfield = styled.input`
  margin: 12px 0;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid hsl(0deg 0% 10% / 10%);
  background-color: hsl(0deg 0% 10% / 2.5%);
`;

const SubmitComment = styled.button`
  margin-top: 24px;
  color: hsl(0deg 0% 100%);
  padding: 12px;
  background-color: hsl(0deg 0% 10% / 90%);
  border-radius: 12px;
  border: 0;
  cursor: pointer;
  &:hover {
    background-color: hsl(0deg 0% 10% / 80%);
  }
  &:disabled {
    background-color: hsl(0deg 0% 10% / 60%);
    cursor: not-allowed;
  }
`;

const PostDetails = () => {
  const params = useParams();
  const [author, setAuthor] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    getAuthor();
    getComments();
  }, [post]);

  const getPost = async () => {
    const response = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/posts/${params.postId}`,
      {
        headers: {
          Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
        },
      }
    );

    if (response.data?.status != "404") {
      setPost(response.data);
    }
  };

  const getAuthor = async () => {
    if (post) {
      const response = await axios.get(
        `https://fswd-wp.devnss.com/wp-json/wp/v2/users/${post.author}`,
        {
          headers: {
            Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
          },
        }
      );
      if (response.data?.status != "404") {
        setAuthor(response.data);
      }
    }
  };

  const getComments = async () => {
    if (post) {
      const response = await axios.get(
        `https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${post.id}`,
        {
          headers: {
            Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
          },
        }
      );
      if (response.data?.status != "404") {
        setComments(response.data);
      }
    }
  };

  const postComment = async () => {
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

  const getDateText = (date) => {
    if (date) {
      date = new Date(date);
      let options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleString("en-US", options);
    } else {
      return "Invalid Date";
    }
  };

  return (
    <Wrapper>
      <Container>
        {post && author && (
          <>
            <Header>
              <Title>{post.title.rendered}</Title>
              <PostInfo>
                Published by{" "}
                <AuthorLink to={`/authors/${author.id}`}>
                  {author.name}
                </AuthorLink>{" "}
                on {getDateText(post.date)}
              </PostInfo>{" "}
              {/* February 10, 2022 */}
            </Header>
            <Content>
              <PostContent>{parse(post.content.rendered)}</PostContent>
              <PostAuthor>
                <AuthorImageWrapper>
                  <AuthorImage src={author.avatar_urls["96"]} />
                </AuthorImageWrapper>
                <AuthorInfo>
                  <AuthorName to={`/authors/${author.id}`}>
                    {author.name}
                  </AuthorName>
                  <ViewProfile to={`/authors/${author.id}`}>
                    View Profile
                  </ViewProfile>
                </AuthorInfo>
              </PostAuthor>
            </Content>
            <Comments>
              <Divider />
              <CommentHeader>Comments ({comments.length})</CommentHeader>
              {comments
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((comment, index) => (
                  <Comment key={index}>
                    <CommentAuthorWrapper>
                      <CommentAuthorImageWrapper>
                        <CommentAuthorImage
                          src={comment.author_avatar_urls["48"]}
                        />
                      </CommentAuthorImageWrapper>
                      <CommentInfo>
                        <CommentAuthorName>
                          {comment.author_name}
                        </CommentAuthorName>
                        <CommentCreateAt>
                          {getDateText(comment.date)}
                        </CommentCreateAt>
                      </CommentInfo>
                    </CommentAuthorWrapper>
                    <CommentContent>
                      {parse(comment.content.rendered)}
                    </CommentContent>
                  </Comment>
                ))}
              <Comment>
                <LeaveReply>Leave a reply</LeaveReply>
                {/* <label>Comment</label> */}
                <CommentTextArea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Comment"
                />
                {/* <label>Name (Optional)</label>
                <CommentAuthorTextfield placeholder="Name" /> */}
                <SubmitComment
                  onClick={postComment}
                  disabled={loading || !reply}
                >
                  Post Comment
                </SubmitComment>
              </Comment>
            </Comments>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default PostDetails;
