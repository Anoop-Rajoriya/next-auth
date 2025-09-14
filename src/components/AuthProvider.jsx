"use client";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginUser = useCallback(async () => {
    setLoading(true);
    try {
      const user = await axios.get("/api/me");
      setUser({
        ...user.data.data,
        createdAt: new Date(user.data.data.createdAt).toLocaleString(),
        updatedAt: new Date(user.data.data.updatedAt).toLocaleString(),
      });
    } catch (error) {
      console.error("AuthProvider error: ", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logoutUser = useCallback(async () => {
    try {
      await axios.get("/api/logout");
      setUser(null);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (user) return;

    (async function () {
      await loginUser();
    })();
  }, [logoutUser]);

  return (
    <UserContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  return useContext(UserContext);
}
