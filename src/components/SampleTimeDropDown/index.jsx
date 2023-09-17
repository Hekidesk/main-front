import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 15px;
`;

export const SampleTimeDropDown = ({ sampleTime, setSampleTime }) => {
  return (
    <DropdownButton>
      <Dropdown
        style={{ width: "100%" }}
        value={sampleTime}
        className="filter-btn"
        onChange={(e) => setSampleTime(e.value)}
        options={[
          { name: "10s ↓", value: 10 },
          { name: "20s ↓", value: 20 },
          { name: "30s ↓", value: 30 },
        ]}
        optionLabel="name"
        placeholder={"sample time  ↓"}
      />
    </DropdownButton>
  );
};
