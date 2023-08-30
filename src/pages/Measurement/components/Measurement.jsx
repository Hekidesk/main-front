import { Col, Row, Card } from "react-bootstrap";
import TopPhotoIcon from "@/assets/icon/measurement/doctorPhoto.svg";
import CarIcon from "@/assets/icon/measurement/cardiogramIcon.svg";
import OxIcon from "@/assets/icon/measurement/oximetryIcon.svg";
import SoundIcon from "@/assets/icon/measurement/heartLungSoundIcon.svg";
import TemeperatureIcon from "@/assets/icon/measurement/temeperatureIcon.svg";
import BpIcon from "@/assets/icon/measurement/bloodPressureIcon.svg";
import "@/assets/styles/Measurement.css";
import { Link } from "react-router-dom";

const Measurement = () => {
  return (
    <div>
      <Row>
        <Row>
          <h2 className="title-name">Measurement</h2>
        </Row>
        <Row>
          <img src={TopPhotoIcon} className="top-img" />
        </Row>
        <Row>
          <Col lg={4} sm={6}>
            <Link
              // eslint-disable-next-line no-undef
              to={process.env.REACT_APP_BASE_URL + "/measurement/cardiogram"}
            >
              <Card>
                <Card.Body>
                  <Card.Title>
                    <img src={CarIcon} />
                  </Card.Title>
                  <div className="record-text">records of</div>
                  <Card.Text>Cardiogram</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg={4} sm={6}>
            <Link 
            // eslint-disable-next-line no-undef
            to={process.env.REACT_APP_BASE_URL + "/measurement/oximetry"}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <img src={OxIcon} />
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
                // eslint-disable-next-line no-undef
                process.env.REACT_APP_BASE_URL +
                "/measurement/heart-and-lung-sound"
              }
            >
              <Card>
                <Card.Body>
                  <Card.Title>
                    <img src={SoundIcon} />
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
                // eslint-disable-next-line no-undef
                process.env.REACT_APP_BASE_URL + "/measurement/blood-pressure"
              }
            >
              <Card>
                <Card.Body>
                  <Card.Title>
                    <img src={BpIcon} />
                  </Card.Title>
                  <div className="record-text">records of</div>
                  <Card.Text>Blood Pressure</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg={4} sm={6}>
            <Link
              // eslint-disable-next-line no-undef
              to={process.env.REACT_APP_BASE_URL + "/measurement/temperature"}
            >
              <Card>
                <Card.Body>
                  <Card.Title>
                    <img src={TemeperatureIcon} />
                  </Card.Title>
                  <div className="record-text">records of</div>
                  <Card.Text>Temperature</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Measurement;
