import { FaCloud } from "react-icons/fa";
import "./Map.scss";
import MyMap from "./MyMap";
import { HiLocationMarker } from "react-icons/hi";

const Map = ({ data }: { data: any }) => {
  return (
    <div className="property-map">
      <div className="upper">
        <div className="left">
            <p>Where you'll be</p>
            <span><HiLocationMarker/> {data?.surroundings?.map_location}</span>
        </div>

        <div className="right">
            <div className="icon">
                <FaCloud />
                <span></span>
            </div>
            <div className="temp">
                <p>{data?.surroundings?.weather?.temperature}</p>
                <span>{data?.surroundings?.weather?.condition}</span>
            </div>
        </div>
      </div>

      <div className="map-container">
        <MyMap
          lat={data?.latitude}
          long={data?.longitude}
          name={data?.location_tag}
        />
      </div>
    </div>
  );
};

export default Map;
