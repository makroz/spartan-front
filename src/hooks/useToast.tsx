import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useToast = () => {
  const { toast, setToast }: any = useContext(AuthContext);
  const showToast = (message = "", type = "success", time = 5000) => {
    if (setToast) setToast({ msg: message, type, time });
  };

  return { toast, showToast };
};

export default useToast;
