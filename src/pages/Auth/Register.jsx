import { Link, useNavigate } from "react-router-dom";
import { loginForm } from "~/data/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerScheme } from "~/validation/scheme";
import { ring } from "ldrs";
import { useDispatch, useSelector } from "react-redux";
import { registerService } from "~/redux/slices/userSlice";
import toast from "react-hot-toast";
import Logo from "~/assets/signinlogo.svg";
import Logo2 from "~/assets/icon.svg";
import { useEffect } from "react";

const Register = () => {
  ring.register();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerScheme),
  });

  const { status } = useSelector((state) => state.user);

  const registerHandle = async (data) => {
    try {
      dispatch(registerService(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "failed") {
      toast.error("Bir hata ile karşılaştık, bilgilerinizi kontrol edin.");
    }
    if (status === "succeeded") {
      toast.success("Başarıyla kayıt oldunuz, yönlendiriliyorsunuz...");
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
          <h1 className="font-bold text-xl">Spendia'ya Kayıt Ol!</h1>
          <p className="text-sm text-zinc-400">
            E-Posta ve parolanı girerek sisteme kayıt olabilirsin.
          </p>
          <form
            className="w-1/2 mt-6 flex flex-col gap-y-4"
            onSubmit={handleSubmit(registerHandle)}
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
                className="text-sm font-semibold hover:text-zinc-500"
                to="/forgot-password"
              >
                Parolamı Unuttum
              </Link>
            </div>
            <button className="bg-primary flex justify-center items-center px-4 py-2 rounded-md text-secondary font-semibold hover:bg-secondary hover:text-primary transition-colors duration-300">
              {status === "loading" ? (
                <l-ring
                  size="24"
                  stroke="3"
                  bg-opacity="0"
                  speed="2"
                  color="#80bd3a"
                />
              ) : (
                "Kayıt Ol"
              )}
            </button>
            <div className="relative flex items-center w-full py-5">
              <div className="flex-grow h-px bg-zinc-700"></div>
              <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-zinc-700">
                OR
              </span>
              <div className="flex-grow h-px bg-zinc-700"></div>
            </div>
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

export default Register;
