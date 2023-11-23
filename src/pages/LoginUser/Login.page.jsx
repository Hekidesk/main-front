import FormWrapper from "@/components/FormWrapper/FormWrapper";
import { Container } from "@/components/reusable/Container";
import LoginForm from "./components/Form";
import LoginInfo from "./components/Info";

const LoginPage = () => {
  return (
    <Container>
      <FormWrapper
        children1={<LoginInfo />}
        children2={<LoginForm />}
      ></FormWrapper>
    </Container>
  );
};

export default LoginPage;
