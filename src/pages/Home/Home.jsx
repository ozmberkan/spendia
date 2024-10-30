import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "~/firebase/firebase";
import { signOut } from "firebase/auth";

const Home = () => {
  const { user } = useSelector((store) => store.user);

  const navigate = useNavigate();

  const exit = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      toast.success("Çıkış yapıldı");
      window.location.reload();
    } catch (error) {}
  };

  return <div>{user ? <button onClick={exit}>çıkış yap</button> : "home"}</div>;
};

export default Home;
