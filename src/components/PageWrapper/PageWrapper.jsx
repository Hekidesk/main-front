import { Container } from "@/components/reusable/Container";
import { Wrapper } from "./CSS";
import Sidebar from "@/pages/Sidebar/Sidebar";

const PageWrapper = (props) => {
  return (
    <Container>
      <Wrapper>
        <Sidebar />
        {props.children}
      </Wrapper>
    </Container>
  );
};

export default PageWrapper;
