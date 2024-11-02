import { GoGoal } from "react-icons/go";
import { MdOutlineVerified } from "react-icons/md";
import {
  TbDoorExit,
  TbFlag,
  TbHome,
  TbMessageQuestion,
  TbMoneybag,
  TbPhoneCall,
  TbSettings,
  TbUser,
  TbUserCheck,
} from "react-icons/tb";

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
    label: "Bütçe",
    icon: TbMoneybag,
    path: "/budget-management",
  },
];

export const goalSide = [
  { id: 1, label: "Hedefler", icon: TbFlag, path: "/goals" },
  { id: 2, label: "Ayarlarım", icon: TbSettings, path: "settings" },
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
    placeholder: "Bütçe (Aylık Maaş)",
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
    id: 3,
    name: "email",
    placeholder: "E-posta Adresiniz",
    type: "email",
    icon: TbUserCheck,
  },
  { id: 4, name: "title", placeholder: "Konu", type: "text", icon: GoGoal },
  {
    id: 5,
    name: "message",
    placeholder: "Mesajınız",
    type: "text",
    icon: GoGoal,
  },
];
