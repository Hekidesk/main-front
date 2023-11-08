import Icon from "@/assets/logo/hekidesk-green.svg";
import PlusIcon from "@/assets/icon/plus.svg";
import TrashIcon from "@/assets/icon/trash.svg";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import { ContainerWithoutHeight } from "@/components/reusable/Container";
import { Text } from "@/components/reusable/Text";
import { Title } from "@/components/reusable/Title";
import {
  CustomDropdown,
  FlexContainer,
  FormTitle,
  LogoRow,
  LogoWrapper,
} from "./CSS";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import {
  ButtonOutlineStyle,
  ButtonStyle,
} from "@/components/reusable/ButtonStyle";
import { useIndexedDB } from "react-indexed-db";

const HomeForm = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedDevice, setSelectedDevice] = useState(null);

  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);

  const { getAll: getAllUsers } = useIndexedDB("users");
  const { getAll: getAllDevices } = useIndexedDB("devices");
  const { deleteRecord: deleteUserRecord } = useIndexedDB("users");

  useEffect(() => {
    getAllUsers().then((usersFromDB) => {
      setUsers(usersFromDB);
    });
    getAllDevices().then((deviceFromDB) => {
      setDevices(deviceFromDB);
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const foundUser = users.find(
        (user) => user.username === localStorage.getItem("user")
      );
      if (foundUser) setSelectedUser(foundUser);
      if (localStorage.getItem("device") !== null) {
        const foundDevice = devices.find(
          (device) => device.name === localStorage.getItem("device")
        );
        if (foundDevice) setSelectedDevice(foundDevice);
      }
    }
  }, [users, devices]);

  const selectUser = (user) => {
    setSelectedUser(user);
    console.log(users);
    localStorage.setItem("user", user ? user.username : null);
    localStorage.setItem("id", users.indexOf(user));
  };

  const deleteSelectedUser = (user) => {
    setUsers(users.filter((u) => u !== user));
    setSelectedUser(null);
    deleteUserRecord(localStorage.getItem("id"));
    localStorage.removeItem("user");
    localStorage.removeItem("id");
  };

  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <LogoWrapper>
          <Image src={Icon} alt="icon" width="60px" />
        </LogoWrapper>
        <Title>Hekidesk</Title>
      </LogoRow>
      <br />
      <Text style={FormTitle}>
        Choose which account you want to sign in with.
      </Text>
      <FlexContainer>
        {selectedUser ? (
          <Link
            // eslint-disable-next-line no-undef
            onClick={() => deleteSelectedUser(selectedUser)}
            style={ButtonStyle}
          >
            <Image src={TrashIcon} alt="trash" width="26"></Image>
          </Link>
        ) : (
          <Link
            // eslint-disable-next-line no-undef
            to={process.env.REACT_APP_BASE_URL + "/register-user"}
            style={ButtonStyle}
          >
            <Image src={PlusIcon} alt="plus"></Image>
          </Link>
        )}
        <Dropdown
          value={selectedUser}
          onChange={(e) => selectUser(e.value)}
          className="home-dropdown"
          options={users}
          optionLabel="username"
          showClear
          placeholder={"Select a user"}
          style={{ ...CustomDropdown, margin: "1em 0", color: "white" }}
        />
      </FlexContainer>
      {selectedUser && selectedDevice && (
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/user-desk"}
          style={ButtonOutlineStyle}
        >
          Dashboard
        </Link>
      )}
    </ContainerWithoutHeight>
  );
};

export default HomeForm;
