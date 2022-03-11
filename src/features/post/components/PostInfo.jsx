import styled from "styled-components/macro";
import { getDateText } from "../../../utils";
import { Link } from "react-router-dom";

const Title = styled.h1`
  font-size: 3rem;
`;

const PostInfoWrapper = styled.h3`
  font-size: 1.25rem;
  font-weight: 300;
`;

const AuthorLink = styled(Link)`
  color: hsl(0deg 0% 0%);
  font-weight: 500;
  text-decoration: none;
`;

const PostInfo = ({ title, authorId, authorName, date }) => {
  return (
    <>
      <Title>{title}</Title>
      <PostInfoWrapper>
        Published by{" "}
        <AuthorLink to={`/authors/${authorId}`}>{authorName}</AuthorLink> on{" "}
        {getDateText(date)}
      </PostInfoWrapper>
    </>
  );
};

export default PostInfo;
