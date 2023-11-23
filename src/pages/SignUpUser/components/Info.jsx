import { Text } from "@/components/reusable/Text";
import { Image } from "primereact/image";
import Icon from "@/assets/logo/hekidesk-transparent.svg";
import { ImageWrapper } from "@/components/reusable/ImageWrapper";

const SignUpInfo = () => {
  return (
    <span>
      <br />
      <br />
      <Text>Create new user</Text>
      <ImageWrapper>
        <Image src={Icon} alt="icon" width="100%" />
      </ImageWrapper>
    </span>
  );
};

export default SignUpInfo;
