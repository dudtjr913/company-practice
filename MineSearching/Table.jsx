import React from "react";
import { hot } from "react-hot-loader";
import Tr from "./Tr";

const Table = ({ tableData }) => {
  return (
    <table className="table">
      <tbody>
        {tableData.map((data, i) => {
          return <Tr key={i} rowIndex={i} rowData={data} />;
        })}
      </tbody>
    </table>
  );
};

export default hot(module)(Table);
