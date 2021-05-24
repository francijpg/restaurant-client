import { createContext, useContext, useEffect, useState } from "react";
import services from "../services";

const { auth, database, firebaseApp } = services;

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const [needVerification, setNeedVerification] = useState(false);
  // const [loading, setLoading] = useState(true);

  const checkUserNameExist = async (username) => {
    const result = await database.users
      .where("userName", "==", username.toLowerCase())
      .get();
    return result.docs.map((user) => user.data().length > 0);
  };

  const setSignUp = async ({ name, email, password }) => {
    const createdUserResult = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const { user } = createdUserResult;

    if (user) {
      await user.updateProfile({ displayName: name });
      const userData = {
        userName: name.toLowerCase(),
        email: email.toLowerCase(),
        id: user.uid,
        createdAt: firebaseApp.firestore.FieldValue.serverTimestamp(),
      };
      await database.users.doc(user.uid).set(userData);

      setNeedVerification(true);
      await user.sendEmailVerification();
    }
  };

  const setLogIn = async ({ email, password }) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const setLogOut = () => {
    setCurrentUser(null);
    return auth.signOut();
  };

  const getUserByUserId = async (userId) => {
    const result = await database.users.where("id", "==", userId).get();
    return result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setCurrentUser(authUser);

        const { emailVerified } = authUser;

        if (!emailVerified) {
          setNeedVerification(true);
        }
      } else {
        localStorage.removeItem("authUser");
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    needVerification,
    setSignUp,
    setLogIn,
    setLogOut,
    checkUserNameExist,
    getUserByUserId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
