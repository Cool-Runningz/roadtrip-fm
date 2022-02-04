import { Link } from "remix";
import carImg from "../images/car.svg";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <Link to="/find-stations">Find Stations</Link><br />
      <img
          style={{width: "50%"}}
          src={carImg}
          alt=""
      />
    </div>
  );
}
