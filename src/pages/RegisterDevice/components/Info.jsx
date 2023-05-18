import { Text } from "@/components/reusable/Text";
import { Image } from "primereact/image";
import Icon from "@/assets/svg/hekidesk-transparent.svg";
import { SNBox, SubText } from "./CSS";
import { ImageWrapper } from "@/components/reusable/ImageWrapper";

const RegisterInfo = () => {
  return (
    <span>
      <br />
      <br />
      <br />
      <Text>Register your device</Text>
      <SubText>
        <SNBox>SN</SNBox> Please enter your serial number
      </SubText>
      <ImageWrapper>
        <Image src={Icon} alt="icon" width="100%" />
      </ImageWrapper>
    </span>
  );
};

export default RegisterInfo;
