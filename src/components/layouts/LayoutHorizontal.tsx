import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Toast from "../ui/Toast";

const LayoutHorizontal = ({ children }) => {
  const { user, config }: any = useAuth();
  const [visible, setVisible]: any = useState(false);

  const onVisible = (e) => {
    if (e === false) {
      setVisible(false);
      return;
    }
    setVisible(!visible);
  };

  const onResize = (e) => {
    setVisible(false);
  };
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!user) return children;
  return (
    <div className="relative flex flex-row min-h-screen h-full gap-0 w-full">
      <Toast />
      <div
        className={`${
          visible ? "w-[280px] min-w-[280px]" : "w-[40px] min-w-[40px]"
        }  bg-primary px-2  md:w-[280px] md:min-w-[280px] transition-all  `}
      >
        <Sidebar config={config} onVisible={onVisible} visible={visible} />
      </div>
      <div className="flex flex-col  bg-blue-200 flex-grow overflow-auto">
        <Navbar onVisible={onVisible} visible={visible} />
        <div
          className={`${
            visible ? "whitespace-nowrap" : ""
          }  m-2 mt-0 md:m-8 md:mt-2  min-w-screen`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutHorizontal;
