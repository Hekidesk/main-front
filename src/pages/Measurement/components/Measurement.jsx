import { Col, Row, Card, Image } from "react-bootstrap";
import TopPhotoIcon from "@/assets/icon/doctor_photo.svg";
import CarIcon from "@/assets/icon/cardiogram_icon.svg";
import OxIcon from "@/assets/icon/oximetry_icon.svg";
import SoundIcon from "@/assets/icon/heart_lung_sound_icon.svg";
import TemeperatureIcon from "@/assets/icon/temeperature_icon.svg";
import BpIcon from "@/assets/icon/blood_pressure_icon.svg";
import "@/assets/styles/Measurement.css";

const Measurement = () => {
  return (
    <Row>
      <Row>
        <h2 className="title-name">Measurement</h2>
      </Row>
      <Row>
        <Image src={TopPhotoIcon} className="top-img" />
      </Row>
      <Row>
        <Col lg={4} sm={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Image src={CarIcon} />
              </Card.Title>
              <div className="record-text">records of</div>
              <Card.Text>Cardiogram</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} sm={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Image src={OxIcon} />
              </Card.Title>
              <div className="record-text">records of</div>
              <Card.Text>Oximetry</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} sm={6}>
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
        </Col>
        <Col lg={4} sm={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Image src={BpIcon} />
              </Card.Title>
              <div className="record-text">records of</div>
              <Card.Text>Blood Pressure</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} sm={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Image src={TemeperatureIcon} />
              </Card.Title>
              <div className="record-text">records of</div>
              <Card.Text>Temperature</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Row>
  );
};

export default Measurement;
