import styled from "styled-components/macro";
import parse from "html-react-parser";
import { getDateText } from "../../../utils";

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid hsl(0deg 0% 10% / 10%);
  border-radius: 18px;
`;

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImageWrapper = styled.div`
  width: 48px;
  height: 48px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 12px;
`;

const AuthorImage = styled.img`
  object-fit: cover;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.h3`
  font-size: 1rem;
`;

const CreateAt = styled.span`
  font-weight: 300;
`;

const Content = styled.div`
  padding: 24px 0;
`;

const Wrapper = ({ authorName, authorAvatar, content, date }) => {
  return (
    <CommentWrapper>
      <AuthorWrapper>
        <AuthorImageWrapper>
          <AuthorImage src={authorAvatar} />
        </AuthorImageWrapper>
        <CommentInfo>
          <AuthorName>{authorName}</AuthorName>
          <CreateAt>{getDateText(date)}</CreateAt>
        </CommentInfo>
      </AuthorWrapper>
      <Content>{parse(content)}</Content>
    </CommentWrapper>
  );
};

export default Wrapper;
