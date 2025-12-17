"use client";

import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import "./LikeButton.scss";

const LikeButton = ({ id }: { id: string }) => {
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    let likedItems = localStorage.getItem("likedItems");
    likedItems = likedItems ? JSON.parse(likedItems) : null;
    const likedArray = Array.isArray(likedItems) ? [...likedItems] : [];

    if (likedArray.includes(id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, []);

  const handleClick = () => {
    let likedItems = localStorage.getItem("likedItems");
    likedItems = likedItems ? JSON.parse(likedItems) : null;
    const likedArray = Array.isArray(likedItems) ? [...likedItems] : [];

    if (liked) {
      setLiked(false);

      const newLikedItems = [...likedArray, id];

      localStorage.setItem("likedItems", JSON.stringify(newLikedItems));
    } else {
      setLiked(true);

      const newLikedItems = likedArray.filter((el) => el != id);
      localStorage.setItem("likedItems", JSON.stringify(newLikedItems));
    }
  };
  return (
    <div
      className={`like-button ${liked ? "liked" : ""}`}
      onClick={handleClick}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
};

export default LikeButton;
