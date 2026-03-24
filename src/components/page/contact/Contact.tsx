"use client";

import { useState } from "react";
import scss from "./Contact.module.scss";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const ID = process.env.NEXT_PUBLIC_TG_ID;
  const TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;

  const addMessageTelegram = async () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      subject.trim() === "" ||
      message.trim() === ""
    ) {
      toast.error("Пожалуйста заполните все поля");
      return;
    }

    const message_text = `
📩 *New Contact Form Message*

👤 *Name:* ${name}
📧 *Email:* ${email}
📌 *Subject:* ${subject}

💬 *Message:*
${message}

🕒 Sent from website
`;

    try {
      await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: ID,
        text: message_text,
        parse_mode: "Markdown",
      });

      toast.success("Сообщение успешно отправлено ✅");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error("Ошибка при отправке сообщения ❌");
      console.error(error);
    }
  };

  return (
    <section id="Contact">
      <div className="container">
        <div className={scss.Test}>
          <h1>Contact</h1>

          <div className={scss.Test_form}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Your phone"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={addMessageTelegram}>SEND</button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </section>
  );
};

export default Contact;
