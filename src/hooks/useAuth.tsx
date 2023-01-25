import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useAuth = (ability = null, action) => {
  const router = useRouter();
  const data: any = useContext(AuthContext);
  if (ability && !data.userCan(ability, action)) router.push("/notAutorized");
  return data;
};

export default useAuth;
