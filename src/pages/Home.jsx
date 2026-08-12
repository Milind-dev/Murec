import React from 'react'
import Partners from './Partners'
// import team1 from "../assests/images/murecicon.png";
import team1 from "../assests/images/team_1.webp";
import team2 from "../assests/images/team_2.webp";
import team3 from "../assests/images/team_3.webp";
import t3 from "../assests/images/t3_01.webp";
import History from './History';

export default function Home() {
  const historytext = {
    description:
      "For over seven decades, we stood for perseverance, integrity, and nation-building through enterprise. Every step was guided by one oath: quality before profit, trust before everything.",
  };
  const partners = [
    {
      id: 1,
      name: "Malchand",
      description:
        "“The scale model for Murec will serve as a tangible representation of the proposed development.”",
      img: team1,
      icon: "partner1",
    },
    {
      id: 2,
      name: "Bobby Mukherrji",
      description:
        "“We are engaged to conceptualize the interiors for Murec’s clubhouse and tower lobbies, with a focus on refined luxury and strong spatial identity.”",
      img: team2,
      icon: "partner2-icon.png",
    },
    {
      id: 3,
      name: "Goonmeet Ji",
      description:
        "“We are engaged to sculpt the architectural vision for Murec as a contemporary residential landmark—an address conceived for refined urban living, where design elegance is thoughtfully interwoven with functional planning to shape a premium high-rise environment of enduring character and aspiration.”",
      img: team3,
      icon: "partner3-icon.png",
    },
    {
      id: 4,
      name: "Shivam Patodia",
      description:
        "“Propacity is proud to partner with MUREC as its mandate-led growth partner. From brand launch to project marketing and consulting enablement, the collaboration reflects strategic thinking, strong execution, and a shared vision of building a scalable, future-forward real estate brand.",
      img: t3,
      icon: "partner4-icon.png",
    },
  ];
 
  return (
    <div>
      <History historytext={historytext}  />
      <Partners partners={partners} />
    </div>
  );
}
