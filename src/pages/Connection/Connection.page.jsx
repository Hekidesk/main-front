// HEKIDESK
import FormWrapper from "HEKIDESK/components/FormWrapper/FormWrapper";
import { Container } from "HEKIDESK/components/reusable/Container";

import ConnectionInfo from "./components/Info";
import ConnectionForm from "./components/Form";

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
