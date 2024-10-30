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
