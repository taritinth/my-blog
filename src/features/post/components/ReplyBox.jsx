import styled from "styled-components/macro";

const ReplyBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid hsl(0deg 0% 10% / 10%);
  border-radius: 18px;
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

// const CommentAuthorTextfield = styled.input`
//   margin: 12px 0;
//   padding: 12px;
//   border-radius: 12px;
//   border: 1px solid hsl(0deg 0% 10% / 10%);
//   background-color: hsl(0deg 0% 10% / 2.5%);
// `;

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

const ReplyBox = ({
  commentValue,
  onCommentChange,
  onSubmitComment,
  loading,
}) => {
  return (
    <ReplyBoxWrapper>
      <LeaveReply>Leave a reply</LeaveReply>
      <CommentTextArea
        value={commentValue}
        onChange={(e) => onCommentChange(e.target.value)}
        placeholder="Comment"
      />
      <SubmitComment
        onClick={onSubmitComment}
        disabled={loading || !commentValue}
      >
        Post Comment
      </SubmitComment>
    </ReplyBoxWrapper>
  );
};

export default ReplyBox;
