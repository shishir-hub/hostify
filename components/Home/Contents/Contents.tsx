"use client";

import Button from "@/components/Button/Button";
import "./Contents.scss";

import { FiGrid } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Item from "./Item/Item";
import axios from "axios";
import ItemSkeleton from "./Item/ItemSkeleton/ItemSkeleton";

type ItemInterface = {
  id: string;
  name: string;
  image: string | null;
  location_tag: string;
  rate: number;
  is_super_host: boolean;
  ratings: number;
};

const Contents = () => {
  const [selectedTab, setSelectedTab] = useState("grid");

  const [properties, setProperties] = useState<ItemInterface[]>([]);
  const [allProperties, setAllProperties] = useState<ItemInterface[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingNextPage, setLoadingNextPage] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageNo, setPageNo] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/properties")
      .then((res) => {
        if (res.data?.properties?.length) {
          setProperties(res.data?.properties);
        } else {
          setProperties([]);
        }
        setTotalPages(res.data?.totalPages ?? 1);
        setPageNo(res.data?.page ?? 1);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getMoreProperties = () => {
    if (!allProperties.length) {
      if (pageNo < totalPages) {
        setLoadingNextPage(true);
        axios
          .get(`/api/properties?search=&page=${pageNo + 1}&limit=16`)
          .then((res) => {
            if (res.data?.totalPages === res.data?.page) {
              setAllProperties([...properties, ...res.data?.properties]);
            }
            setTotalPages(res.data?.totalPages ?? 1);
            setPageNo(res.data?.page ?? 1);
            if (res.data?.properties?.length) {
              setProperties((pre) => [...pre, ...res.data?.properties]);
            }
          })
          .catch((err) => {})
          .finally(() => {
            setLoadingNextPage(false);
          });
      }
    } else {
      if (pageNo === totalPages) {
        const temp = allProperties.slice(0, 16);
        setProperties(temp);
        setPageNo(1);
      } else {
        const start = (pageNo - 1) * 16;
        const temp = allProperties.slice(start, start + 16);
        setProperties((pre) => [...pre, ...temp]);
      }
    }
  };

  return (
    <div className="home-contents">
      <div className="container-wrapper">
        <div className="filter-display">
          <p>
            Stays nearby: <span>Toronto Ontario</span>
          </p>

          <div className="filter-options">
            <FiGrid
              className={selectedTab === "grid" ? "active" : ""}
              onClick={() => {
                selectedTab !== "grid" && setSelectedTab("grid");
              }}
            />
            <HiOutlineMap
              className={selectedTab === "map" ? "active" : ""}
              onClick={() => {
                selectedTab !== "map" && setSelectedTab("map");
              }}
            />
          </div>
        </div>

        <div className="list-container">
          {loading ? (
            <>
              {["", "", "", ""].map((el, i) => {
                return <ItemSkeleton key={i} />;
              })}
            </>
          ) : (
            <>
              {properties.map((el, i) => {
                return <Item item={el} key={i} />;
              })}
            </>
          )}
          {loadingNextPage ? (
            <>
              {["", "", "", ""].map((el, i) => {
                return <ItemSkeleton key={i} />;
              })}
            </>
          ) : (
            <></>
          )}
        </div>

        {pageNo === totalPages && pageNo === 1 && totalPages === 1 ? (
          <></>
        ) : (
          <div className="button-wrapper">
            <Button
              name={`Show ${pageNo === totalPages ? "less" : "more"}`}
              type="button"
              style="secondary"
              loading={loading || loadingNextPage}
              handleClick={getMoreProperties}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Contents;
