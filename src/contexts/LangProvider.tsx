import { createContext, useEffect, useState } from "react";
import idioma from "../components/traductor/es";

export const LangContext = createContext({});
const LangProvider = ({ children }: any): any => {
  const [lang, setLang] = useState<any>({});
  const t = (s = "", p1 = "") => {
    let ini = "";
    let end = "";
    if (s.trim() == "") {
      return "";
    }
    if (s[0] == " ") ini = " ";
    if (s[s.length - 1] == " ") end = " ";

    s = s.trim();
    const upper = /^[A-Z0-9 ]+$/;
    const key = s.toLowerCase();
    let l = lang[key] || s;

    let c = ini + l + end;

    if (upper.test(s)) {
      c = ini + l.toUpperCase() + end;
    } else {
      if (upper.test(s[0])) {
        c = ini + l[0].toUpperCase() + l.substring(1) + end;
      }
    }
    // c = ini + c + end;
    if (p1 != "") c = c.replace("{0}", p1);
    return c;
  };
  useEffect(() => {
    if (idioma) setLang(idioma);
  }, [idioma]);
  console.log("====================================");
  console.log("lang", lang);
  console.log("====================================");
  if (JSON.stringify(lang) == JSON.stringify({})) return "Loading Languages...";
  return (
    <LangContext.Provider value={{ lang, t }}>{children}</LangContext.Provider>
  );
};

export default LangProvider;
