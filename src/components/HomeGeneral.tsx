"use client";

import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import React, { useCallback, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "next-i18next";
import { Box, useMediaQuery } from "@mui/material";
import FerchDataFunction from "@/config/constants/fetchingData";
import FeatureAthena from "./FeatureAthene";
import Image from "next/image";
import Line from "../../public/images/feature/line.svg";
import LineMobile from "../../public/images/mobile/line.svg";
import LinearDeterminate from "./ProgressBar";
import { useStoreShowFeature } from "@/store";

const HomeGeneral: NextPage = () => {
  const { t, i18n } = useTranslation("common");
  const { language } = i18n;
  const { itemListFeature } = FerchDataFunction();
  const { featureShow } = useStoreShowFeature();
  const featureShowById = (id: number) => {
    return featureShow[id];
  };
  const matches = useMediaQuery("(min-width:1070px)");

  const responsiveIphonePromax = useMediaQuery("(min-width: 430px)");

  const responsiveIphoneXr = useMediaQuery("(min-width:414px)");

  const responsiveIphone14Pro = useMediaQuery("(min-width: 393px)");

  const responsiveIphonePro = useMediaQuery("(min-width: 390px)");

  const responsiveIphoneSE = useMediaQuery("(max-width: 375px)");

  const styleResponsive = useCallback(() => {
    if (responsiveIphonePromax) {
      return {
        feature: {
          gap: "10px",
        },
        listFirst: {
          paddingTop: "5px",
          gap:
            language === "zh"
              ? "100px"
              : language === "fr" || language === "de"
              ? "66px"
              : language === "ru"
              ? "55px"
              : language === "ko"
              ? "88px"
              : "95px",
        },
        lineStyle: {
          maxWidth: "20px",
          marginTop: "26px",
          img: {
            width: "90%",
            padding: "0px",
          },
        },
        listLast: {
          marginTop: "130px",
          gap:
            language === "zh"
              ? "89px"
              : language === "ko"
              ? "95px"
              : language === "fr" || language === "de"
              ? "27px"
              : language === "ru"
              ? "21px"
              : "83px",
        },
      };
    } else if (responsiveIphoneXr) {
      return {
        feature: {
          gap: "10px",
        },
        listFirst: {
          paddingTop: "5px",
          gap:
            language === "zh"
              ? "100px"
              : language === "ko"
              ? "88px"
              : language === "fr" || language === "de"
              ? "50px"
              : language === "ru"
              ? "55px"
              : "95px",
        },
        lineStyle: {
          maxWidth: "20px",
          marginTop: "26px",
          img: {
            width: "85%",
            padding: "0px",
          },
        },
        listLast: {
          marginTop: "135px",
          gap:
            language === "zh"
              ? "89px"
              : language === "ko"
              ? "80px"
              : language === "fr" || language === "de"
              ? "17px"
              : language === "ru"
              ? "21px"
              : "75px",
        },
      };
    } else if (responsiveIphone14Pro) {
      return {
        feature: {
          gap: "10px",
        },
        listFirst: {
          paddingTop: "5px",
          gap:
            language === "zh"
              ? "60px"
              : language === "ko"
              ? "78px"
              : language === "fr" || language === "de"
              ? "56px"
              : language === "ru"
              ? "55px"
              : "65px",
        },
        lineStyle: {
          maxWidth: "20px",
          marginTop: "30px",
          img: {
            width: "100%",
            padding: "2px",
          },
        },
        listLast: {
          marginTop: "135px",
          gap:
            language === "zh"
              ? "60px"
              : language === "fr" || language === "de"
              ? "60px"
              : language === "ko"
              ? "60px"
              : language === "ru"
              ? "60px"
              : "68px",
        },
      };
    } else if (responsiveIphonePro) {
      return {
        feature: {
          gap: "10px",
        },
        listFirst: {
          paddingTop: "5px",
          gap:
            language === "zh"
              ? "100px"
              : language === "ko"
              ? "88px"
              : language === "fr" || language === "de"
              ? "48px"
              : language === "ru"
              ? "55px"
              : "20px",
        },
        lineStyle: {
          maxWidth: "20px",
          marginTop: "30px",
          img: {
            width: "100%",
            padding: "2px",
          },
        },
        listLast: {
          marginTop: "40px",
          gap:
            language === "zh"
              ? "89px"
              : language === "fr" || language === "de"
              ? "13px"
              : language === "ko"
              ? "80px"
              : language === "ru"
              ? "21px"
              : "35px",
        },
      };
    } else if (responsiveIphoneSE) {
      return {
        feature: {
          gap: "10px",
        },
        listFirst: {
          paddingTop: "5px",
          gap:
            language === "zh"
              ? "60px"
              : language === "ko"
              ? "88px"
              : language === "fr" || language === "de"
              ? "23px"
              : language === "ru"
              ? "55px"
              : "35px",
        },
        lineStyle: {
          maxWidth: "20px",
          marginTop: "30px",
          img: {
            width: "100%",
            padding: "2px",
          },
        },
        listLast: {
          marginTop: "125px",
          gap:
            language === "zh"
              ? "70px"
              : language === "fr" || language === "de"
              ? "10px"
              : language === "ko"
              ? "80px"
              : language === "ru"
              ? "21px"
              : "28px",
        },
      };
    }
    return {
      feature: {
        gap: "10px",
      },
      listFirst: {
        paddingTop: "5px",
        gap:
          language === "zh"
            ? "60px"
            : language === "ko"
            ? "88px"
            : language === "fr" || language === "de"
            ? "23px"
            : language === "ru"
            ? "55px"
            : "65px",
      },
      lineStyle: {
        maxWidth: "20px",
        marginTop: "30px",
        img: {
          width: "100%",
          padding: "2px",
        },
      },
      listLast: {
        marginTop: "125px",
        gap:
          language === "zh"
            ? "70px"
            : language === "fr" || language === "de"
            ? "10px"
            : language === "ko"
            ? "80px"
            : language === "ru"
            ? "21px"
            : "78px",
      },
    };
  }, [
    responsiveIphoneSE,
    responsiveIphonePro,
    responsiveIphonePromax,
    language,
  ]);

  const timeoutRef: any = React.useRef();

  const clearTimer = React.useCallback(
    () => clearTimeout(timeoutRef.current),
    []
  );



  const [isModalOpen, setisModalOpen] = useState(false);

  React.useEffect(() => {
    if (timeoutRef.current) clearTimer();

    timeoutRef.current = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);

    return () => {
      clearTimer();
    };
  }, [clearTimer]);
  return (
    <div className={styles.premiunMain}>
      <div className={styles.container}>
        <main className={styles.main}>
          {/* content */}
          <div className={styles.homeContent}>
            <div className={styles.homeContentTitle}>{t("title")}</div>
            <div className={styles.homeContentSub}>{t("sub_title")}.</div>
            {/* feature list */}
            <Box
              display={"flex"}
              flexDirection={matches ? "column" : "row"}
              justifyContent={"center"}
              gap={matches ? 4 : styleResponsive().feature.gap}
              alignItems={matches ? "center" : "start"}
            >
              <Box
                display={"flex"}
                flexDirection={matches ? "row" : "column"}
                gap={matches ? 9 : styleResponsive().listFirst.gap}
                width={"100%"}
                margin={"0 auto"}
                justifyContent={"center"}
                alignItems={"center"}
                flexBasis={matches ? "unset" : "100%"}
                ml={matches ? -3 : 0}
              >
                {itemListFeature.slice(0, 5).map((feature) => (
                  <FeatureAthena
                    key={feature.id}
                    id={feature.id}
                    matches={matches}
                    showFeature={featureShowById(feature.id) || !matches}
                    image={feature.image}
                    title={feature.title}
                    description={feature.description}
                    maxWidth={feature.maxWidth}
                    subTitle={feature.subTitle}
                    link={feature.link}
                    onClick={() => setisModalOpen(true)}
                    classFeature={"feature" + feature.id}
                  />
                ))}
              </Box>
              {matches ? (
                <Box maxWidth={"1600px"} width={"100%"}>
                  {/* <LinearDeterminate /> */}
                  <Image
                    src={Line}
                    alt="line"
                    style={{
                      width: "100%",
                      position: "relative",
                      zIndex: 2,
                    }}
                    loading="lazy"
                  />
                </Box>
              ) : (
                <Box
                  flexBasis={"100%"}
                  maxWidth={styleResponsive().lineStyle.maxWidth}
                  marginTop={styleResponsive().lineStyle.marginTop}
                  sx={{ position: "relative" }}
                >
                  <div className={styles.imgLineMobieSE}>
                    <Image
                      src={LineMobile}
                      alt="line"
                      width={20}
                      style={{
                        width: styleResponsive().lineStyle.img.width,
                        height: "100%",
                        padding: styleResponsive().lineStyle.img.padding,
                      }}
                      loading="lazy"
                    />
                  </div>
                </Box>
              )}
              <Box
                display={"flex"}
                gap={matches ? 4 : styleResponsive().listLast.gap}
                mt={matches ? 0 : styleResponsive().listLast.marginTop}
                pl={matches ? 10 : 0}
                flexDirection={matches ? "row" : "column"}
                flexBasis={matches ? "unset" : "100%"}
                alignItems={"center"}
              >
                {itemListFeature
                  .slice(5, itemListFeature.length)
                  .map((feature) => (
                    <FeatureAthena
                      key={feature.id}
                      id={feature.id}
                      showFeature={featureShowById(feature.id) || !matches}
                      matches={matches}
                      image={feature.image}
                      title={feature.title}
                      description={feature.description}
                      subTitle={feature.subTitle}
                      maxWidth={feature.maxWidth}
                      link={feature.link}
                      onClick={() => setisModalOpen(true)}
                      classFeature={"feature" + feature.id}
                    />
                  ))}
              </Box>
            </Box>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeGeneral;
