import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
  
    if (token && user) {
      setAccessToken(token);
      setUser(JSON.parse(user));
    }
  
    setLoading(false);
  }, []);


  const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
  
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    // optional: backend logout route later
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
