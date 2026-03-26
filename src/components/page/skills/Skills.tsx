import scss from "./Skills.module.scss";
import Image from "next/image";
import html_logo from "@/src/components/images/Без названия.png";
import css_logo from "@/src/components/images/Без названия (1).png";
import java_logo from "@/src/components/images/Без названия (2).png";
import axi_logo from "@/src/components/images/Без названия (7).png";
import api_logo from "@/src/components/images/images.png";
import zus_logo from "@/src/components/images/Без названия (3).png";
import rec_logo from "@/src/components/images/Без названия (6).png";
import _logo from "@/src/components/images/Без названия (7).jpg";
// import v_logo from "@/src/components/images/";
const Skills = () => {
  return (
    <div id="Skills">
      <div className="conteiner">
        <div className={scss.Skills}>
          <h1>Skills</h1>
          <div className={scss.Skills_logo}>
            <Image
              src={html_logo}
              alt="one"
              className={scss.html}
              width={110}
            />
            <Image
              src={css_logo}
              alt="one"
              className={scss.css}
              width={120}
              height={120}
            />
            <Image
              src={java_logo}
              alt="one"
              className={scss.java}
              width={210}
            />
            <Image
              src={axi_logo}
              alt="one"
              className={scss.axi}
              width={100}
            />
            <Image
              src={api_logo}
              alt="one"
              className={scss.api}
              width={100}
            />
            <Image
              src={zus_logo}
              alt="one"
              className={scss.zus}
              width={100}
            />
            <Image
              src={rec_logo}
              alt="one"
              className={scss.rec}
              width={100}
            />
            <Image
              src={_logo}
              alt="one"
              className={scss.node}
              width={120}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
