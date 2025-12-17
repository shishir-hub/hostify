"use client";

import { useEffect, useRef, useState } from "react";
import CounterInput from "./CounterInput/CounterInput";
import "./GuestOptions.scss";
import { PiUserBold } from "react-icons/pi";
import { useClickOutside } from "use-events";

const GuestOptions = ({ label }: { label: string }) => {
  const optionRef = useRef(null);
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  useClickOutside([optionRef], () => {
    setOpenOptions(false);
  });

  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (openOptions) {
      setShouldRender(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else if (isVisible) {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
  }, [openOptions, shouldRender]);
  return (
    <div className="guest-options" ref={optionRef}>
      <div
        className="container"
        onClick={() => {
          setOpenOptions((pre) => !pre);
        }}
      >
        <p>{label}</p>
        <PiUserBold />
      </div>

      {shouldRender ? (
        <div className={`options ${isVisible ? "active" : ""}`}>
          <CounterInput name="adults" label="Adults" />
          <CounterInput name="children" label="Children" />
          <CounterInput name="rooms" label="Rooms" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GuestOptions;
