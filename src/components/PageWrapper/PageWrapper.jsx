import { Container } from "HEKIDESK/components/reusable/Container";
import {
  Wrapper,
  ProfileContainer,
  SidebarContainer,
  ChildContainer,
} from "./CSS";
import Sidebar from "HEKIDESK/components/Sidebar/Sidebar";
import Profile from "HEKIDESK/pages/Profile/Profile";

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
