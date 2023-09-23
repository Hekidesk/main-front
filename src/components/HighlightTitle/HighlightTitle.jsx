import { H6, H6Wrapper, TitleContainer } from "./CSS";

const HighlightTitle = ({ title }) => {
  return (
    <TitleContainer>
      <H6Wrapper>
        <H6>{title}</H6>
      </H6Wrapper>
    </TitleContainer>
  );
};
export default HighlightTitle;
