import "./Descriptions.scss";

import { GrUserExpert } from "react-icons/gr";
import { TbCalendarX } from "react-icons/tb";
import DeskSVG from "./DeskSVG";
import DescList from "./DescList";

const Descriptions = ({ data }: { data: any }) => {
  return (
    <div className="property-descriptions">
      <article className="about">
        <p className="title">About this home</p>

        <DescList descriptions={data?.descriptions} />
      </article>

      <div className="booking-options">
        {data?.booking?.dedicated_work_space ? (
          <div className="item">
            <div className="icon">
              <DeskSVG />
            </div>
            <div className="b-o-details">
              <p>Dedicated workspace</p>
              <span>A private room equipped with WiFi</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        {data?.booking?.self_check_in ? (
          <div className="item">
            <div className="icon">
              <GrUserExpert />
            </div>
            <div className="b-o-details">
              <p>Self check-in</p>
              <span>Check in with just your phone</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        {data?.booking?.free_cancellation ? (
          <div className="item">
            <div className="icon">
              <TbCalendarX />
            </div>
            <div className="b-o-details">
              <p>Free cancellation</p>
              <span>Cancel anytime</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Descriptions;
