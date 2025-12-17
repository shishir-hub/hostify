"use client";

import "./Button.scss";

const Button = ({
  type,
  style,
  name,
  disabled,
  handleClick,
}: {
  type: "submit" | "button";
  style: string;
  name: string;
  disabled?: boolean | false;
  handleClick?: () => void;
}) => {
  return (
    <button disabled={disabled} type={type} onClick={handleClick} className={`custom-button ${style}`}>
      {name}
    </button>
  );
};

export default Button;
