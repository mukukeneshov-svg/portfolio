"use client";
import { ReactNode, useEffect, useState } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { FC } from "react";
import scss from './LayoutPage.module.scss';
import Loading from "../preloading/Loading";

interface LayoutType {
  children: ReactNode;
}

const Layout: FC<LayoutType> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loading onFinished={() => setLoading(false)} />
      ) : (
        <div className={scss.Layout}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;