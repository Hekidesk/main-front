import FormWrapper from "../../components/FormWrapper/FormWrapper";
import { Container } from "../../components/reusable/Container";
import LoginForm from "./components/Form";
import LoginBanner from "./components/Info";

const LoginPage = () => {
  return (
    <Container>
      <FormWrapper
        children1={<LoginBanner />}
        children2={<LoginForm />}
      ></FormWrapper>
    </Container>
  );
};

export default LoginPage;
