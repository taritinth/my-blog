import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const Profile = styled.div`
  width: 96px;
  height: 96px;
  overflow: hidden;
  border-radius: 50%;
`;

const Image = styled.img`
  object-fit: cover;
`;

const Info = styled.div`
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

const Author = ({ author, viewProfile }) => {
  return (
    <>
      <Profile>
        <Image src={author.avatar_urls["96"]} />
      </Profile>
      <Info>
        <AuthorName to={`/authors/${author.id}`}>{author.name}</AuthorName>
        {viewProfile && (
          <ViewProfile to={`/authors/${author.id}`}>View Profile</ViewProfile>
        )}
      </Info>
    </>
  );
};

export default Author;
