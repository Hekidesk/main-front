import { Container } from "@/components/reusable/Container";
import {
  Wrapper,
  ProfileContainer,
  SidebarContainer,
  ChildContainer,
  ClockContainer,
} from "./CSS";
import Sidebar from "@/components/Sidebar/Sidebar";
import Profile from "@/components/Profile/Profile";
import Counter from "@/components/Counter/Counter";

const PageWrapper = (props) => {
  return (
    <><ClockContainer {...props}>
      <Counter counter={5} startCountDown={props.showDownCounter} size = {300}/>
    </ClockContainer>
    <Container {...props}>
      <Wrapper>
        <ProfileContainer>
          <Profile />
        </ProfileContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <ChildContainer> {props.children}</ChildContainer>
      </Wrapper>
    </Container>
    </>
  );
};

export default PageWrapper;
