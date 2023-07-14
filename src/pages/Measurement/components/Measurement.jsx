import { Col, Row, Card, Image } from "react-bootstrap";
import TopPhotoIcon from "@/assets/icon/measurement/doctorPhoto.svg";
import CarIcon from "@/assets/icon/measurement/cardiogramIcon.svg";
import OxIcon from "@/assets/icon/measurement/oximetryIcon.svg";
import SoundIcon from "@/assets/icon/measurement/heartLungSoundIcon.svg";
import TemeperatureIcon from "@/assets/icon/measurement/temeperatureIcon.svg";
import BpIcon from "@/assets/icon/measurement/bloodPressureIcon.svg";
// import "../../../assets/styles/measurement.css";
import { Link } from "react-router-dom";
import { ButtonMyDeskStyle } from "@/components/reusable/ButtonStyle";
import MyDeskIcon from "@/assets/icon/myDesk.svg";

const Measurement = () => {
  return (
    <div>
      <Row>
        <Row>
          <h2 className="title-name">Measurement</h2>
        </Row>
        <Row>
          <Image src={TopPhotoIcon} className="top-img" />
        </Row>
        <Row>
          <Col lg={4} sm={6}>
            <Link
              to={process.env.REACT_APP_BASE_URL + "/measurement/cardiogram"}
            >
              <Card>
                <Card.Body>
                  <Card.Title>
                    <Image src={CarIcon} />
                  </Card.Title>
                  <div className="record-text">records of</div>
                  <Card.Text>Cardiogram</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg={4} sm={6}>
            <Link to={process.env.REACT_APP_BASE_URL + "/measurement/oximetry"}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <Image src={OxIcon} />
                  </Card.Title>
                  <div className="record-text">records of</div>
                  <Card.Text>Oximetry</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg={4} sm={6}>
            <Link
              to={
                process.env.REACT_APP_BASE_URL +
                "/measurement/heart-and-lung-sound"
              }
            >
              <Card>
                <Card.Body>
                  <Card.Title>
                    <Image src={SoundIcon} />
                  </Card.Title>
                  <Card.Text>
                    <div className="record-text">records of</div>
                    <div>Heart Lung Sound</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg={4} sm={6}>
            <Link
              to={
                process.env.REACT_APP_BASE_URL + "/measurement/blood-pressure"
              }
            >
              <Card>
                <Card.Body>
                  <Card.Title>
                    <Image src={BpIcon} />
                  </Card.Title>
                  <div className="record-text">records of</div>
                  <Card.Text>Blood Pressure</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg={4} sm={6}>
            <Link
              to={process.env.REACT_APP_BASE_URL + "/measurement/temperature"}
            >
              <Card>
                <Card.Body>
                  <Card.Title>
                    <Image src={TemeperatureIcon} />
                  </Card.Title>
                  <div className="record-text">records of</div>
                  <Card.Text>Temperature</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Row>
      <Row className="d-flex justify-content-end">
        <Link
          to={process.env.REACT_APP_BASE_URL + "/user-desk"}
          style={ButtonMyDeskStyle}
        >
          <Image
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
