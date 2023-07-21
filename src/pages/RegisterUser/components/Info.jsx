import { Text } from "HEKIDESK/components/reusable/Text";
import { Image } from "primereact/image";
import Icon from "HEKIDESK/assets/logo/hekidesk-transparent.svg";
import { ImageWrapper } from "HEKIDESK/components/reusable/ImageWrapper";

const RegisterInfo = () => {
  return (
    <span>
      <br />
      <br />
      <Text>Create new account</Text>
      <ImageWrapper>
        <Image src={Icon} alt="icon" width="100%" />
      </ImageWrapper>
    </span>
  );
};

export default RegisterInfo;
