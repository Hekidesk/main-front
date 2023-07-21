import Icon from "@/assets/logo/hekidesk-green.svg";
import PlusIcon from "@/assets/icon/plus.svg";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import { ContainerWithoutHeight } from "@/components/reusable/Container";
import { Text } from "@/components/reusable/Text";
import { Title } from "@/components/reusable/Title";
import { CustomDropdown, FlexContainer, FormTitle, LogoRow } from "./CSS";
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

  const { getAll } = useIndexedDB("users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll().then((usersFromDB) => {
      console.log(usersFromDB);
      setUsers(usersFromDB);
    });
    console.log("here 1 " + localStorage.getItem("user"));
  }, []);

  useEffect(() =>{
    if(localStorage.getItem("user") !== null){
      console.log("here");
      console.log(users);
      console.log(localStorage.getItem("user"));
      const foundUser = users.find(user => user.username === localStorage.getItem("user"));
      if (foundUser) {
        setSelectedUser(foundUser);
    }
  }
  }, [users]);

  // todo
  // read from db "devices" and add data
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

  const selectUser = (user) => {
    console.log(users.indexOf(user));
    setSelectedUser(user);
    localStorage.setItem("user", user.username);
    localStorage.setItem("id", users.indexOf(user) + 1);
  };

  return (
    <ContainerWithoutHeight>
      {console.log(selectedUser)}
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hekidesk</Title>
      </LogoRow>
      <Text style={FormTitle}>First, register your Hekidesk device.</Text>
      <FlexContainer>
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/register-device"}
          style={ButtonStyle}
        >
          <Image src={PlusIcon} alt="plus"></Image>
        </Link>
        <Dropdown
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.value)}
          className = "home-dropdown"
          options={devices}
          optionLabel="name"
          placeholder={"Select a device"}
          style={{ ...CustomDropdown, margin: "1em 0" }}
        />
      </FlexContainer>
      <Text style={FormTitle}>Then, sign up with your user.</Text>
      <FlexContainer>
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/register-user"}
          style={ButtonStyle}
        >
          <Image src={PlusIcon} alt="plus"></Image>
        </Link>
        <Dropdown
          value={selectedUser}
          onChange={(e) => selectUser(e.value)}
          className = "home-dropdown"
          options={users}
          optionLabel="username"
          placeholder={"Select a user"}
          style={{ ...CustomDropdown, margin: "1em 0", color: "white" }}
        />
      </FlexContainer>
      <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/user-desk"}
        style={ButtonOutlineStyle}
      >
        OK
      </Link>
    </ContainerWithoutHeight>
  );
};

export default HomeForm;
