import FormWrapper from "HEKIDESK/components/FormWrapper/FormWrapper";
import { Container } from "HEKIDESK/components/reusable/Container";
import RegisterForm from "./components/Form";
import RegisterInfo from "./components/Info";

const RegisterPage = () => {
  return (
    <Container>
      <FormWrapper
        children1={<RegisterInfo />}
        children2={<RegisterForm />}
      ></FormWrapper>
    </Container>
  );
};

export default RegisterPage;
