import { Container } from "@/components/reusable/Container";
import {
  Wrapper,
  ProfileContainer,
  SidebarContainer,
  ChildContainer,
} from "./CSS";
import Sidebar from "@/components/Sidebar/Sidebar";
import Profile from "@/components/Profile/Profile";

const PageWrapper = (props) => {
  return (
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
  );
};

export default PageWrapper;
