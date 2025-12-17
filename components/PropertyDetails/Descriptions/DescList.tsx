"use client";

import { useEffect, useRef, useState } from "react";

const DescList = ({ descriptions }: { descriptions: any }) => {
  const heightRef = useRef<HTMLDivElement | null>(null);

  const [overflowing, setOverflowing] = useState<boolean>(false);
  const [domHeight, setDomHeight] = useState<number>(181);
  const [maxHeight, setMaxHeight] = useState<number>(181);

  useEffect(() => {
    if (heightRef.current) {
      if (heightRef.current?.offsetHeight > 181) {
        setOverflowing(true);
        setDomHeight(heightRef.current.offsetHeight);
      }
    }
  }, []);

  const handleShowMore = () => {
    if (maxHeight === domHeight) {
      setMaxHeight(181);
    } else {
      setMaxHeight(domHeight);
    }
  };

  return (
    <div className="desc">
      <div
        className="desc-container"
        style={{ maxHeight: `${maxHeight}px`, overflowY: "hidden" }}
      >
        <div ref={heightRef}>
          {descriptions?.map(
            (desc: { title: string | null; text: string }, i: number) => {
              return (
                <p key={i}>
                  {desc?.title ? <span>{desc?.title}:</span> : <></>}{" "}
                  {desc?.text}
                </p>
              );
            }
          )}
        </div>
      </div>

      {overflowing ? (
        <p className="show-more" onClick={handleShowMore}>
          Show {maxHeight === domHeight ? "less" : "more"}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DescList;
