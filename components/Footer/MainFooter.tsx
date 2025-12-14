import Link from "next/link";

const footerNavigations = [
  {
    label: "Support",
    links: [
      {
        label: "Help Centre",
        link: "/help-centre",
      },
      {
        label: "AirCover",
        link: "/air-cover",
      },
      {
        label: "Combating discrimination",
        link: "/combating-discrimination",
      },
      {
        label: "Supporting people with disabilities",
        link: "/supporting-people-with-disabilities",
      },
      {
        label: "Cencellation options",
        link: "/cencellation-options",
      },
    ],
  },
  {
    label: "Hosting",
    links: [
      {
        label: "Local home",
        link: "/local-home",
      },
      {
        label: "Cover for hosts",
        link: "/cover-for-hosts",
      },
      {
        label: "Hosting resources",
        link: "/hosting-resources",
      },
      {
        label: "Community forum",
        link: "/community-forum",
      },
      {
        label: "Hosting responsibly",
        link: "/hosting-responsibly",
      },
    ],
  },
  {
    label: "Hostify",
    links: [
      {
        label: "Newsroom",
        link: "/newsroom",
      },
      {
        label: "New features",
        link: "/new-features",
      },
      {
        label: "Careers",
        link: "/careers",
      },
      {
        label: "Investres",
        link: "/investres",
      },
      {
        label: "Gift cards",
        link: "/gift-cards",
      },
    ],
  },
];

const MainFooter = () => {
  return (
    <div className="upper">
        <div className="container-wrapper">
          {footerNavigations.map((item, i) => {
            return (
              <div className="list" key={i}>
                <p>{item.label}</p>
                <ul>
                  {item.links.map((nav, i) => {
                    return (
                      <li key={i}>
                        <Link href={nav.link}>{nav.label}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
  )
}

export default MainFooter