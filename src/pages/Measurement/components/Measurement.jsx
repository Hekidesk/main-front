// Third party
import { Link } from "react-router-dom";

// PRIME REACT
import { Card } from "primereact/card";

// HEKIDESK
import { ButtonMyDeskStyle } from "@/components/reusable/ButtonStyle";
import { Title2 } from "@/components/reusable/Title";

// SVG
import MyDeskIcon from "@/assets/icon/myDesk.svg";
import CarIcon from "@/assets/icon/measurement/cardiogramIcon.svg";
import OxIcon from "@/assets/icon/measurement/oximetryIcon.svg";
import SoundIcon from "@/assets/icon/measurement/heartLungSoundIcon.svg";
import TemeperatureIcon from "@/assets/icon/measurement/temeperatureIcon.svg";
import BpIcon from "@/assets/icon/measurement/bloodPressureIcon.svg";

// Style
import { CardStyle, TitleOfCard } from "./CSS";

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
        <div className="d-flex flex-column">
          <Title2>Measurement</Title2>
        </div>
        <div className="row">
          {routes.map((item, i) => (
            <div className="col-lg-4 col-xs-12 col-sm-6" key={i}>
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
                  <TitleOfCard>measure of</TitleOfCard>
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
