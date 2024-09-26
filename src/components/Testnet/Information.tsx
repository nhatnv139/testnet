"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../../styles/InformationTestnet.module.css";
import Image from "next/image";
import icon3 from "../../../public/images/testnet/information/icon3.svg";
import icon1 from "../../../public/images/testnet/information/icon1.svg";
import icon2 from "../../../public/images/testnet/information/icon2.svg";
import action1 from "../../../public/images/testnet/information/icon_expand.svg";
import action2 from "../../../public/images/testnet/information/icon_copy.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Information() {
  const { t } = useTranslation("common");
  const dataInformation = [
    {
      id: 1,
      name: t("inforName1"),
      subName: t("inforSubName1"),
      icon: icon1,
      action: action1,
      link: " https://parthenon.athenescan.io/",
    },
    {
      id: 2,
      name: t("inforName2"),
      subName: t("inforSubName2"),
      icon: icon2,
      action: action1,
      link: " https://parthenon.athenescan.io/",
    },
    {
      id: 3,
      name: t("inforName3"),
      subName: t("inforSubName3"),
      icon: icon3,
      action: action2,
      link: "",
    },
    {
      id: 4,
      name: t("inforName4"),
      subName: t("inforSubName4"),
      icon: icon3,
      action: action2,
      link: "",
    },
  ];
  const goToExpand = (e: any, name: any) => {
    if (e !== "") {
      window.open(e, "_blank");
    } else {
      navigator.clipboard
        .writeText(name)
        .then(() => {
          toast.success(t("copy_success"));
        })
        .catch((err) => {
          toast.error(t("copy_fail"));
        });
    }
  };
  return (
    <div className={styles.inforMain}>
      {dataInformation.map((item: any, index: number) => (
        <div key={index} className={styles.inforContainer}>
          <div className={styles.inforItem}>
            <Image
              className={styles.processImg}
              src={item.icon}
              alt={item.icon}
              loading="lazy"
            />
            <div>
              <div className={styles.inforName}>{item.name}</div>
              <div className={styles.inforSubNameItem}>
                <span className={styles.inforSubName}>{item.subName}</span>
                <span></span>
                <Image
                  onClick={() => {
                    goToExpand(item.link, item.subName);
                  }}
                  className={styles.inforAction}
                  src={item.action}
                  alt={item.action}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
