import z from "zod";

export const loginScheme = z.object({
  email: z
    .string()
    .min(1, "E-Posta alanı boş bırakılamaz")
    .email("Geçerli bir E-Posta adresi giriniz"),
  password: z.string().min(1, "Parola alanı boş bırakılamaz"),
});

export const registerScheme = z.object({
  email: z
    .string()
    .min(1, "E-Posta alanı boş bırakılamaz")
    .email("Geçerli bir E-Posta adresi giriniz"),
  password: z.string().min(1, "Parola alanı boş bırakılamaz"),
});

export const contactsScheme = z.object({
  name: z.string().min(1, "Ad alanı boş bırakılamaz"),
  email: z.string().email("Geçerli bir E-Posta adresi giriniz"),
  title: z.string().min(1, "Konu alanı boş bırakılamaz"),
  message: z.string().min(1, "Mesaj alanı boş bırakılamaz"),
});
