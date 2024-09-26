"use client";

import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";
import styles from "../styles/Home.module.css";
import telegram from "../../public/images/_Telegram.svg";
import twitter from "../../public/images/_Twitter.svg";
import youtube from "../../public/images/_YouTube.svg";
import { useTranslation } from "next-i18next";
const socicalLinks = [
  {
    icon: twitter,
    url: "https://twitter.com/Athene_Network",
    name: "Twitter",
    alt: "Twitter socical",
  },
  {
    icon: telegram,
    url: "https://t.me/AtheneNetwork_Ann",
    name: "Telegram",
    alt: "Telegram socical",
  },
  {
    icon: youtube,
    url: "https://www.youtube.com/channel/UCr0vacksFPGACPcTqJ0r4ig",
    name: "youtube",
    alt: "Youtube socical",
  },
];

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <Box className={styles.footerModule}>
      <Box margin={"0 auto"}>
        <div className={styles.footerTitle}>{t("end_text")}</div>
        <div className={styles.footerSocial}>
          {socicalLinks
            .map((socical: any, index: number) => (
              <Link
                key={index}
                href={socical.url}
                target="_blank"
                className="linkSocial"
              >
                <Image
                  src={socical.icon}
                  alt={socical.alt}
                  width={48}
                  height={48}
                  loading="lazy"
                />
              </Link>
            ))
          }
        </div>
      </Box>
      <div className={styles.homeFooter}>
        2024 Athene Group LTD. | All rights reserved.
      </div>
    </Box>
  );
};
export default Footer;
