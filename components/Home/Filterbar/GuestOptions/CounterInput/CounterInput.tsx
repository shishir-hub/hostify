"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import "./CounterInput.scss";

const CounterInput = ({ name, label }: { name: string; label: string }) => {
  const [counter, setCounter] = useState<number>(0);
  return (
    <div className="counter-input">
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        name={name}
        value={counter}
        onChange={(e) => {
          setCounter(Number(e.target.value));
        }}
      />

      <div className="counter-wrapper">
        <FaMinus
          className={counter === 0 ? "disabled" : ""}
          onClick={() => {
            counter > 0 && setCounter((pre) => pre - 1);
          }}
        />
        <p>{counter}</p>
        <FaPlus
          className={counter === 30 ? "disabled" : ""}
          onClick={() => {
            counter < 31 && setCounter((pre) => pre + 1);
          }}
        />
      </div>
    </div>
  );
};

export default CounterInput;
