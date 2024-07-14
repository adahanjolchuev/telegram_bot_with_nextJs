"use client";
import axios from "axios";
import scss from "./ContactTelegram.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormTelegram {
  username: string;
  subject: string;
  description: string;
  email: string;
}

const ContactTelegram = () => {
  const { register, handleSubmit, reset } = useForm<IFormTelegram>();

  const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
  console.log(TOKEN);
  const CHAT_ID = process.env.NEXT_PUBLIC_CHAT_ID

  const messageModel = (data: IFormTelegram) => {
    let messageTG = `Username: <b> ${data.username} </b>\n`;
    messageTG += `Subject: <b> ${data.subject} </b>\n`;
    messageTG += `Description: <b> ${data.description} </b>\n`;
    messageTG += `Email: <b> ${data.email} </b>;`;
    return messageTG;
  };

  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: messageModel(data)
    })
     
  };

  return (
    <div className={scss.contactTelegram}>
      <div className="container">
        <div className={scss.content}>
          <h1>contactTelegram</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="username"
              {...register("username", { required: true })}
            />

            <input
              type="text"
              placeholder="subject"
              {...register("subject", { required: true })}
            />

            <input
              type="text"
              placeholder="description"
              {...register("description", { required: true })}
            />
            <input
              type="text"
              placeholder="email"
              {...register("email", { required: true })}
            />
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactTelegram;
