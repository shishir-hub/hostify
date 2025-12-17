"use client";

import React, { useEffect, useRef, useState } from "react";
import "./SuggestionInput.scss";
import Image from "next/image";
import { useClickOutside } from "use-events";

const SampleSuggestions = [
  { name: "Kathmandu", keyword: "kathmandu" },
  { name: "Patan Kathmandu", keyword: "patan" },
  { name: "Pokhara", keyword: "pokhara" },
  { name: "Lumbini", keyword: "lumbini" },
  { name: "Chitwan", keyword: "chitwan" },
  { name: "Bhaktapur", keyword: "bhaktapur" },
  { name: "Nagarkot", keyword: "nagarkot" },
  { name: "Everest Base Camp", keyword: "everest" },
  { name: "Annapurna", keyword: "annapurna" },
  { name: "Bandipur", keyword: "bandipur" },
];

interface SuggestionItem {
  name: string;
  [key: string]: any;
}

const SuggestionInput = ({ name }: { name: string }) => {
  const inputRef = useRef(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [debounceSearchInput, setDebounceSearchInput] = useState<string>("");

  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);

  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);

  const [finalKeyword, setFinalKeyword] = useState<string>("");
  const [openSuggestions, setOpenSuggestions] = useState<boolean>(false);

  useClickOutside([inputRef], () => {
    setOpenSuggestions(false);
    setFinalKeyword(searchInput);
  });

  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchInput(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const fetchData = () => {
      if (finalKeyword !== debounceSearchInput) {
        const tempSuggestions = shuffleArray(SampleSuggestions);

        setSuggestions(tempSuggestions);
        setSelectedSuggestion(-1);
        setOpenSuggestions(true);
      }
    };

    debounceSearchInput ? fetchData() : setOpenSuggestions(false);
  }, [debounceSearchInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length) {
      if (e.code === "ArrowDown") {
        selectedSuggestion >= -1 && selectedSuggestion + 1 < suggestions.length
          ? setSelectedSuggestion((pre) => pre + 1)
          : setSelectedSuggestion(0);
      } else if (e.code === "ArrowUp") {
        selectedSuggestion !== 0
          ? setSelectedSuggestion((pre) => pre - 1)
          : setSelectedSuggestion(suggestions.length - 1);
      } else if (e.code === "Enter") {
        if (suggestions[selectedSuggestion]) {
          setSearchInput(suggestions[selectedSuggestion].name);
          setFinalKeyword(suggestions[selectedSuggestion].name);
        } else {
          setFinalKeyword(searchInput);
        }
        setOpenSuggestions(false);
      }
    }
  };

  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (openSuggestions) {
      setShouldRender(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else if (isVisible) {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
  }, [openSuggestions, shouldRender]);

  return (
    <div className="suggestion-input" ref={inputRef}>
      <div className="input-container">
        <input
          name={name}
          type="text"
          placeholder="Accommodation"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <Image src={"./home.svg"} width={24} height={24} alt="Home" />
      </div>
      {shouldRender ? (
        <div
          className={`suggestions ${
            suggestions.length > 0 && isVisible ? "active" : ""
          }`}
        >
          {suggestions.map((item, i) => {
            return (
              <p
                key={i}
                className={i === selectedSuggestion ? "active" : ""}
                onClick={() => {
                  if (openSuggestions) {
                    setFinalKeyword(item.name);
                    setSearchInput(item.name);
                    setOpenSuggestions(false);
                  }
                }}
              >
                {item.name}
              </p>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SuggestionInput;
