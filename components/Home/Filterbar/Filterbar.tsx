import Button from "@/components/Button/Button";
import DateInput from "./DateInput/DateInput";
import "./Filterbar.scss";
import GuestOptions from "./GuestOptions/GuestOptions";
import SuggestionInput from "./SuggestionInput/SuggestionInput";

const Filterbar = () => {
  return (
    <div className="filter-bar">
      <div className="upper-layer">
        <SuggestionInput name="searchInput" />
        <div className="button-wrapper">
          <Button name="Search" type="button" style="primary" />
        </div>
      </div>

      <div className="smaller-inputs">
        <div className="dates-wrapper">
          <DateInput name="checkIn" label="Check-in" />
          <DateInput name="checkOut" label="Check-out" />
        </div>
        <GuestOptions label="Guest" />
      </div>
      <div className="button-wrapper">
        <Button name="Search" type="button" style="primary" />
      </div>
    </div>
  );
};

export default Filterbar;
