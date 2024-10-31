import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "react-router-dom";
import { auth, db } from "~/firebase/firebase";

export const authLoader = (requiredRoles) => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        resolve(redirect("/login"));
      } else {
        const userref = doc(db, "users", user.uid);
        const userDoc = await getDoc(userref);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (requiredRoles.includes(userData.role)) {
            resolve(null);
          } else {
            resolve(redirect("/login"));
          }
        } else {
          resolve(redirect("/login"));
        }
      }
    });
  });
};
