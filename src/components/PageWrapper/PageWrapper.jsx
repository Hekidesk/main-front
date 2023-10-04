import { Container } from "@/components/reusable/Container";
import BackButton from "./BackButton";
import {
  Wrapper,
  ProfileContainer,
  ChildContainer,
  ClockContainer,
  AnswerReadyContainer,
  MainContainer,
  BackWrapper,
} from "./CSS";
import Sidebar from "@/components/Sidebar/Sidebar";
import Profile from "@/components/Profile/Profile";
import Counter from "@/components/Counter/Counter";
import WaitAnswer from "../reusable/WaitAnswer";

const PageWrapper = (props) => {
  return (
    <>
      <ClockContainer {...props}>
        <Counter
          counter={5}
          startCountDown={props.showDownCounter}
          size={300}
        />
      </ClockContainer>
      <AnswerReadyContainer {...props}>
        <WaitAnswer />
      </AnswerReadyContainer>
      <Container {...props}>
        <Wrapper>
          <Sidebar />
          <MainContainer>
            <ProfileContainer>
              <Profile />
            </ProfileContainer>
            <BackWrapper>
              <BackButton />
            </BackWrapper>
            <ChildContainer> {props.children}</ChildContainer>{" "}
          </MainContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default PageWrapper;
