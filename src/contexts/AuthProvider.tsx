import { createContext, useEffect, useState } from "react";
import LoginBasic from "../components/auth/LoginBasic";
import Spinner from "../components/layouts/Spinner";
import useAxios from "../hooks/useAxios";
import conf from "../../config/config";

export const AuthContext = createContext({});
const AuthProvider = ({ children, auth, guard = null }: any): any => {
  const { error, loaded, execute } = useAxios();
  const [user, setUser] = useState<any>(null);
  const [guardia, setGuardia] = useState(guard);
  const [config, setConfig]: any = useState(conf);
  const [load, setLoad]: any = useState(false);

  const getConfig = () => {
    let currentConfig: any = conf;
    try {
      currentConfig = config || JSON.parse(localStorage.getItem("config") + "");
    } catch (e) {
      currentConfig = null;
    }
    currentConfig = currentConfig || conf;
    if (guardia) {
      currentConfig.app.appName = guardia.title;
      currentConfig.app.appDescription = guardia.description;
      currentConfig.app.appLogoImage = guardia.logo || conf.app.appLogoImage;
      currentConfig.app.guard_id = guardia.id || null;
      currentConfig.app.link = guardia.link ? "/" + guardia.link : "";
      currentConfig.app.colorPrimary = guardia.color_primary;
      currentConfig.app.colorSecondary = guardia.color_secondary;
    }
    setConfig(currentConfig);
    setLoad(true);
  };

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
    if (guard) {
      credentials.guard = guard.id;
    }
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
    getConfig();
    getUser();
  }, []);

  // console.log("====================================");
  // console.log("config", config);
  // console.log("====================================");
  return (
    <AuthContext.Provider
      value={{ user, error, loaded, login, logout, config, guard }}
    >
      {loaded || <Spinner />}
      {auth && !user ? <LoginBasic /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
