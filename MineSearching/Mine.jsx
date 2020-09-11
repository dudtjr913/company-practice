import React, { createContext, useReducer, useMemo } from "react";
import { hot } from "react-hot-loader";
import Table from "./Table";
import Form from "./Form";
import "./Mine.css";

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  FLAG: -2,
  QUESTION: -3,
  FLAG_MINE: -4,
  QUESTION_MINE: -5,
  MINE_CLICKED: -6,
  OPENED: 0,
};

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
  stop: false,
});

const initialState = {
  tableData: [],
  value: {
    row: "",
    cell: "",
    mine: "",
  },
  stop: false,
  result: "",
};

const createTable = (row, cell, mine) => {
  const candidates = Array(row * cell)
    .fill()
    .map((value, i) => {
      return i;
    });
  const data = [];
  for (let i = 0; i < row; i++) {
    const cellData = [];
    data.push(cellData);
    for (let j = 0; j < cell; j++) {
      cellData.push(CODE.NORMAL);
    }
  }
  while (candidates.length > row * cell - mine) {
    const mineData = candidates.splice(
      Math.floor(Math.random() * candidates.length),
      1
    )[0];
    const mineRow = Math.floor(mineData / row);
    const mineCell = mineData % cell;
    data[mineRow][mineCell] = CODE.MINE;
  }
  return data;
};

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const MINECELL_CLICK = "MINECELL_CLICK";
export const RIGHT_1 = "RIGHT_1";
export const RIGHT_2 = "RIGHT_2";
export const RIGHT_3 = "RIGHT_3";

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        value: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        stop: false,
        result: "",
        tableData: createTable(action.row, action.cell, action.mine),
      };
    case OPEN_CELL: {
      const openData = [...state.tableData];
      openData[action.row] = [...openData[action.row]];
      openData[action.row][action.cell] = CODE.OPENED;
      return {
        ...state,
        tableData: openData,
      };
    }
    case MINECELL_CLICK: {
      const openData = [...state.tableData];
      openData[action.row] = [...openData[action.row]];
      openData[action.row][action.cell] = CODE.MINE_CLICKED;
      return {
        ...state,
        tableData: openData,
        stop: true,
        result: "패배하셨습니다.",
      };
    }
    case RIGHT_1: {
      const openData = [...state.tableData];
      openData[action.row] = [...openData[action.row]];
      if (openData[action.row][action.cell] === CODE.NORMAL) {
        openData[action.row][action.cell] = CODE.FLAG;
      } else {
        openData[action.row][action.cell] = CODE.FLAG_MINE;
      }
      return {
        ...state,
        tableData: openData,
      };
    }
    case RIGHT_2: {
      const openData = [...state.tableData];
      openData[action.row] = [...openData[action.row]];
      if (openData[action.row][action.cell] === CODE.FLAG) {
        openData[action.row][action.cell] = CODE.QUESTION;
      } else {
        openData[action.row][action.cell] = CODE.QUESTION_MINE;
      }
      return {
        ...state,
        tableData: openData,
      };
    }
    case RIGHT_3: {
      const openData = [...state.tableData];
      openData[action.row] = [...openData[action.row]];
      if (openData[action.row][action.cell] === CODE.QUESTION) {
        openData[action.row][action.cell] = CODE.NORMAL;
      } else {
        openData[action.row][action.cell] = CODE.MINE;
      }
      return {
        ...state,
        tableData: openData,
      };
    }
  }
};

const Mine = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(
    () => ({ tableData: state.tableData, dispatch, stop: state.stop }),
    [state.tableData, state.stop]
  );

  return (
    <>
      <TableContext.Provider value={value}>
        <Form />
        <Table tableData={state.tableData} />
      </TableContext.Provider>
      <div>{state.result}</div>
    </>
  );
};

export default hot(module)(Mine);
