import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useAuth: any = (ability = null, action = null) => {
  const router = useRouter();
  const data: any = useContext(AuthContext);
  if (ability && !data.userCan(ability, action)) router.push("/403");
  return data;
};

export default useAuth;
