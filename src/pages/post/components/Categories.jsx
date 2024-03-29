import styled from "styled-components/macro";

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 48px;
  row-gap: 10px;
  column-gap: 18px;
`;

const Bubble = styled.div`
  padding: 6px 12px;
  background-color: white;
  border-radius: 18px;
  border: 1px solid hsl(0deg 0% 10% / 20%);
  cursor: pointer;
  &:hover {
    transition: 0.2s ease;
    transform: translateY(-5px);
  }
  ${({ active }) => active && `background-color: hsl(0deg 0% 35% / 20%);`}
`;

const Categories = ({ categories, isActive, onCategoryChange }) => {
  let items = categories.map((category, index) => (
    <Bubble
      active={isActive.includes(category.id.toString())}
      key={index}
      onClick={() => onCategoryChange(category.id)}
    >
      {category.name}
    </Bubble>
  ));

  return (
    <Wrapper>
      <Bubble active={!isActive.length} onClick={() => onCategoryChange("")}>
        All
      </Bubble>
      {items}
    </Wrapper>
  );
};

export default Categories;
