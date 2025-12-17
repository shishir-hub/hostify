"use client";

import "./Alert.scss";
import { useAlertStore } from "@/store/alertStore";
import { useEffect, useState } from "react";

const Alert = () => {
  const { alert, clearAlert } = useAlertStore((state) => state);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      setTimeout(() => {
        clearAlert();
      }, 2300);
    }
  }, [alert, clearAlert]);
  if (!alert) return null;

  return (
    <div className={`global-alert ${isVisible ? "active" : ""} ${alert?.type}`}>
      <p>{alert?.message}</p>
    </div>
  );
};

export default Alert;
