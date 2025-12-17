import Image from "next/image";
import "./Item.scss";
import SuperhostIcon from "./SuperhostIcon";
import { FaStar } from "react-icons/fa";
import LikeButton from "@/components/LikeButton/LikeButton";
import Link from "next/link";

interface ItemInterface {
  id: string;
  name: string;
  image: string | null;
  location_tag: string;
  rate: number;
  is_super_host: boolean;
  ratings: number;
}

const IMAGE_URL = "";

const Item = ({
  item,
  style,
}: {
  item: ItemInterface;
  style?: string | "";
}) => {
  return (
    <div className={`property-item-wrapper ${style}`}>
      <div className="like-button-wrapper">
        <LikeButton id={item.id} />
      </div>
      <Link href={`/property/${item.id}`} className="property-item">
        <div className="image-container">
          <Image
            src={item.image ? `${IMAGE_URL}${item.image}` : "/default-item.jpg"}
            width={315}
            height={300}
            alt={`${item.name}'s Image`}
            style={{ objectFit: "cover" }}
          />

          {item.is_super_host ? (
            <p className="super-host-tag">
              <SuperhostIcon /> Superhost
            </p>
          ) : (
            <></>
          )}
        </div>

        <div className="item-contents">
          <div className="upper">
            <div className="name-loc">
              <p className="name">{item.name}</p>
              <p className="loc">{item.location_tag}</p>
            </div>
            <div className="ratings">
              <p>{Number(item.ratings).toFixed(1)}</p>
              <FaStar />
            </div>
          </div>

          <p className="price">
            ${item.rate}
            <span>/night</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Item;
