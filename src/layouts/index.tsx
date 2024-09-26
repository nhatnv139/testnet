"use client";

import { Box } from "@mui/material";
import Header from "./Header";
import styles from "../styles/Home.module.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export interface PageLayoutProps {
  children: any;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return <Loading />;

  return (
    <div className=''>
      <div className={styles.mainWrapperBg}></div>
      <div className={styles.mainWrapper}>
        <Header />
        <Box>{children}</Box>
        <ToastContainer />
      </div>
    </div>
  );
};
export default PageLayout;
