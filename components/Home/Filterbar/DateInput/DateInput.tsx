"use client";

import { useRef, useState } from "react";
import "./DateInput.scss";
import { FaRegCalendar } from "react-icons/fa6";

const DateInput = ({ name, label }: { name: string; label: string }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>("");

  const date = new Date();
  name === "checkOut" && date.setDate(date.getDate() + 1);

  const minDate = date.toISOString().split("T")[0];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className="date-input"
      onClick={() => {
        inputRef?.current?.showPicker();
      }}
    >
      <label htmlFor={name}>
        {selectedDate ? `${formatDate(selectedDate)}` : label}
      </label>
      <FaRegCalendar />
      <input
        type="date"
        ref={inputRef}
        onChange={(e) => {
          setSelectedDate(e.target.value);
        }}
        min={minDate}
      />
    </div>
  );
};

export default DateInput;
