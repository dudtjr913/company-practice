import React, { useCallback, useContext, useState } from "react";
import { hot } from "react-hot-loader";
import { START_GAME } from "./Mine";
import { TableContext } from "./Mine";
import Table from "./Table";

const Form = () => {
  const [row, setRow] = useState("");
  const [cell, setCell] = useState("");
  const [mine, setMine] = useState("");
  const { dispatch } = useContext(TableContext);

  const handleOnRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);

  const handleOnCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);

  const handleOnMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const handleOnClick = useCallback(() => {
    dispatch({
      type: START_GAME,
      row,
      cell,
      mine,
    });
  }, [row, cell, mine]);

  return (
    <div>
      <input
        id="row"
        type="number"
        placeholder="가로줄"
        value={row}
        onChange={handleOnRow}
      />
      <input
        id="cell"
        type="number"
        placeholder="세로줄"
        value={cell}
        onChange={handleOnCell}
      />
      <input
        id="mine"
        type="number"
        placeholder="지뢰수"
        value={mine}
        onChange={handleOnMine}
      />
      <button onClick={handleOnClick}>시작!</button>
    </div>
  );
};

export default hot(module)(Form);
