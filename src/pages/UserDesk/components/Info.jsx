import Icon from "@/assets/logo/hekidesk-transparent.svg";
import HistoryIcon from "@/assets/icon/history.svg";
import AddIcon from "@/assets/icon/add.svg";
import { Image } from "primereact/image";
import { Text } from "@/components/reusable/Text";
import { List, ListItems } from "@/components/reusable/List";
import { ImageWrapper } from "@/components/reusable/ImageWrapper";
import LogoutIcon from "@/assets/icon/logoutIcon.svg";
import { useNavigate } from "react-router-dom";

const DeskInfo = () => {

  const navigate = useNavigate();
  const Logout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("user", "");
    localStorage.setItem("account-id", "");
    localStorage.setItem("token", "");
    localStorage.setItem("expireDate", "");
    // eslint-disable-next-line no-undef
    navigate(process.env.REACT_APP_BASE_URL + "/");
  };

  return (
    <span>
      <Text>My Desk</Text>
      <List>
        <ListItems>
          <Image
            src={AddIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 1em" }}
          />
          Add new medical records by connecting to device.
        </ListItems>
        <ListItems>
          <Image
            src={HistoryIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 1em" }}
          />
          View medical record history
        </ListItems>
      </List>
      <ImageWrapper>
        <Image src={Icon} alt="icon" width="100%" />
      </ImageWrapper>
      <div className="sidebar-item-end">
          <span onClick={() => Logout()}>
            <img src={LogoutIcon} alt="logo" width="25"/>
            <p>Log out</p>
          </span>
      </div>
    </span>
  );
};

export default DeskInfo;
