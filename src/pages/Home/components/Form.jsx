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
import axios from "axios";
import Swal from "sweetalert2";

const HomeForm = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("user-accounts").then(
      (response) => {
        console.log(response.data.data);
        setUsers(response.data.data.length > 0 ? response.data.data.filter((user) => user.is_active == true) : []);
      },
      (error) => {
        Swal.fire({
          icon: error,
          title: error.response,
          text: "Please repeat procedure!",
        });
      }
    );
  }, []);

  useEffect(() => { // change this to id 
    if (localStorage.getItem("user") !== null) {
      const foundUser = users.find(
        (user) => user.first_name === localStorage.getItem("user")
      );
      if (foundUser) setSelectedUser(foundUser);
    }
  }, [users]);

  const selectUser = (user) => {
    setSelectedUser(user);
    localStorage.setItem("user", user ? user.first_name : null);
    localStorage.setItem("account-id", user.id);
  };

  const deleteSelectedUser = (user) => {
    setUsers(users.filter((u) => u !== user));
    setSelectedUser(null);
    axios.delete("account/" + localStorage.getItem("account-id")).then(
      (response) => {
        console.log(response);
      },
    )
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
          optionLabel="first_name"
          showClear
          placeholder={"Select a user"}
          style={{ ...CustomDropdown, margin: "1em 0", color: "white" }}
        />
      </FlexContainer>
      {selectedUser && (
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
