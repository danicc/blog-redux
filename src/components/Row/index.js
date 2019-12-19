import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

function Row({ dataFirst, dataSecond, dataThird, actionLink, handleAction }) {
  return (
    <tr>
      <td className="cell">{dataFirst}</td>
      <td className="cell">{dataSecond}</td>
      <td className="cell">{dataThird}</td>
      <td className="cell">
        <Link to={actionLink} onClick={handleAction}>
          <div className="eye-solid icon"></div>
        </Link>
      </td>
    </tr>
  );
}

export default Row;
