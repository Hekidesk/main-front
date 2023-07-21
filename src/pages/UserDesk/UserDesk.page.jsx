import FormWrapper from "HEKIDESK/components/FormWrapper/FormWrapper";
import DeskInfo from "./components/Info";
import DeskForm from "./components/Form";
import { Container } from "HEKIDESK/components/reusable/Container";

const DeskPage = () => {
  return (
    <Container>
      <FormWrapper
        children1={<DeskInfo />}
        children2={<DeskForm />}
      ></FormWrapper>
    </Container>
  );
};

export default DeskPage;
