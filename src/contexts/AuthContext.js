import { createContext, useContext, useEffect, useState } from "react";
import services from "../services";

const { auth, database, firebaseApp } = services;

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  // const [loading, setLoading] = useState(true);

  const setSignUp = async ({ name, email, password }) => {
    // 1. validate if username exists inside firebase
    // 2. create user
    const createdUserResult = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const { user } = createdUserResult;
    // 3. save user with the correct format
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
      setCurrentUser(user);
      console.log(user);
      // setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setSignUp,
    setLogIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  );
}
