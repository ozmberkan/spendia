import React, { useState } from "react";
import { TbFlag } from "react-icons/tb";
import Breadcrumb from "~/components/UI/Breadcrumb";
import GoalModal from "~/components/UI/Modals/GoalModal";
import Topbar from "~/components/UI/Topbar";

const Goal = () => {
  const [isGoalModal, setIsGoalModal] = useState(false);

  return (
    <>
      {isGoalModal && <GoalModal setIsGoalModal={setIsGoalModal} />}
      <div className="p-6 w-full h-full">
        <Topbar
          firstLabel={"Anasayfa"}
          firstLink={"/"}
          secondLabel={"Hedefler"}
        />
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-3xl font-bold text-primary">Hedeflerim</h1>
          <button
            onClick={() => setIsGoalModal(true)}
            className="px-4 py-2 rounded-md bg-primary text-secondary font-semibold flex items-center gap-x-1"
          >
            <TbFlag />
            Hedef Ekle
          </button>
        </div>
      </div>
    </>
  );
};

export default Goal;
