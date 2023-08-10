import React, { useEffect, useState } from "react";
import Profile from "../../Profile/Profile";
import { Col, Row, Pagination } from "react-bootstrap";
import Sidebar from "@/components/Sidebar/Sidebar";
import ProfileSection from "../../Profile/ProfileSection";
import BodyIcon from "@/assets/icon/history/bodyImg.svg";
import upIcon from "@/assets/icon/history/upIcon.svg";
// import timeHistory from "@/assets/icon/history/time-history.svg";
import { ButtonHistoryStyle } from "@/components/reusable/ButtonStyle";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { GetDateTimeDB, convertStringToDateDB } from "@/utilities/time/time";
import { Knob } from "primereact/knob";

const TimeHistoryPage = () => {
  const [data, setData] = useState(null);
  const [parameter, setParameter] = useState({});

  const [heartBeat, setHeartBeat] = useState(0);
  const [temperature, setTemperature] = useState(0);
  //pagination
  const [dates, setDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const { getAll: getAllData } = useIndexedDB("time");

  const types = [
    "Normal",
    "Sinus Tachicardia",
    "Sinus Bradicardia",
    "Premature Atrial Contrature (PAC)",
    "Paroxysmal Atrial Tachycardia (PAT)",
    "Multifocul Atrial Tachycardia (MAT)",
  ];

  useEffect(() => {
    getAllData().then((dataFromDB) => {
      console.log(dataFromDB);
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      console.log(result);
      let dateAndIds = result.map((d) => d.dateAndId);
      const result2 = dateAndIds.map((d) => GetDateTimeDB(String(d)));
      console.log(result2);
      setDates(result2);
      setData(result);
    });
  }, []);

  useEffect(() => {
    console.log(currentDate);
    if (data && data.length) retrieveDate(currentDate);
  }, [data]);

  useEffect(() => {
    console.log(currentDate);
    if (data && data.length) retrieveDate(activeIndex);
  }, [activeIndex]);

  const retrieveDate = (currentDate) => {
    console.log(currentDate);
    setActiveIndex(currentDate);
    const dateAndId = parseInt(
      convertStringToDateDB(dates[currentDate], localStorage.getItem("id"))
    );
    const tempResult = data.filter((temp) => temp.dateAndId === dateAndId);
    console.log("result: " + JSON.stringify(tempResult));
    const result = tempResult[0].parameters;
    setParameter(result);
    setHeartBeat(
      result.heartBeatECG
        ? result.heartBeatECG
        : result.heartBeatPPG
        ? result.heartBeatPPG
        : result.heartBeatSound
        ? result.heartBeatSound
        : 0
    );
    setTemperature(result.temperature ? result.temperature : 0);
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
    currentDate + 1 < dates.length && (activeIndex % 5 == 4 || currentDate != 0)
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
                        Temperature(°C): {parameter.temperature}
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
                        Arrythmia Type: {types[parameter.ArrythmiaType]}
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
                <Col className="bg-gray">
                  <div style={{ fontWeight: "bold" }}> Chart </div>
                  <div style={{ fontSize: "13px" }}> Heart Rate (bpm) </div>
                  <div className="knob-container" style={{ marginTop: "1rem" }}>
                    <Knob
                      value={heartBeat}
                      size={220}
                      valueColor={
                        heartBeat < 60 || heartBeat > 90 ? "red" : "green"
                      }
                      textColor={"black"}
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: "6rem",
                      fontWeight: "bold",
                      marginBottom: "5rem",
                    }}
                  >
                    {" "}
                    {heartBeat === 0 ?  " " : 
                    (heartBeat < 60 || heartBeat > 90)
                      ? "Dangerous"
                      : "Good"}{" "}
                  </div>
                </Col>
                <Col className="bg-gray" style={{marginLeft: "10px"}}>
                  <div>
                    <div style={{ fontWeight: "bold" }}> Chart </div>
                    <div style={{ fontSize: "13px" }}> Temperature (°C) </div>
                    <div
                      className="knob-container"
                      style={{ marginTop: "1rem" }}
                    >
                      <Knob
                        value={temperature}
                        size={220}
                        valueColor={
                          temperature < 30 || temperature > 38 ? "red" : "green"
                        }
                        textColor={"black"}
                      />
                    </div>
                    <div
                      style={{
                        marginLeft: "6rem",
                        fontWeight: "bold",
                        marginBottom: "5rem",
                      }}
                    >
                      {" "}
                      {temperature === 0 ? " " :
                      (temperature < 30 || temperature > 38)
                        ? "Dangerous"
                        : "Good"}{" "}
                    </div>
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
