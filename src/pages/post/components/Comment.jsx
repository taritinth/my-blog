import styled from "styled-components/macro";
import parse from "html-react-parser";
import { getDateText } from "../../../utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid hsl(0deg 0% 10% / 10%);
  border-radius: 18px;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const Profile = styled.div`
  width: 48px;
  height: 48px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 12px;
`;

const Image = styled.img`
  object-fit: cover;
`;

const Info = styled.div`
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

const Comment = ({ authorName, authorAvatar, content, date }) => {
  return (
    <Wrapper>
      <Author>
        <Profile>
          <Image src={authorAvatar} />
        </Profile>
        <Info>
          <AuthorName>{authorName}</AuthorName>
          <CreateAt>{getDateText(date)}</CreateAt>
        </Info>
      </Author>
      <Content>{parse(content)}</Content>
    </Wrapper>
  );
};

export default Comment;
