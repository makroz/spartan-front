import { createContext, useEffect, useState } from "react";
import LoginBasic from "../components/auth/LoginBasic";
import Spinner from "../components/layouts/Spinner";
import config from "../../config/config";
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext({});
const AuthProvider = ({ children, auth }: any): any => {
  const { error, loaded, execute } = useAxios();
  const [user, setUser] = useState<any>(null);

  const getUser = () => {
    let currentUser = null;
    try {
      currentUser = user || JSON.parse(localStorage.getItem("token") + "").user;
    } catch (e) {
      currentUser = null;
    }
    setUser(currentUser);
  };

  const login = async (credentials: any) => {
    setUser(null);

    const { data, error }: any = await execute(
      config.auth.login,
      "POST",
      credentials
    );

    if (data?.success && !error) {
      // console.log("Loguedo", data);
      setUser(data?.data?.user);
      localStorage.setItem(
        "token",
        JSON.stringify({ token: data?.data?.token, user: data?.data?.user })
      );
      return { user: data?.data?.user };
    } else {
      console.log("====================================");
      console.log("Error1", data, error);
      console.log("====================================");
      return { user, errors: data?.errors || data?.message || error };
    }
  };
  const logout = async () => {
    const { data, error }: any = await execute(config.auth.logout, "POST");
    localStorage.removeItem("token");
    setUser(null);
    if (data?.success) {
      // console.log("Logout", data);
      return;
    } else {
      console.log("====================================");
      console.log("Error1", data);
      console.log("====================================");
      return { user, errors: data?.errors || data?.message || error };
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, error, loaded, login, logout }}>
      {loaded || <Spinner />}
      {auth && !user ? <LoginBasic /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
