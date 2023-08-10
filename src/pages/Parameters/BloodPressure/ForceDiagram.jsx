import React from "react";
import { Row, Col } from "react-bootstrap";
import { TitleContainer } from "./components/CSS";
import Diagram from "@/components/Datagram/Diagram";

const ForceDiagram = ({forceChartData, maximumNum}) => {
  return (
    <div>
      <Row
        style={{
          backgroundColor: "#A5C2CB",
          width: "100%",
          marginLeft: "0.1px",
        }}
      >
        <Col>
          <TitleContainer>
            Force
          </TitleContainer>
        </Col>
      </Row>
      <Row id = "forceDiagram">
        <Diagram data={forceChartData} sizeOfSlice={-1} maximumNum = {maximumNum} type = "force" />
      </Row>
    </div>
  );
};

export default ForceDiagram;
