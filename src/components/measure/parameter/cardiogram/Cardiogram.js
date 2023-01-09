import React, { useContext, useEffect, useState, useRef } from "react";
import { Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DeviceContext, UserContext } from "../../../../App";
import Diagram from "../../../Diagram/Diagram";
import { useIndexedDB } from "react-indexed-db";
import { shareData } from "../../share/Share";

function Cardiogram() {
  const bluetooth = useContext(DeviceContext);

  const UserInfo = useContext(UserContext);
  const { add } = useIndexedDB("cardiogramData");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    ppg: [],
    ecg: [...new Array(200).fill(0)],
    force: [],
  });
  const timer1 = useRef(null);
  const timer2 = useRef(null);

  const [heartBeat, setHeartBeat] = useState(67);
  const [show, setShow] = useState(false);

  const [startSecond, setStart] = useState();
  const [active, setActive] = useState(null);

  const ecgs = [...new Array(200).fill(0)];

  useEffect(() => {
    bluetooth.sendCommand(0x02, hanldeCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bluetooth]);
  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (active === false) stopInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const addToDB = (heartBeat) => {
    const date = new Date();
    const showTime =
      date.getFullYear() +
      " " +
      date.getMonth() +
      " " +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    add({
      userId: UserInfo.id,
      ecgData: ecgs,
      date: showTime,
      heartBeat: heartBeat,
      PRRRInterval: 0,
      QRSDuration: 0,
    }).then(
      (event) => {
        console.log("cardiogramData added: ", event);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const hanldeCallback = ({ ppg, ecg, force }) => {
    ecgs.push(ecg);
    if (ecgs.length > 400) {
      setData({ ecg: ecgs.slice(400) });
    }
    if ([398, 399, 400, 401, 402, 403, 404].includes(ecgs.length)) {
      setActive(true);
      if (!timer1.current)
        timer1.current = setTimeout(() => {
          setActive(false);
        }, 12000);
    }
  };

  const startInput = () => {
    bluetooth.start();
    setStart(performance.now());
  };

  const stopInput = () => {
    bluetooth.stop();
    const duration = performance.now() - startSecond;
    console.log(data.ecg, duration);
    // eslint-disable-next-line no-undef
    const heartBeat = HeartBeat_ECG(
      data.ecg.slice(300, 1200),
      // Math.round(duration / 1000)
      60
    );
    console.log(heartBeat);
    console.log("duration: ", duration / 1000);
    setHeartBeat(heartBeat);
    addToDB(heartBeat);
  };

  const autoStart = () => {
    setLoading(true);
    startInput();
    timer2.current = setTimeout(() => {
      closeModal();
      setLoading(false);
    }, 4000);
  };

  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  return (
    <div className="measure-section">
      <br />
      <br />
      <h2 className="measure-title">Cardiogram</h2>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col sm={8}>
          <h5 className="measure-title">
            Please put your right and left fingers on ECG sensors and then press
          </h5>
        </Col>
        <Col sm={2}>
          <Button onClick={openModal}>Start</Button>
        </Col>
      </Row>
      <Row>
        <Diagram
          dataKey={"ecg"}
          flow={
            FakeData.length > 200
              ? active
                ? FakeData.slice(FakeData.length - 200, FakeData.length)
                : FakeData
              : [new Array(200).fill(0)]
          }
        />
      </Row>
      <Row className="measure-button-row">
        <Col>
          <h5 style={{ color: "black" }}>
            Heartbeat: {Number(heartBeat).toFixed(2)} (bpm)
          </h5>
        </Col>
      </Row>
      <Row className="measure-button-row">
        <Col>
          <Link to="/Measure/Measurement">
            <Button> Back</Button>
          </Link>
        </Col>
        <Col>
          <Button>Abnormality Detection</Button>
        </Col>
        <Col>
          <Button onClick={() => shareData("Heart beat: " + heartBeat)}>
            output
          </Button>
        </Col>
        <Col>
          <Link to="/">
            <Button>Save</Button>
          </Link>
        </Col>
      </Row>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>How to start recording...</Modal.Title>
        </Modal.Header>
        {loading ? (
          <Modal.Body style={{ display: "flex", alignItems: "center" }}>
            Please Hold your finger until plotting starts!{" "}
            <Spinner animation="border" />
          </Modal.Body>
        ) : (
          <Modal.Body>
            Put your hand on the device, after calibration it start its process
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={autoStart}>
            Let`s go!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cardiogram;

const FakeData = [
  -638, -689, -610, -677, -835, -780, -700, -622, -298, -981, -679, -850, -609,
  -262, -572, -547, -506, -598, -532, -288, -664, 112, -253, -37, -277, -139,
  -255, -273, -409, -348, -541, -313, -133, -353, -226, -265, -986, -1111,
  -1060, -743, -357, -963, -1090, -1626, -1672, -1785, -1613, -1428, -1522,
  -1449, -1423, -1630, -1413, -1620, -1745, -1823, -1899, -1950, -1329, -1193,
  -1336, -1020, -1103, -911, -1052, -1066, -604, -603, -805, -832, -703, -600,
  -746, -785, -545, -679, -96, -1153, -560, -682, -750, -679, -651, -595, -440,
  -479, -806, -625, -108, -393, -716, -597, -350, -672, -617, -656, 165, 107,
  162, 149, -24, -8, -101, -87, -30, -83, 24, -52, 122, 65, 190, -705, -572,
  -55, -675, -680, -600, -300, -1229, -1276, -1374, -1330, -1211, -1087, -996,
  -1124, -1509, -1527, -1695, -1773, -1755, -1757, -1653, -1167, -1263, -1075,
  -1239, -1175, -1412, -1435, -1313, -963, -990, -968, -830, -876, -758, -690,
  -754, -762, -827, -843, -252, -1124, -766, -906, -826, -821, -673, -716, -942,
  -724, -612, -650, -496, -857, -828, -936, -920, -794, -724, -204, -133, -201,
  -411, -286, -246, -192, -112, -190, -122, -200, -154, 103, -135, 18, -648,
  -460, -609, -605, -435, -250, -666, -754, -1204, -1247, -1284, -1074, -1430,
  -1239, -1007, -962, -1447, -1619, -1522, -1609, -1825, -1874, -1445, -1499,
  -1438, -1384, -1361, -1183, -1443, -1463, -889, -851, -1076, -900, -744, -867,
  -697, -815, -854, -962, -835, -939, -592, -217, -1176, -815, -654, -788, -710,
  -903, -813, -723, -768, -608, -694, -646, -845, -919, -921, -878, -162, -502,
  -601, -339, -245, -266, -441, -213, -97, -70, -29, 160, 111, 135, 143, -636,
  -508, -637, -481, -408, -10, -133, -754, -1274, -1270, -1183, -1309, -929,
  -1047, -1169, -1592, -1475, -1557, -1551, -1689, -1644, -1539, -1717, -1322,
  -1277, -1327, -1509, -1285, -1339, -1321, -795, -771, -741, -729, -800, -928,
  -855, -737, -650, -645, -849, -841, -256, -1176, -855, -767, -818, -753, -854,
  -770, -758, -865, -723, -691, -543, -669, -717, -961, -820, -1078, -838, -250,
  -350, -199, -200, -501, -404, -372, -346, 107, 115, -4, 119, 244, 53, 303,
  -492, -415, 119, -967, -427, -319, -360, -262, -1030, -995, -782, -899, -866,
  -853, -800, -1524, -1617, -1699, -1677, -1725, -1661, -1669, -1448, -1165,
  -1264, -1258, -1274, -1387, -1337, -1358, -507, -678, -884, -715, -919, -632,
  -296, -1073, -615, -862, -687, -733, -695, -673, -446, -589, -492, -645, -664,
  -741, -773, -781, -692, -642, -801, -679, -749, -613, -713, -645, -629, -161,
  -143, -105, -157, -328, -317, -438, -162, 603, -324, 161, 45, 147, 187, 240,
  -213, -458, -187, -81, -88, -4, -323, -222, -1010, -966, -997, -946, -852,
  -913, -801, -1574, -1537, -1426, -1332, -1493, -1518, -1277, -1361, -1496,
  -1296, -1220, -1220, -1005, -1776, -1536, -809, -693, -867, -822, -637, -762,
  -784, -876, -793, -509, -671, -757, -871, -819, -909, -920, -949, -705, -735,
  -848, -802, -643, -691, -680, -567, -435, -692, -669, -669, -802, -436, 242,
  -800, -323, -458, -534, -477, -482, -370, -82, 290, 285, 141, 287, 143, -51,
  -645, -441, -395, -344, -196, -287, 40, -163, -927, -831, -991, -975, -874,
  -782, -777, -1399, -1670, -1477, -1482, -1419, -754, -1666, -1493, -1321,
  -1494, -1435, -1427, -1313, -1475, -1529, -1313, -767, -831, -729, -1081,
  -1076, -1103, -1088, -532, -584, -713, -724, -724, -777, -779, -769, -639,
  -624, -802, -870, -659, -674, -723, -719, -665, -799, -491, -328, -1175, -640,
  -721, -405, -236, -494, -505, -306, -434, -307, -398, 261, 88, 13, -99, 38,
  -160, -20, -475, -249, -251, -222, -248, -93, -18, -161, -612, -822, -850,
  -837, -726, -720, -548, -242, -1922, -1455, -1238, -1406, -1362, -1246, -1196,
  -1324, -1442, -1305, -1335, -1455, -1538, -1579, -1724, -1035, -1104, -1060,
  -1030, -975, -1151, -914, -1086, -849, -822, -591, -856, -820, -896, -830,
  -673, -733, -759, -548, -314, -1222, -844, -732, -682, -750, -647, -908, -495,
  -627, -598, -302, -386, -479, -561, -775, -616, -645, -670, -12, 143, 146,
  -69, 0, 126, -34, 17, -181, -70, -97, -6, 65, -93, -53, -134, -945, -733,
  -606, -666, -538, -745, -1333, -1230, -1460, -1184, -1188, -1252, -1241,
  -1134, -1603, -1563, -1498, -1677, -1636, -1716, -1559, -1020, -856, -999,
  -906, -1041, -1040, -931, -1156, -581, -881, -817, -842, -641, -119, -1090,
  -635, -793, -534, -515, -458, -564, -404, -560, -620, -537, -662, -553, -623,
  -563, -761, -680, -477, -433, -542, -469, -491, -650, -470, -534, -19, 89,
  -54, 188, -86, -163, -70, -40, -15, 415, -339, -112, 14, 11, 216, -532, -473,
  -408, -256, -446, -356, -332, -1096, -1050, -1001, -1091, -1041, -970, -1051,
  -1478, -1319, -1413, -1199, -1264, -1542, -1159, -1357, -875, -769, -727,
  -852, -906, -762, -531, -609, -851, -621, -770, -684, -504, -724, -816, -531,
  -562, -584, -632, -548, -689, -731, -599, -666, -713, -699, -833, -652, -619,
  -485, -690, -611, -474, -622, -518, -644, -494, 71, 19, -103, 107, 383, -526,
  -126, -91, 77, -87, 27, 72, 6, 53, 40, 99, -466, -522, -719, -706, -615, -666,
  -604, -1242, -1183, -1094, -1144, -997, -1223, -924, -1478, -1522, -1486,
  -1485, -1475, -1537, -1494, -1209, -549, -1563, -1153, -989, -1011, -925,
  -1010, -669, -620, -744, -500, -775, -484, -530, -753, -327, -545, -729, -484,
  -467, -465, -368, -429, -376, -531, -246, -331, -241, -226, -434, -331, -267,
  191, -457, -391, -356, -391, -562, 250, 255, 206, 232, 389, 365, 147, 92, 340,
  225, 193, 317, 269, 293, -295, -372, -452, -174, -270, -294, -193, -143, -919,
  -976, -948, -836, -444, -1512, -982, -1095, -1398, -1440, -1401, -1689, -1452,
  -1358, -1184, -1208, -767, -1106, -983, -1165, -1398, -1191,
];
