'use client'

import styles from "@/styles/Home.module.css";
import Image from "next/image";
import logoIcon from "../../public/images/logo.png";

export default function Loading () {
    return <div className={styles.appLoading}>
        <div className={styles.appLoadingWrap}>

            <Image
                className={styles.appLoadingLogo}
                src={logoIcon}
                alt="picture"
                layout="fixed"
                loading="lazy"
            />
            <div className={styles.ldsEllipsis}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
      </div>
}