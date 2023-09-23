import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";

const DropdownButton = styled.div`
  display: inline-block;
  align-items: center;
  text-align: center;
  margin-left: 15px;


`;

export const SampleTimeDropDown = ({ sampleTime, setSampleTime }) => {
  return (
    <DropdownButton>
      <Dropdown
        value={sampleTime}
        className="time-dropdown"
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
