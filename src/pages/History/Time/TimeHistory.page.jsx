import React, { useEffect, useState } from "react";
import Profile from "../../Profile/Profile";
import { Col, Row, Pagination } from "react-bootstrap";
import Sidebar from "@/components/Sidebar/Sidebar";
import ProfileSection from "../../Profile/ProfileSection";
import { useIndexedDB } from "react-indexed-db";
import { GetDateTimeDB, convertStringToDateDB } from "@/utilities/time/time";
import { Knob } from "primereact/knob";

const TimeHistoryPage = () => {
  const [data, setData] = useState(null);
  const [parameter, setParameter] = useState();

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

  const types2 = [
    "َّAF",
    "Normal",
  ];

  useEffect(() => {
    getAllData().then((dataFromDB) => {
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      let dateAndIds = result.map((d) => d.dateAndId);
      const tempResult = dateAndIds.map((d) => GetDateTimeDB(String(d)));
      setDates(tempResult);
      setData(result);
    });
  }, []);

  useEffect(() => {
    if (data && data.length) retrieveDate(currentDate);
  }, [data]);

  useEffect(() => {
    if (data && data.length) retrieveDate(activeIndex);
  }, [activeIndex]);

  const retrieveDate = (currentDate) => {
    setActiveIndex(currentDate);
    const dateAndId = parseInt(
      convertStringToDateDB(dates[currentDate], localStorage.getItem("id"))
    );
    const tempResult = data.filter((temp) => temp.dateAndId === dateAndId);
    const result = tempResult[0].parameters;
    setParameter([
      {text: "Heart Rate ECG (bpm):" , value: result.heartBeatECG}, 
      {text: "Heart Rate PPG (bpm):" , value: result.heartBeatPPG}, 
      {text: "PR/RR Interval (msec):" , value: result.PR_RR_Interval}, 
      {text: "QRS Duration (msec):" , value: result.QRS_Duration}, 
      {text: "HR Variation:" , value: result.hrvVal}, 
      {text: "SpO2 (%):" , value: result.SPO2}, 
      {text: "Temperature(°C):" , value: result.temperature}, 
      {text: "SYS/DIA(mmHg):", value: result.SYS ? result.SYS + "/" + result.DIA : null }, 
      {text: "Arrythmia Type:", value: types[result.ArrythmiaType]}, 
      {text: "Heart Rate sound (bpm):", value: result.heartBeatSound}, 
      {text: "Respiration Rate:", value: result.respirationRate}, 
    ]);
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
              {/* <Row>
                <img src={BodyIcon} alt="body" className="cropped-img" />
              </Row> */}
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
                      {parameter && parameter.map((p, i) => {
                        return(
                          <Col
                            style={{
                              fontWeight: p.value ? "bold" : "",
                            }}
                            md = {6}
                            key={i}
                          >
                            {p.text} {p.value ? p.value : ""}
                          </Col>
                        )
                      })}
                    </Row>              
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="bg-gray">
                  <div style={{ fontWeight: "bold" }}> Heart Rate </div>
                  <div style={{ fontSize: "13px" }}> (bpm) </div>
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
                    <div style={{ fontWeight: "bold" }}> Temperature </div>
                    <div style={{ fontSize: "13px" }}> (°C) </div>
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
    </div>
  );
};

export default TimeHistoryPage;
