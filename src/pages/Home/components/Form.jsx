import { Fragment , useState, useEffect } from "react";

// Third party
import { useIndexedDB } from "react-indexed-db";
import { Link, useNavigate } from "react-router-dom";

// PRIME REACT
import { Image } from "primereact/image";
import { Dropdown } from "primereact/dropdown";

// SVG
import Icon from "HEKIDESK/assets/logo/hekidesk-green.svg";
import PlusIcon from "HEKIDESK/assets/icon/plus.svg";

// HEKIDESK
import { ContainerWithoutHeight } from "HEKIDESK/components/reusable/Container";
import { Text } from "HEKIDESK/components/reusable/Text";
import { Title } from "HEKIDESK/components/reusable/Title";
import { ButtonStyle } from "HEKIDESK/components/reusable/ButtonStyle";


import { CustomDropdown, FlexContainer, FormTitle, LogoRow } from "./CSS";

const HomeForm = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const { getAll } = useIndexedDB("users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll().then((usersFromDB) => {
      setUsers(usersFromDB);
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const foundUser = users.find(
        (user) => user.username === localStorage.getItem("user")
      );
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
    setSelectedUser(user);
    localStorage.setItem("user", user.username);
    localStorage.setItem("id", users.indexOf(user) + 1);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser && selectedDevice) {
      // eslint-disable-next-line no-undef
      navigate(process.env.REACT_APP_BASE_URL + "/user-desk");
    }
  }, [selectedUser, selectedDevice]);

  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hekidesk</Title>
      </LogoRow>
      {!selectedDevice && (
        <Fragment>
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
              className="home-dropdown"
              options={devices}
              optionLabel="name"
              placeholder={"Select a device"}
              style={{ ...CustomDropdown, margin: "1em 0" }}
            />
          </FlexContainer>
        </Fragment>
      )}
      {selectedDevice && !selectedUser && (
        <Fragment>
          <Text style={{ ...FormTitle, marginTop: "10em" }}>
            Then, sign up with your user.
          </Text>
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
              className="home-dropdown"
              options={users}
              optionLabel="username"
              placeholder={"Select a user"}
              style={{ ...CustomDropdown, margin: "1em 0", color: "white" }}
            />
          </FlexContainer>
        </Fragment>
      )}
    </ContainerWithoutHeight>
  );
};

export default HomeForm;
