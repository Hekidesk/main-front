import React from "react";
import Profile from "../../Profile/Profile";
import { Col, Row, Image, Pagination } from "react-bootstrap";
import Sidebar from "../../Sidebar/Sidebar";
import ProfileSection from "../../Profile/ProfileSection";
import body from "../../../assets/icon/history/body_img.svg";
// import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
// import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

const TimeHistoryPage = () => {
  return (
    <div className="box">
      <Profile />
      <Row>
        <Col className="sidebar" md={1}>
          <Sidebar />
        </Col>
        <Col md={7} lg={9}>
          <Row>
            <h2 className="title-name">Time History</h2>
          </Row>
          <Row>
            <Col md={3} style={{ marginRight: "20px" }}>
              <Row>
                <ProfileSection />
              </Row>
              <Row>
                <Image src={body} alt="body" className="cropped-image" />
              </Row>
              <Row
                style={{
                  backgroundColor: "#E8F0F4",
                  paddingTop: "20px",
                  paddingLeft: "10px",
                }}
              >
                <Pagination style={{ display: "inline-block" }}>
                  <Pagination.First
                  // onClick={() => setCurrentDate(0)}
                  >
                    {/* <FaAngleDoubleUp /> */}
                  </Pagination.First>
                  <Pagination.Prev
                  // onClick={() =>
                  //   currentDate - 1 >= 0
                  //     ? setCurrentDate(currentDate - 1)
                  //     : setCurrentDate(currentDate)
                  // }
                  >
                    {/* <AiFillCaretUp /> */}
                  </Pagination.Prev>
                  <Pagination.Item
                  //   key={currElement}
                  //   onClick={() => retrieveDate(currentDate + index)}
                  //   active={activeIndex === currentDate + index}
                  >
                    2011/5/11
                  </Pagination.Item>
                  <Pagination.Next
                  // onClick={() => {
                  //   currentDate + 1 < dates.length
                  //     ? setCurrentDate(currentDate + 1)
                  //     : setCurrentDate(currentDate);
                  // }}
                  >
                    {/* <AiFillCaretDown /> */}
                  </Pagination.Next>
                  <Pagination.Last
                  // onClick={() => setCurrentDate(dates.length - 1)}
                  >
                    {/* <FaAngleDoubleDown /> */}
                  </Pagination.Last>
                </Pagination>
              </Row>
            </Col>
            <Col md={8}>
              <Row>
                <Col>
                  <div
                    className="bg-gray rate-box"
                    style={{ marginBottom: "20px" }}
                  >
                    <Row style={{ fontSize: "30", fontWeight: "600" }}>
                      Rates
                    </Row>
                    <Row>
                      <Col>Heart Rate ECG (bpm): </Col>
                      <Col>Heart Rate PPG (bpm): </Col>
                    </Row>
                    <Row>
                      <Col>PR/RR Interval (msec):</Col>
                      <Col>QRS Duration (msec):</Col>
                    </Row>
                    <Row>
                      <Col>HR Variation:</Col>
                      <Col>SpO2 (%):</Col>
                    </Row>
                    <Row>
                      <Col>Temperature(C):</Col>
                      <Col>Sys/DIA(mmHg):</Col>
                    </Row>
                    <Row>
                      <Col>Lung Abnormality:</Col>
                      <Col>Arrythmia Type:</Col>
                    </Row>
                    <Row>
                      <Col>Heart Rate sound (bpm): </Col>
                      <Col>Heart Abnormality:</Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="bg-gray"></div>
                </Col>
                <Col>
                  <div className="bg-gray"></div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TimeHistoryPage;
