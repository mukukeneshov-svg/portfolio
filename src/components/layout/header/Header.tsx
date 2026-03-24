"use client"
import Link from "next/link";
import scss from "./Header.module.scss";
import Image from "next/image";
import header_logo from "@/src/components/images/Без названия (5).png"

// "https://www.pngplay.com/wp-content/uploads/13/Symbol-Logo-Transparent-Image.png";
const router = [
  {
    id: 1,
    href: "Home",
    name: "Home",
  },
  {
    id: 2,
    href: "About Me",
    name: "About Me",
  },
  {
    id: 3,
    href: "Skills",
    name: "Skills",
  },
  {
    id: 4,
    href: "Contact",
    name: "Contact",
  },
];

const addSections = (id:string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({
    behavior:"smooth",
    block:"start",
  });
}

const Header = () => {
  return (
    <header id={scss.Header}>
      <div className="conteiner">
        <div className={scss.Header}>
          <Image width={130} height={100} src={header_logo} alt="img" />
          <div className={scss.Header_nav}>
         {router.map((el) => (
          <h3 onClick={() => addSections(el.href)} key={el.id}>{el.name}</h3>
         ))}
          </div>
          {/* <div className={scss.Header_buttons}> */}
            {/* <button>Sign in</button>
            <button>Sign up</button> */}
          {/* </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
