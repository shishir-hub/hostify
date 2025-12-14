"use client";

import "./Footer.scss";
import { usePathname } from "next/navigation";
import LowerFooter from "./LowerFooter";
import MainFooter from "./MainFooter";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="footer">
      {pathname !== "/login" && pathname !== "/signup" && <MainFooter />}
      <LowerFooter />
    </footer>
  );
};

export default Footer;
