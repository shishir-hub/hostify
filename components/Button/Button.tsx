"use client";

import { FiLoader } from "react-icons/fi";
import "./Button.scss";

const Button = ({
  type,
  style,
  name,
  disabled,
  loading,
  handleClick,
}: {
  type: "submit" | "button";
  style: string;
  name: string;
  disabled?: boolean | false;
  loading?: boolean | false;
  handleClick?: () => void;
}) => {
  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={handleClick}
      className={`custom-button ${style}`}
    >
      {name}
      {loading ? (
        <p>
          <FiLoader />
        </p>
      ) : (
        <></>
      )}
    </button>
  );
};

export default Button;
