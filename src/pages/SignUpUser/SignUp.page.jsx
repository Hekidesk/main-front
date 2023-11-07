import FormWrapper from "@/components/FormWrapper/FormWrapper";
import { Container } from "@/components/reusable/Container";
import SignUpForm from "./components/Form";
import SignUpInfo from "./components/Info";


const SignUpPage = () => {
  return (
    <Container>
      <FormWrapper
        children1={<SignUpInfo />}
        children2={<SignUpForm />}
      ></FormWrapper>
    </Container>
  );
};

export default SignUpPage;
