import Icon from "@/assets/logo/hekidesk-green.svg";
import PlusIcon from "@/assets/icon/plus.svg";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import { ContainerWithoutHeight } from "@/components/reusable/Container";
import { Text } from "@/components/reusable/Text";
import { Title } from "@/components/reusable/Title";
import { CustomDropdown, FlexContainer, FormTitle, LogoRow } from "./CSS";
import { Dropdown } from "primereact/Dropdown";
import { useState } from "react";
import {
  ButtonOutlineStyle,
  ButtonStyle,
} from "@/components/reusable/ButtonStyle";

const HomeForm = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // todo
  // read from db and add context
  const [users] = useState([
    { name: "Test1", code: "Ts1" },
    { name: "Test2", code: "Ts2" },
    { name: "Test3", code: "Ts3" },
    { name: "Test4", code: "Ts4" },
    { name: "Test5", code: "Ts5" },
    { name: "Test6", code: "Ts6" },
    { name: "Test7", code: "Ts7" },
    { name: "Test8", code: "Ts8" },
  ]);
  const [devices] = useState([
    { name: "Test1", code: "Ts1" },
    { name: "Test2", code: "Ts2" },
    { name: "Test3", code: "Ts3" },
    { name: "Test4", code: "Ts4" },
    { name: "Test5", code: "Ts5" },
    { name: "Test6", code: "Ts6" },
    { name: "Test7", code: "Ts7" },
    { name: "Test8", code: "Ts8" },
  ]);

  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hekidesk</Title>
      </LogoRow>
      <Text style={FormTitle}>First, register your Hekidesk device.</Text>
      <FlexContainer>
        <Link to="/register-device" style={ButtonStyle}>
          <Image src={PlusIcon} alt="plus"></Image>
        </Link>
        <Dropdown
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.value)}
          options={devices}
          optionLabel="name"
          placeholder={"Select a device"}
          style={{ ...CustomDropdown, margin: "1em 0" }}
        />
      </FlexContainer>
      <Text style={FormTitle}>Then, sign up with your user.</Text>
      <FlexContainer>
        <Link to="/register-user" style={ButtonStyle}>
          <Image src={PlusIcon} alt="plus"></Image>
        </Link>
        <Dropdown
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.value)}
          options={users}
          optionLabel="name"
          placeholder={"Select a user"}
          style={{ ...CustomDropdown, margin: "1em 0" }}
        />
      </FlexContainer>
      <Link to="/user-desk" style={ButtonOutlineStyle}>
        OK
      </Link>
    </ContainerWithoutHeight>
  );
};

export default HomeForm;
