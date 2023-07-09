import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import HistoryInfo from "./components/Info";
import HistoryForm from "./components/Form";
import { Container } from "../../../components/reusable/Container";

const HistoryDeskPage = () => {
  return (
    <Container>
      <FormWrapper
        children1={<HistoryInfo />}
        children2={<HistoryForm />}
      ></FormWrapper>
    </Container>
  );
};

export default HistoryDeskPage;
