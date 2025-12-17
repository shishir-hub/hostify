import "./Recommendations.scss";
import Link from "next/link";

import RecommendedItem from "./RecommendedItem/RecommendedItem";

type ItemInterface = {
  id: string;
  name: string;
  image: string | null;
  location_tag: string;
  rate: number;
  is_super_host: boolean;
  ratings: number;
};

const Recommendations = ({
  id,
  similarStays,
}: {
  id: string;
  similarStays: ItemInterface[];
}) => {
  const recommendedStays = similarStays;

  return (
    <div className="recommended-stays">
      <div className="headings">
        <p>Similar stays</p>
        <Link href={"/"}>View all</Link>
      </div>

      <div className="stays-list">
        {recommendedStays.map((el, i) => {
          return <RecommendedItem key={i} item={el} />;
        })}
      </div>
    </div>
  );
};

export default Recommendations;
