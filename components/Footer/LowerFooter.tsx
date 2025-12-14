import Link from "next/link";

const bottomNavigations = [
  {
    label: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    link: "/terms-and-conditions",
  },
  {
    label: "Contact us",
    link: "/contact-us",
  },
];

const LowerFooter = () => {
  return (
    <div className="container-wrapper">
        <div className="lower">
          <p>&copy; 2023 Hostify, Inc. All Rights Reserved</p>

          <ul>
            {bottomNavigations.map((nav, i) => {
              return (
                <li key={i}>
                  <Link href={nav.link}>{nav.label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
  )
}

export default LowerFooter