"use client"
import { ReactNode, useEffect, useState } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { FC } from "react";
import scss from './LayoutPage.module.scss'
import Loading from "../preloading/Loading";

interface LayoutType {
  children: ReactNode;
}
const Layout: FC<LayoutType> = ({ children }) => {
  const [loading,setLoading] = useState<boolean>(true);

  useEffect(() => {
  setTimeout(() => {
 setLoading(false);
  }, 2000);
  }, [])

  return (
   <>
   {
    loading ? (<Loading/>):(
       <div className={scss.Layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
    )
   }
   </>
  );
};

export default Layout;
