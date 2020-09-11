import React, { useCallback, useContext } from "react";
import { hot } from "react-hot-loader";
import {
  TableContext,
  CODE,
  OPEN_CELL,
  MINECELL_CLICK,
  RIGHT_1,
  RIGHT_2,
  RIGHT_3,
} from "./Mine";

const Td = ({ cellIndex, rowIndex }) => {
  const { dispatch, tableData, stop } = useContext(TableContext);
  const tdStyle = useCallback(
    (code) => {
      switch (code) {
        case CODE.MINE:
        case CODE.NORMAL:
          return { backgroundColor: "#444" };
        case CODE.OPENED:
          return { backgroundColor: "white" };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          return { backgroundColor: "yellow" };
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          return { backgroundColor: "green" };
        case CODE.MINE_CLICKED:
          return { backgroundColor: "red" };
      }
    },
    [tableData[rowIndex][cellIndex]]
  );

  const tdText = useCallback(
    (code) => {
      switch (code) {
        case CODE.NORMAL:
          return "";
        case CODE.MINE:
          return "X";
        case CODE.OPENED:
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
        case CODE.FLAG:
        case CODE.FLAG_MINE:
        case CODE.MINE_CLICKED:
          return "";
      }
    },
    [tableData[rowIndex][cellIndex]]
  );

  const handleOnClick = useCallback(() => {
    if (stop) {
      return;
    }
    if (
      tableData[rowIndex][cellIndex] === CODE.OPENED &&
      tableData[rowIndex][cellIndex] === CODE.MINE_CLICKED &&
      tableData[rowIndex][cellIndex] === CODE.QUESTION &&
      tableData[rowIndex][cellIndex] === CODE.QUESTION_MINE &&
      tableData[rowIndex][cellIndex] === CODE.FLAG &&
      tableData[rowIndex][cellIndex] === CODE.FLAG_MINE
    ) {
      return;
    }
    if (tableData[rowIndex][cellIndex] === CODE.NORMAL) {
      dispatch({
        type: OPEN_CELL,
        row: rowIndex,
        cell: cellIndex,
      });
    }
    if (tableData[rowIndex][cellIndex] === CODE.MINE) {
      dispatch({
        type: MINECELL_CLICK,
        row: rowIndex,
        cell: cellIndex,
      });
    }
  }, [tableData[rowIndex][cellIndex], stop]);

  const mouseOnRightClick = useCallback(
    (e) => {
      e.preventDefault();
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          return dispatch({
            type: RIGHT_1,
            row: rowIndex,
            cell: cellIndex,
          });
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          return dispatch({
            type: RIGHT_2,
            row: rowIndex,
            cell: cellIndex,
          });
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          return dispatch({
            type: RIGHT_3,
            row: rowIndex,
            cell: cellIndex,
          });
      }
    },
    [tableData[rowIndex][cellIndex], stop]
  );
  return (
    <td
      className="td"
      onContextMenu={mouseOnRightClick}
      style={tdStyle(tableData[rowIndex][cellIndex])}
      onClick={handleOnClick}
    >
      {tdText(tableData[rowIndex][cellIndex])}
    </td>
  );
};

export default hot(module)(Td);
