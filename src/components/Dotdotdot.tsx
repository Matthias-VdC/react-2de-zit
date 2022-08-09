import { useState } from "react";
import Hide from "../assets/Hide";
import Report from "../assets/Report";

export default function Dotdotdot() {
  const [click, setClick] = useState("hidden");
  return (
    <div
      onMouseLeave={() => {
        setClick("hidden");
      }}
      onClick={() => {
        if (click === "hidden") {
          setClick("visible");
        } else if (click === "visible") {
          setClick("hidden");
        }
      }}
    >
      <p className="dotdotdot">•••</p>
      <div className={"dotdotdot-dropdown " + click}>
        <div
          className="dotdotdot-dropdown-section"
          onClick={(e) => {
            // @ts-ignore: Unreachable code error
            e.currentTarget.parentNode.parentNode.parentNode.parentNode.style.display =
              "none";
          }}
        >
          <Hide />
          <p>Hide</p>
        </div>
        <div className="dotdotdot-dropdown-section">
          <Report />
          <p>Report</p>
        </div>
      </div>
    </div>
  );
}
