import React, { useEffect, useState } from "react";
import Profile from "../../Profile/Profile";
import { Col, Row, Pagination } from "react-bootstrap";
import Sidebar from "@/components/Sidebar/Sidebar";
import ProfileSection from "../../Profile/ProfileSection";
import BodyIcon from "@/assets/icon/history/bodyImg.svg";
import upIcon from "@/assets/icon/history/upIcon.svg";
import timeHistory from "@/assets/icon/history/time-history.svg";
import { ButtonHistoryStyle } from "@/components/reusable/ButtonStyle";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { GetDateTimeDB, convertStringToDateDB } from "@/utilities/time/time";

const TimeHistoryPage = () => {
  const [data, setData] = useState(null);
  const [parameter, setParameter] = useState({});

  //pagination
  const [dates, setDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const { getAll: getAllData } = useIndexedDB("time");

  useEffect(() => {
    getAllData().then((dataFromDB) => {
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      let dateAndIds = result.map((d) => d.dateAndId);
      const result2 = dateAndIds.map((d) => GetDateTimeDB(String(d)));
      setDates(result2);
      setData(result);
    });
  }, []);

  useEffect(() => {
    if (data && data.length) retrieveDate(currentDate);
  }, [data]);

  const retrieveDate = (currentDate) => {
    setActiveIndex(currentDate);
    const dateAndId = parseInt(
      convertStringToDateDB(dates[currentDate], localStorage.getItem("id"))
    );
    const result = data.filter((temp) => temp.dateAndId === dateAndId);
    setParameter(result[0].parameters);
  };

  const decCurrentUser = () => {
    currentDate - 1 >= 0
      ? setCurrentDate(currentDate - 1)
      : setCurrentDate(currentDate);

    activeIndex - 1 >= 0
      ? setActiveIndex(activeIndex - 1)
      : setActiveIndex(activeIndex);
  };

  const incCurrentUser = () => {
    currentDate + 1 < dates.length && activeIndex % 5 == 4
      ? setCurrentDate(currentDate + 1)
      : setCurrentDate(currentDate);

    activeIndex + 1 < dates.length
      ? setActiveIndex(activeIndex + 1)
      : setActiveIndex(activeIndex);
  };

  const firstDate = () => {
    setActiveIndex(0);
    setCurrentDate(0);
  };

  const lastDate = () => {
    setActiveIndex(dates.length - 1);
    setCurrentDate(dates.length - 5);
  };

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
                <img src={BodyIcon} alt="body" className="cropped-img" />
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
                    onClick={() => firstDate()}
                  ></Pagination.First>
                  <Pagination.Prev
                    onClick={() => decCurrentUser()}
                  ></Pagination.Prev>
                  {[...Array(5)].map((currElement, index) => (
                    <Pagination.Item
                      key={currElement}
                      onClick={() => retrieveDate(currentDate + index)}
                      active={activeIndex === currentDate + index}
                    >
                      <div style={{ height: "20px" }}>
                        {dates[currentDate + index]}
                      </div>
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => incCurrentUser()}
                  ></Pagination.Next>
                  <Pagination.Last onClick={() => lastDate()}></Pagination.Last>
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
                      Rates:
                    </Row>
                    <Row>
                      <Col
                        style={{
                          fontWeight: parameter.heartBeatECG ? "bold" : "",
                        }}
                      >
                        Heart Rate ECG (bpm): {parameter.heartBeatECG}
                      </Col>
                      <Col
                        style={{
                          fontWeight: parameter.heartBeatPPG ? "bold" : "",
                        }}
                      >
                        Heart Rate PPG (bpm): {parameter.heartBeatPPG}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        style={{
                          fontWeight: parameter.PR_RR_Interval ? "bold" : "",
                        }}
                      >
                        PR/RR Interval (msec): {parameter.PR_RR_Interval}
                      </Col>
                      <Col
                        style={{
                          fontWeight: parameter.QRS_Duration ? "bold" : "",
                        }}
                      >
                        QRS Duration (msec): {parameter.QRS_Duration}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        style={{ fontWeight: parameter.hrvVal ? "bold" : "" }}
                      >
                        HR Variation: {parameter.hrvVal}
                      </Col>
                      <Col style={{ fontWeight: parameter.SPO2 ? "bold" : "" }}>
                        SpO2 (%): {parameter.SPO2}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        style={{
                          fontWeight: parameter.temperature ? "bold" : "",
                        }}
                      >
                        Temperature(C): {parameter.temperature}
                      </Col>
                      <Col style={{ fontWeight: parameter.SYS ? "bold" : "" }}>
                        SYS/DIA(mmHg): {parameter.SYS}{" "}
                        {parameter.SYS ? "/" : ""} {parameter.DIA}
                      </Col>
                    </Row>
                    <Row>
                      <Col>Lung Abnormality:</Col>
                      <Col
                        style={{
                          fontWeight: parameter.ArrythmiaType ? "bold" : "",
                        }}
                      >
                        Arrythmia Type: {parameter.ArrythmiaType}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        style={{
                          fontWeight: parameter.heartBeatSound ? "bold" : "",
                        }}
                      >
                        Heart Rate sound (bpm): {parameter.heartBeatSound}{" "}
                      </Col>
                      <Col>Heart Abnormality:</Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <img src={timeHistory} />
                  </div>
                </Col>
                <Col>
                  <div>
                    <img src={timeHistory} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="d-flex justify-content-end">
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/history"}
          style={ButtonHistoryStyle}
        >
          <img
            src={upIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 0.2em" }}
          />
          Up
        </Link>
      </Row>
    </div>
  );
};

export default TimeHistoryPage;
