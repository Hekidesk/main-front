import FormWrapper from "HEKIDESK/components/FormWrapper/FormWrapper";
import { Container } from "HEKIDESK/components/reusable/Container";

import InfoHome from "./components/Info";
import HomeForm from "./components/Form";

const HomePage = () => {
  return (
    <Container>
      <FormWrapper
        children1={<InfoHome />}
        children2={<HomeForm />}
      ></FormWrapper>
    </Container>
  );
};

export default HomePage;
