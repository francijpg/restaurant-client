import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState();
  const { getUserByUserId } = useAuth();

  useEffect(() => {
    async function getUserObjByUserId(userId) {
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    }

    if (userId) {
      getUserObjByUserId(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { user: activeUser };
}
