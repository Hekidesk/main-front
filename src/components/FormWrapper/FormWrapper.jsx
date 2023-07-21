import { Button } from "primereact/button";
import BackIcon from "HEKIDESK/assets/icon/back.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { FormSection, InfoSection, Wrapper } from "./CSS";
import Particle from "../PageWrapper/Particle";

const FormWrapper = ({ children1 = null, children2 = null }) => {
  const history = useNavigate();
  const location = useLocation();
  return (
    <Wrapper>
      <Particle />
      <InfoSection>
        {location.pathname !== "/" && (
          <Button
            rounded
            text
            style={{ position: "absolute", top: "10px", left: "10px" }}
            onClick={() => history(-1)}
          >
            <img src={BackIcon} alt="back" width={"10px"} />
          </Button>
        )}
        {children1}
      </InfoSection>
      <FormSection>{children2}</FormSection>
    </Wrapper>
  );
};

export default FormWrapper;
