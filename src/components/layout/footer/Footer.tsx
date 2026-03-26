"use client"
import { useState } from "react";
import scss from "./Footer.module.scss";
import Image from "next/image";
import footer_logo from "@/src/components/images/Без названия (5).png";
import Loading from "@/src/components/preloading/Loading";

const router = [
  { id: 1, href: "Home", name: "Home" },
  { id: 2, href: "About Me", name: "About Me" },
  { id: 3, href: "Skills", name: "Skills" },
  { id: 4, href: "Contact", name: "Contact" },
];

const Footer = () => {
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

      <footer className={scss.Footer}>
        <div className="conteiner">
          <div className={scss.Footer_inner}>
            {/* Логотип бөлүгү */}
            <div className={scss.Footer_logo}>
              <Image width={100} height={80} src={footer_logo} alt="footer logo" />
              <p>© 2026 Your Name. All rights reserved.</p>
            </div>

            {/* Навигация бөлүгү */}
            <nav className={scss.Footer_nav}>
              {router.map((el) => (
                <p onClick={() => addSections(el.href)} key={el.id} className={scss.nav_link}>
                  {el.name}
                </p>
              ))}
            </nav>

{/* Социалдык тармактар бөлүгү */}
<div className={scss.Footer_socials}>
   {/* "your_username" деген жерге өзүңүздүн Телеграмдагы никнеймиңизди жазыңыз */}
   <a 
     href="https://t.me/@muha_dev07" 
     target="_blank" 
     rel="noopener noreferrer"
   >
     Telegram
   </a>
   
   <a href="https://github.com/mukukeneshov-svg" target="_blank" rel="noopener noreferrer">
     GitHub
   </a>
   
   <a href="https://linkedin.com/in/your_linkedin" target="_blank" rel="noopener noreferrer">
     LinkedIn
   </a>
</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;