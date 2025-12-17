"use client";

import Link from "next/link";
import { useState } from "react";

const navigations = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Stays",
    link: "/stays",
  },
  {
    label: "Become a host",
    link: "/become-a-host",
  },
];

const Navigation = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  return (
    <nav className={`mobile ${openNav ? "active" : ""}`}>
      <div className="menu" onClick={() => setOpenNav((pre) => !pre)}>
        <span className="op"></span>
        <span className="opt"></span>
      </div>
      <ul>
        {navigations.map((nav, i) => {
          return (
            <li key={i}>
              <Link onClick={()=> setOpenNav(pre=> !pre)} href={nav.link}>{nav.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
