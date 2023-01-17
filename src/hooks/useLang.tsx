import { useContext } from "react";
import { LangContext } from "../contexts/LangProvider";

const useLang = () => {
  const data = useContext(LangContext);
  return data;
};

export default useLang;
