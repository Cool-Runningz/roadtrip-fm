import { Link } from "remix";
import carImg from "~/images/car.svg";

export default function Index() {
  return (
    <div>
      <img
        style={{ width: "50%" }}
        src={carImg}
        alt=""
      />
      <Link to="/find-stations">Let's Begin!</Link><br />
    </div>
  );
}
