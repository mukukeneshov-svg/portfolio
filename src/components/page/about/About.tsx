"use client"; // Эгер Next.js App Router колдонуп жатсаң, бул маанилүү

import { useState, useEffect } from "react";
import scss from "./About.module.scss";
import Image from "next/image";
import logo from "@/src/components/images/Без названия (5).jpg";

const About = () => {
  const [description, setDescription] = useState("");

  const defaultText = `Are you looking for a frontend developer who blends creativity 
  with clean, functional code? That's where I come in! I specialize in crafting 
  responsive, user-focused web interfaces...`;

  useEffect(() => {
    const savedText = localStorage.getItem("about_me_text");
    if (savedText) {
      setDescription(savedText);
    } else {
      setDescription(defaultText);
    }
  }, []);

  const handleSave = (newText:string) => {
    setDescription(newText);
    localStorage.setItem("about_me_text", newText);
  };

  return (
    <div id="About Me">
      <div className="container"> 
        <div className={scss.About}>
          <div className={scss.About_nav}>
            <div className={scss.About_image}>
              <Image src={logo} alt="L" width={400} height={550} priority />
            </div>
            <div className={scss.About_information}>
              <h1>About Me</h1>
              <div className={scss.About_line}></div>
              <h4>
                Hi there! I'm Muhammed - Your Creative & Code-Driven Frontend Developer
              </h4>
              
              <p>{description}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;