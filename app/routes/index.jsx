import { Link } from "remix";
import carImg from "../images/car.svg";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <img
          style={{width: "50%"}}
          src={carImg}
          alt=""
      />
        <Link to="/find-stations">Find Stations</Link><br />
    </div>
  );
}
