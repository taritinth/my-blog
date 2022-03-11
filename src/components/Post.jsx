import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const PostWrapper = styled.div`
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
  color: hsl(0deg 0% 0%);
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

const TitleWrapper = styled.div`
  margin-top: 18px;
`;

const Post = ({ id, title, excerpt }) => {
  return (
    <PostWrapper>
      <Link to={`/posts/${id}`}>
        <ImageWrapper>
          <Image src="https://fswd-wp.devnss.com/wp-content/uploads/2022/02/5a203da0-1347-3568-971c-4fc7a92f064c.png"></Image>
        </ImageWrapper>
      </Link>
      <TitleWrapper>
        <PostTitle to={`/posts/${id}`}>{title}</PostTitle>
      </TitleWrapper>
      <PostExcerpt>{parse(excerpt)}</PostExcerpt>
    </PostWrapper>
  );
};

export default Post;
