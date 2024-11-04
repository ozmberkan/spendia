import { GoGoal } from "react-icons/go";
import { MdOutlineVerified } from "react-icons/md";
import {
  TbBell,
  TbDoorExit,
  TbFlag,
  TbHistory,
  TbHome,
  TbMessageQuestion,
  TbMoneybag,
  TbPhoneCall,
  TbSettings,
  TbUser,
  TbUserCheck,
} from "react-icons/tb";

import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";

export const loginForm = [
  {
    id: 1,
    label: "E-Posta",
    placeholder: "E-Posta Giriniz..",
    type: "text",
    name: "email",
  },
  {
    id: 2,
    label: "Parola",
    placeholder: "Parola Giriniz..",
    type: "password",
    name: "password",
  },
];

export const mainSide = [
  { id: 1, label: "Anasayfa", icon: TbHome, path: "/" },
  { id: 2, label: "Profilim", icon: TbUser, path: "/profile" },

  {
    id: 3,
    label: "Gelirlerim",
    icon: GiReceiveMoney,
    path: "/incomes",
  },
  {
    id: 4,
    label: "Giderlerim",
    icon: GiPayMoney,
    path: "/expenses",
  },
];

export const goalSide = [
  { id: 1, label: "Hedefler", icon: TbFlag, path: "/goals" },
  { id: 2, label: "Geçmiş", icon: TbHistory, path: "/history" },
];

export const bottomSide = [
  {
    id: 1,
    label: "Premium",
    icon: MdOutlineVerified,
    path: "/premium",
    type: "link",
  },
  {
    id: 2,
    label: "İletişim",
    icon: TbMessageQuestion,
    path: "/contacts",
    type: "link",
  },

  { id: 3, label: "Çıkış Yap", icon: TbDoorExit, type: "button" },
];

export const profileInputs = [
  {
    id: 1,
    placeholder: "İsim Soyisim",
    name: "displayName",
    icon: TbUserCheck,
  },
  {
    id: 2,
    placeholder: "Telefon Numarası",
    name: "phoneNumber",
    icon: TbPhoneCall,
  },
  {
    id: 3,
    placeholder: "Ana Gelirim (Aylık Maaş)",
    name: "monthlyBudget",
    icon: TbMoneybag,
  },
];

export const contactsInputs = [
  {
    id: 1,
    name: "name",
    placeholder: "İsim Soyisim",
    type: "text",
    icon: TbUserCheck,
  },
  {
    id: 2,
    name: "email",
    placeholder: "E-posta Adresiniz",
    type: "email",
    icon: TbUserCheck,
  },
  { id: 3, name: "title", placeholder: "Konu", type: "text", icon: GoGoal },
  {
    id: 4,
    name: "message",
    placeholder: "Mesajınız",
    type: "text",
    icon: GoGoal,
  },
];
