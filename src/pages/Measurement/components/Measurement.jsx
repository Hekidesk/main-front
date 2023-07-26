import { Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import CarIcon from "HEKIDESK/assets/icon/measurement/cardiogramIcon.svg";
import OxIcon from "HEKIDESK/assets/icon/measurement/oximetryIcon.svg";
import SoundIcon from "HEKIDESK/assets/icon/measurement/heartLungSoundIcon.svg";
import TemeperatureIcon from "HEKIDESK/assets/icon/measurement/temeperatureIcon.svg";
import BpIcon from "HEKIDESK/assets/icon/measurement/bloodPressureIcon.svg";
import "HEKIDESK/assets/styles/Measurement.css";
import { ButtonMyDeskStyle } from "HEKIDESK/components/reusable/ButtonStyle";
import MyDeskIcon from "HEKIDESK/assets/icon/myDesk.svg";

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
      <Row>
        <Row>
          <h2 className="title-name">Measurement</h2>
        </Row>
        <Row style={{ minHeight: "40vh" }}>
          {routes.map((item, i) => (
            <Col lg={4} sm={6} key={i}>
              <Link
                to={
                  // eslint-disable-next-line no-undef
                  process.env.REACT_APP_BASE_URL + "/measurement" + item.route
                }
              >
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <img
                        src={item.icon}
                        style={{ height: "2em", width: "auto" }}
                      />
                    </Card.Title>
                    <div className="record-text">measure of</div>
                    <Card.Text>{item.name}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Row>
      <Row className="d-flex justify-content-end">
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/user-desk"}
          style={ButtonMyDeskStyle}
        >
          <img
            src={MyDeskIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 0.2em" }}
          />
          My Desk
        </Link>
      </Row>
    </div>
  );
};

export default Measurement;
