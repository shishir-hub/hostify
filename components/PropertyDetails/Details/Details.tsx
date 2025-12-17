import "./Details.scss";

import Image from "next/image";
import Link from "next/link";

import SuperhostIcon from "@/components/Home/Contents/Item/SuperhostIcon";
import LikeButton from "@/components/LikeButton/LikeButton";
import Button from "@/components/Button/Button";

import { PiUserBold } from "react-icons/pi";
import { IoTrendingDown } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const Details = ({ data, id }: { data: any; id: string }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div className="property-booking-details">
      <div className="detail-contents">
        <div className="upper">
          <div className="top">
            <div className="name-loc-like">
              <div className="name-loc">
                <p>{data?.name}</p>
                <span>{data?.location_tag}</span>
              </div>

              <div className="like-button-wrapper"></div>
              <LikeButton id={id} />
            </div>

            <div className="ratings-reviwes">
              <div className="ratings">
                <p>{Number(data?.ratings)}</p>
                <FaStar />
              </div>

              <Link href={`/property/${id}/reviews`} className="reviews">
                {data?.total_reviews} Reviews
              </Link>
            </div>
          </div>

          <p className="description">{data?.short_description}</p>
        </div>

        <div className="lower">
          <div className="price">
            <p>
              ${data?.rate}
              <span>/night</span>
            </p>

            {data?.booking?.best_time_to_book ? (
              <p className="best-time-to-book">
                <span>
                  <IoTrendingDown />
                </span>
                Best time to Book
              </p>
            ) : (
              <></>
            )}
          </div>

          <Link href={`/property/${id}/book`} style={{textDecoration: "none"}}>
            <Button name="Book this home" type="button" style="primary" />
          </Link>
        </div>
      </div>

      <div className="host-details">
        <p className="title">Hosted by:</p>

        <div className="profile">
          <div className="user">
            <div className="image">
              {data?.host?.image ? (
                <Image
                  src={data?.host?.image}
                  height={50}
                  width={50}
                  alt="User"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <PiUserBold />
              )}
            </div>
            <div className="user-details">
              <p>{data?.host?.name || ""}</p>
              <span>Joined in {formatDate(data?.host?.created_at)}</span>
            </div>
          </div>
          {data?.host?.is_super_host ? (
            <p className="super-host-tag">
              <SuperhostIcon width={12.26} height={18.36} /> Superhost
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
