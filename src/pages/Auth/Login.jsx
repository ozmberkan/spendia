// Login Component
import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

import Logo from "~/assets/signinlogo.svg";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-grow">
      <div className="w-1/2 h-full p-3">
        <div className="w-full h-full flex items-center justify-center flex-col gap-1 p-4">
          <img src={Logo} className="w-12 drop-shadow-xl mb-6" />
          <h1 className="font-bold text-xl">
            Tekrardan Spendia'ya Hoş Geldin!
          </h1>
          <p className="text-sm text-zinc-400">
            E-Posta ve parolanı girerek sisteme ulaşabilirsin.
          </p>
          <form className="w-1/2 mt-6 flex flex-col gap-y-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-zinc-500">
                E-Posta
              </label>
              <input
                type="text"
                placeholder="E-Postanızı giriniz..."
                className="px-4 py-2 rounded-lg border"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-zinc-500">
                Parola
              </label>
              <input
                type="password"
                placeholder="Parolanızı giriniz..."
                className="px-4 py-2 rounded-lg border"
              />
            </div>
            <div className="w-full  flex justify-end items-center">
              <Link className="text-sm font-semibold hover:text-zinc-500">
                Şifremi Unuttum
              </Link>
            </div>
            <button className="bg-primary px-4 py-2 rounded-md text-secondary font-semibold">
              Giriş Yap
            </button>
            <div className="relative flex items-center w-full py-5">
              <div className="flex-grow h-px bg-zinc-700"></div>
              <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-zinc-700">
                OR
              </span>
              <div className="flex-grow h-px bg-zinc-700"></div>
            </div>
            <div className=" w-full flex justify-center items-center gap-x-5">
              <button className="bg-white border flex items-center gap-x-2 justify-center w-full px-4 py-2 rounded-md text-zinc-700 font-semibold">
                <FcGoogle size={20} /> Google
              </button>{" "}
              <button className="bg-white border flex items-center gap-x-2 justify-center w-full px-4 py-2 rounded-md text-zinc-700 font-semibold">
                <FaApple size={20} className="text-black" />
                Apple
              </button>
            </div>
            <div className="w-full mt-5 flex justify-center items-center">
              <span>
                Hesabınız yok mu?{" "}
                <Link className="font-semibold" to="/register">
                  Kayıt olun
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-full  p-3">
        <div className="bg-[#202020] rounded-xl shadow-xl h-full"></div>
      </div>
    </div>
  );
};

export default Login;
