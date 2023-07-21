import FormWrapper from "HEKIDESK/components/FormWrapper/FormWrapper";
import ConnectionInfo from "./components/Info";
import ConnectionForm from "./components/Form";
import { Container } from "HEKIDESK/components/reusable/Container";

const ConnectionPage = () => {
  return (
    <Container>
      <FormWrapper
        children1={<ConnectionInfo />}
        children2={<ConnectionForm />}
      ></FormWrapper>
    </Container>
  );
};

export default ConnectionPage;
