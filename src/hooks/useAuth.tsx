import useAxios from "./useAxios";
import { useState, useEffect } from "react";

const useAuth = () => {
  const { data, error, loaded, execute } = useAxios();
  const [user, setUser] = useState<any>(null);

  const getUser = () => {
    let currentUser = null;
    try {
      currentUser = user || JSON.parse(localStorage.getItem("token") + "").user;
    } catch (e) {
      currentUser = null;
    }
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  };

  const login = async (credentials: any) => {
    setUser(null);

    const {
      data: { data },
      error,
    }: any = await execute("/admin-login", "POST", credentials);

    if (data.status === "ok") {
      console.log("Loguedo", data);
      setUser(data.user);
      localStorage.setItem(
        "token",
        JSON.stringify({ token: data.token, user: data.user })
      );
      return { user: data.user };
    } else {
      console.log("====================================");
      console.log("Error1", data);
      console.log("====================================");
      return { user, errors: data.errors };
    }
  };
  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    const {
      data: { data },
      error,
    }: any = await execute("/admin-logout", "POST");

    if (data.status === "ok") {
      console.log("Logout", data);
      return;
    } else {
      console.log("====================================");
      console.log("Error1", data);
      console.log("====================================");
      return { user, errors: data.errors };
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user, error, loaded, login, logout };
};

export default useAuth;
