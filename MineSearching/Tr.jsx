import React from "react";
import { hot } from "react-hot-loader";
import Td from "./Td";

const Tr = ({ rowIndex, rowData }) => {
  return (
    <tr>
      {rowData.map((data, i) => {
        return <Td key={i} rowIndex={rowIndex} cellIndex={i} />;
      })}
    </tr>
  );
};

export default hot(module)(Tr);
