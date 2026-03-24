"use client";
import React, { useState, useEffect } from "react";
import scss from "./Home.module.scss";
import Image from "next/image";
import my_image from "@/src/components/images/photo_2026-03-19_14-16-13.jpg";

const Home = () => {
  const [name, setName] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedName = localStorage.getItem("user_name");
    
    if (savedName) {
      setName(savedName);
    } else {
      const timer = setTimeout(() => {
        const inputName = prompt("Салам! Сиздин атыңыз ким?");
        if (inputName && inputName.trim() !== "") {
          localStorage.setItem("user_name", inputName);
          setName(inputName);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div id="Home">
      <div className="container">
        <div className={scss.Home}>
          <div className={scss.Home_nav}>
            {name && (
              <div className={scss.welcomeBadge}>
                Салам, {name}! Кош келдиңиз.
              </div>
            )}

            <h1>
              Hi, I am Ryskeldiev <span className={scss.Me}>Muhammed</span> Keneshbekovich
            </h1>
            
            <div className={scss.Home_line}></div>
            
            <h4>I am a <span>Frontend Developer</span></h4>
            <p>
              I enjoy turning ideas into interactive interfaces that not only 
              look good but also perform well across devices
            </p>
          </div>

          <div className={scss.My_image}>
            <Image 
              src={my_image} 
              alt="king" 
              width={500} 
              height={700} 
              className={scss.main_image} 
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;