import React from "react";
import { Row } from "react-bootstrap";
import { TitleContainer } from "./CSS";
import Diagram from "@/components/Datagram/Diagram";

const ForceDiagram = ({ forceChartData, maximumNum }) => {
  return (
    <Row style={{ marginLeft: "-2em" }}>
      <Row style={{ paddingLeft: 0 }}>
        <TitleContainer>Force</TitleContainer>
      </Row>
      <Row id="forceDiagram">
        <Diagram
          data={forceChartData}
          sizeOfSlice={-1}
          maximumNum={maximumNum}
          type="force"
        />
      </Row>
    </Row>
  );
};

export default ForceDiagram;
