import Image from "next/image";
import Link from "next/link";

import "./Navbar.scss";
import Navigation from "./Navigation";

const Navbar = () => {
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
  return (
    <header className="navbar">
      <div className="container-wrapper">
        <Image
          src={"/logo.svg"}
          alt="Logo"
          width={196.93}
          height={40}
          style={{ objectFit: "contain" }}
        />

        <nav className="desktop">
          <ul>
            {navigations.map((nav, i) => {
              return (
                <li key={i}>
                  <Link href={nav.link}>{nav.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Navigation />
      </div>
    </header>
  );
};

export default Navbar;
