import { createContext, useContext, useEffect, useState } from "react";
import services from "../services";

const { auth, database, firebaseApp } = services;

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// const initialState = {
//   user: null,
//   authenticated: false,
//   needVerification: false,
// };

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
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
      // 4. verify account via email
      setNeedVerification(true);
      await user.sendEmailVerification();
    }
  };

  const setLogIn = async ({ email, password }) => {
    try {
      return auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setCurrentUser(user);
        const { emailVerified } = user;

        if (!emailVerified) {
          setNeedVerification(true);
        }
      }
      // setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    needVerification,
    setSignUp,
    setLogIn,
    checkUserNameExist,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  );
}
