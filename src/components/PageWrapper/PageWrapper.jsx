import { Container } from "@/components/reusable/Container";
import {
  Wrapper,
  ProfileContainer,
  SidebarContainer,
  ChildContainer,
} from "./CSS";
import Sidebar from "@/pages/Sidebar/Sidebar";
import Profile from "@/pages/Profile/Profile";

const PageWrapper = (props) => {
  return (
    <Container>
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
