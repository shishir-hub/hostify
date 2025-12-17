"use client";

import "./Amenities.scss";

import Button from "@/components/Button/Button";
import GetAmenitiesIcon from "./GetAmenitiesIcon";
import { useEffect, useState } from "react";

const Amenities = ({ data }: { data: any }) => {
  const [maxToShow, setMaxToShow] = useState(12);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    if (data?.amenities?.length && data?.amenities?.length > 12) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [data]);

  const handleClick = () => {
    if (maxToShow > 12) {
      setMaxToShow(12);
    } else {
      setMaxToShow(data?.amenities?.length);
    }
  };
  return (
    <div className="amenities">
      <p className="title">Amenities</p>

      <div className="amenities-container">
        <div className="amenities-list">
          {data?.amenities?.map((el: string, i: number) => {
            if (i < maxToShow) {
              return (
                <p key={i}>
                  <GetAmenitiesIcon name={el} />
                  {el}
                </p>
              );
            } else {
              return null;
            }
          })}
        </div>

        {hasMore ? (
          <div className="button-wrapper">
            <Button
              name={`Show ${maxToShow > 12 ? "less" : "all"} amenities`}
              style="gray"
              type="button"
              handleClick={handleClick}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Amenities;
