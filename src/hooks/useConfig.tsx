import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useConfig = () => {
  const { config }: any = useContext(AuthContext);
  return config;
};

export default useConfig;
