import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { loginForm } from "~/data/data";
import { loginScheme } from "~/validation/scheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ring } from "ldrs";
import { useDispatch, useSelector } from "react-redux";
import { loginService, loginWithGoogle } from "~/redux/slices/userSlice";
import Logo from "~/assets/signinlogo.svg";
import Logo2 from "~/assets/icon.svg";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  ring.register();

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginScheme),
  });

  const googleLogIn = () => {
    try {
      dispatch(loginWithGoogle(provider));
    } catch (error) {
      console.error(error);
    }
  };

  const loginHandle = async (data) => {
    try {
      dispatch(loginService(data));
    } catch (error) {
      console.log(error);
    }
  };

  const { status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "failed") {
      toast.error("Bir hata ile karşılaştık, bilgilerinizi kontrol edin.");
    }
    if (status === "succeeded") {
      toast.success("Başarıyla giriş yaptınız, yönlendiriliyorsunuz...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [status]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex justify-center items-center h-screen flex-grow"
    >
      <div className="lg:w-1/2 w-full h-full lg:p-3 p-2">
        <div className="w-full h-full flex items-center lg:justify-center flex-col gap-1 p-4">
          <img
            src={Logo}
            className="w-12 drop-shadow-xl mb-6 hover:scale-105 transition-all duration-300 "
          />
          <h1 className="font-bold text-xl text-center">
            Tekrardan Spendia'ya Hoş Geldin!
          </h1>
          <p className="text-sm text-zinc-400 text-center">
            E-Posta ve parolanı girerek sisteme ulaşabilirsin.
          </p>
          <form
            className="lg:w-1/2 w-full mt-6 flex flex-col gap-y-4"
            onSubmit={handleSubmit(loginHandle)}
          >
            {loginForm.map((input) => (
              <div key={input.id} className="flex flex-col">
                <label
                  className={`text-xs font-semibold text-zinc-500 ${
                    errors[input.name] && "text-red-500"
                  }`}
                >
                  {input.label}
                </label>
                <input
                  type={input.type}
                  placeholder={
                    errors[input.name]
                      ? errors[input.name].message
                      : input.placeholder
                  }
                  className={`px-4 py-2 rounded-lg border outline-none text-sm ${
                    errors[input.name] &&
                    "border-red-500 placeholder:text-red-500"
                  }`}
                  {...register(input.name)}
                />
              </div>
            ))}
            <div className="w-full  flex justify-end items-center">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold hover:text-zinc-500"
              >
                Parolamı Unuttum
              </Link>
            </div>
            <button
              type="submit"
              className="bg-primary flex justify-center items-center px-4 py-2 rounded-md text-secondary font-semibold hover:bg-secondary hover:text-primary transition-colors duration-300"
            >
              {status === "loading" ? (
                <l-ring
                  size="24"
                  stroke="3"
                  bg-opacity="0"
                  speed="2"
                  color="#80bd3a"
                />
              ) : (
                "Giriş Yap"
              )}
            </button>
            <div className="relative flex items-center w-full py-5">
              <div className="flex-grow h-px bg-zinc-700"></div>
              <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-zinc-700">
                YA DA
              </span>
              <div className="flex-grow h-px bg-zinc-700"></div>
            </div>
            <div className=" w-full flex justify-center items-center gap-x-5">
              <button
                onClick={googleLogIn}
                type="button"
                className="bg-white border hover:border-zinc-700 transition-colors flex items-center gap-x-2 justify-center w-full px-4 py-2 rounded-md text-zinc-700 font-semibold"
              >
                <FcGoogle size={20} /> Google
              </button>
            </div>
          </form>
          <div className="w-full mt-5 flex justify-center items-center">
            <Link className="font-semibold hover:text-zinc-500" to="/register">
              Hesabınız yok mu? Kayıt olun
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full p-3 lg:block hidden">
        <div className="bg-[#202020] rounded-xl shadow-xl h-full flex justify-center items-center">
          <img src={Logo2} className="w-[700px] drop-shadow-custom" />
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
