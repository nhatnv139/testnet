'use client'

import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../../public/images/logopc.svg";
import logomb from "../../public/images/logomb.svg";
import logoIcon from "../../public/images/logo.png";
import SelectLangues from "@/components/SelectLangues";
import { useTranslation } from "next-i18next";
import { usePathname } from 'next/navigation'
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { shortenAddress } from "@/utils";
import Sidebar from "@/components/SidebarMobile";
import { useState } from "react";
import { defaultLocale } from "@/config/constants/language";
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import ModalConnectWebApp from "@/components/ModalConnectWebApp";

const Header = () => {
    const { t, i18n} = useTranslation("common");
    const pathname = usePathname();
    const currentLocale = i18n.language;
  
    const [openSideBar, setSideBar] = useState(false)
    const [openModalConnect, setModalOpenConnect] = useState(false);

    const menus = [
        {path: `/${currentLocale}/`, title: t('home')},
        {path: `/${currentLocale}/histories/`, title: t('history')},
    ]

    const { open } = useWeb3Modal()
    const { address } = useAccount();
    
    return (
        <div className={styles.header}>
            <div className={styles.navbar}>
                <div className={styles.logo}>
                    <Link href="/">
                        <Image className={styles.logoIconPre} src={logoIcon} alt="picture" layout="fixed" loading="lazy"  />
                        <Image src={logo} height={17} alt="picture" layout="fixed" loading="lazy" />
                    </Link>
                </div>
                <div className={styles.logomb}>
                    <div className={styles.logombTwo}>
                        <div className={styles.naviIcon} onClick={() => setSideBar(true)}><MenuSharpIcon /></div>
                        <Link href="/">
                            <Image src={logomb} alt="picture" layout="fixed" loading="lazy" />
                        </Link>
                    </div>
                </div>
                <div className={styles.menu}>
                    {menus.map((menu) => {
                        const menuPath = currentLocale === defaultLocale ?  menu.path.replace(`/${currentLocale}`, "") :  menu.path
                        const isActive = menuPath === pathname ? styles.menuActive: ''
                        return <Link key={menuPath} href={menuPath} className={isActive}>
                            {menu.title}
                        </Link>
                    })}
                </div>
            </div>
            <div className={styles.actionBtnSelect}>
                <div className={styles.itemRightMenu}>
                    <p onClick={() => {
                        if (!(window as any)?.ethereum) return setModalOpenConnect(true)
                        open()
                    }}>
                        {address
                            ? shortenAddress(address)
                            : t('connectWallet')
                        }
                    </p>
                </div>
                <div className={styles.itemRightMenu}>
                    <SelectLangues />
                </div>
            </div>
            
            <div className={styles.connectMobile}>
                <div className={styles.itemRightMenu}>
                    <p onClick={() => {
                        if (!(window as any)?.ethereum) return setModalOpenConnect(true)
                        open()
                    }}>
                        {address
                            ? shortenAddress(address)
                            : t('connectWallet')
                        }
                    </p>
                </div>
            </div>

            <ModalConnectWebApp
              isOpen={openModalConnect}
              onCloseModal={() => setModalOpenConnect(false)}
            />
            <Sidebar
                isOpen={openSideBar}
                toggleSidebar={() => setSideBar(!openSideBar)}
            />
        </div>
    )
}
export default Header;