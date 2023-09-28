import fullCharge from "@/assets/icon/battery/fullCharge.svg";
import semiFullCharge from "@/assets/icon/battery/semiFullCharge.svg";
import halfCharge from "@/assets/icon/battery/halfCharge.svg";
import semiHalfCharge from "@/assets/icon/battery/semiHalfCharge.svg";
import lowCharge from "@/assets/icon/battery/lowCharge.svg";
 

export default function BatteryCharge({ charge }) {
  const BatteryImg = charge > 80 ? fullCharge : 
                      charge > 60 ? semiFullCharge :
                      charge > 40 ? halfCharge :
                      charge > 20 ? semiHalfCharge :
                      lowCharge ;
  return (
    <img src={BatteryImg} alt="My Image" />
  );
}
