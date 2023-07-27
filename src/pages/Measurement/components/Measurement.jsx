// Third party
import { Link } from "react-router-dom";

// PRIME REACT
import { Card } from "primereact/card";

// HEKIDESK
import { ButtonMyDeskStyle } from "HEKIDESK/components/reusable/ButtonStyle";
import { Title2 } from "HEKIDESK/components/reusable/Title";

// SVG
import MyDeskIcon from "HEKIDESK/assets/icon/myDesk.svg";
import CarIcon from "HEKIDESK/assets/icon/measurement/cardiogramIcon.svg";
import OxIcon from "HEKIDESK/assets/icon/measurement/oximetryIcon.svg";
import SoundIcon from "HEKIDESK/assets/icon/measurement/heartLungSoundIcon.svg";
import TemeperatureIcon from "HEKIDESK/assets/icon/measurement/temeperatureIcon.svg";
import BpIcon from "HEKIDESK/assets/icon/measurement/bloodPressureIcon.svg";

// Style
import { CardStyle } from "./CSS";

const Measurement = () => {
  const routes = [
    { route: "/cardiogram", icon: CarIcon, name: "Cardiogram" },
    { route: "/oximetry", icon: OxIcon, name: "Oximetry" },
    { route: "/blood-pressure", icon: BpIcon, name: "Blood Pressure" },
    { route: "/temperature", icon: TemeperatureIcon, name: "Temperature" },
    {
      route: "/heart-and-lung-sound",
      icon: SoundIcon,
      name: "Heart Lung Sound",
    },
  ];
  return (
    <div>
      <div className="d-flex flex-column">
        <div className="d-flex flex-column my-2">
          <Title2>Measurement</Title2>
        </div>
        <div className="row">
          {routes.map((item, i) => (
            <div className="col-4" key={i}>
              <Link
                to={
                  // eslint-disable-next-line no-undef
                  process.env.REACT_APP_BASE_URL + "/measurement" + item.route
                }
              >
                <Card
                  header={
                    <img
                      src={item.icon}
                      style={{
                        height: "2.5em",
                        width: "auto",
                        paddingLeft: "20px",
                      }}
                    />
                  }
                  style={CardStyle}
                >
                  <dispatchEvent>measure of</dispatchEvent>
                  <h4 className="fw-bold">{item.name}</h4>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/user-desk"}
          style={ButtonMyDeskStyle}
        >
          <img src={MyDeskIcon} alt="Image" width="16px" className={"mx-2"} />
          {" My Desk"}
        </Link>
      </div>
    </div>
  );
};

export default Measurement;
