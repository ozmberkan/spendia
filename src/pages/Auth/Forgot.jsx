import { Link, useNavigate } from "react-router-dom";
import { ring } from "ldrs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "~/firebase/firebase";
import Logo from "~/assets/signinlogo.svg";
import Logo2 from "~/assets/icon.svg";
import toast from "react-hot-toast";

const Forgot = () => {
  ring.register();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgotHandle = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(
        "Parola sıfırlama bağlantısı e-posta adresinize gönderildi."
      );
      setEmail("");
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
    <div className="flex justify-center items-center h-screen flex-grow">
      <div className="w-1/2 h-full p-3">
        <div className="w-full h-full flex items-center justify-center flex-col gap-1 p-4">
          <img
            src={Logo}
            className="w-12 drop-shadow-xl mb-6 hover:scale-105 transition-all duration-300"
          />
          <h1 className="font-bold text-xl">Parolamı Unuttum</h1>
          <p className="text-sm text-zinc-400">
            E-Posta girerek parola sıfırlama bağlantısına ulaşabilirsin.
          </p>
          <form className="w-1/2 mt-6 flex flex-col gap-y-4">
            <div className="flex flex-col">
              <label className={`text-xs font-semibold text-zinc-500 `}>
                E-Posta
              </label>
              <input
                type="email"
                placeholder="E-Posta giriniz.."
                className={`px-4 py-2 rounded-lg border outline-none text-sm`}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              onClick={forgotHandle}
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
                "Gönder"
              )}
            </button>
          </form>
          <div className="w-full mt-5 flex justify-center items-center">
            <Link className="font-semibold hover:text-zinc-500" to="/login">
              Hesabınız var mı? Giriş yapın
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full p-3">
        <div className="bg-[#202020] rounded-xl shadow-xl h-full flex justify-center items-center">
          <img src={Logo2} className="w-[700px] drop-shadow-custom" />
        </div>
      </div>
    </div>
  );
};

export default Forgot;
