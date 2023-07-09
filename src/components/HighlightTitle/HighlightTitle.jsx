import { Image } from "primereact/image";
import { H6, H6Wrapper, TitleContainer } from "./CSS";

const HighlightTitle = ({ title, icon }) => {
  return (
    <TitleContainer>
      <H6Wrapper>
        <H6>{title}</H6>
      </H6Wrapper>
      <Image src={icon} alt="icon" width="80%" />
    </TitleContainer>
  );
};
export default HighlightTitle;
