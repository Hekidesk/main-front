import { Col, Row, Card, Image } from "react-bootstrap";
import TopPhotoIcon from "@/assets/icon/doctorPhoto.svg";
import CarIcon from "@/assets/icon/cardiogramIcon.svg";
import OxIcon from "@/assets/icon/oximetryIcon.svg";
import SoundIcon from "@/assets/icon/heartLungSoundIcon.svg";
import TemeperatureIcon from "@/assets/icon/temeperatureIcon.svg";
import BpIcon from "@/assets/icon/bloodPressureIcon.svg";
import "@/assets/styles/Measurement.css";
import { Link } from "react-router-dom";
import {ButtonMyDeskStyle} from "@/components/reusable/ButtonStyle";
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
            <Link to="/demo">
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
          <Link to="/demo">
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
          <Link to="/demo">
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
          <Link to="/demo">
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
          <Link to="/demo">
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
        <Link to="/user-desk" style={ButtonMyDeskStyle}>
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
