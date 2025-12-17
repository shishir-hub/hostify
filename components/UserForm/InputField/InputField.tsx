"use client";

import { useEffect, useRef, useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { FiLock, FiUnlock } from "react-icons/fi";
import { CgDanger } from "react-icons/cg";
import "./InputField.scss";

const InputField = ({
  name,
  label,
  type,
  register,
  error,
}: {
  name: string;
  label: string;
  type: string;
  register?: any;
  error?: string;
}) => {
  const [inputType, setInputType] = useState(type);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hasValue, setHasValue] = useState(true);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  }, [inputRef, name]);
  
  return (
    <div className="input-wrapper">
      <div className="custom-input-field">
        <input
          className={hasValue ? "active" : ""}
          type={inputType}
          name={name}
          placeholder={" "}
          autoComplete="new-password"
          ref={inputRef}
          {...register(name)}
        />
        <label htmlFor={name}>{label}</label>
        {name === "email" ? (
          <LuUserRound />
        ) : inputType === "password" ? (
          <FiLock
            className="cursor"
            onClick={() => {
              setInputType("text");
            }}
          />
        ) : inputType === "text" && type === "password" ? (
          <FiUnlock
            className="cursor"
            onClick={() => {
              setInputType("password");
            }}
          />
        ) : (
          <></>
        )}
      </div>
      {error ? (
        <p className="input-validation-errors">
          <CgDanger /> {error}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InputField;
