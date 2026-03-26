"use client"
import { useState } from "react";
import scss from "./Header.module.scss";
import Image from "next/image";
import header_logo from "@/src/components/images/Без названия (5).png";
import Loading from "@/src/components/preloading/Loading";

const router = [
  { id: 1, href: "Home", name: "Home" },
  { id: 2, href: "About Me", name: "About Me" },
  { id: 3, href: "Skills", name: "Skills" },
  { id: 4, href: "Contact", name: "Contact" },
];

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);

const addSections = (id: string) => {
  setIsLoading(true);

  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, 800); 

  setTimeout(() => {
    setIsLoading(false);
  }, 2000); 
};


  return (
    <>
      {isLoading && (
        <div className={scss.fullScreenLoader}>
           <Loading onFinished={() => setIsLoading(false)}/>
        </div>
      )}

      <header id={scss.Header} className={scss.headerMain}>
        <div className="conteiner">
          <div className={scss.Header_inner}>
            <Image width={130} height={100} src={header_logo} alt="img" />
            <div className={scss.Header_nav}>
              {router.map((el) => (
                <h3 onClick={() => addSections(el.href)} key={el.id}>
                  {el.name}
                </h3>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;