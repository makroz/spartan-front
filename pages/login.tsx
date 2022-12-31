import Image from "next/image";
import { NextPage } from "next/types";
import React from "react";
import Login from "../src/components/auth/Login";
import config from "../src/config";

const loginPage: NextPage = () => {
  return (
    <>
      <div className="absolute p-0 flex items-center ">
        <Image src={config.app.appLogoImage} alt="logo" className="m-5" />
        <div className="logoTitle">{config.app.appName}</div>
      </div>
      <div className="grid grid-cols-10 w-full h-screen ">
        <div className="items-center  hidden p-5 pt-24 md:col-span-7 md:flex bg-[#F8F8F8]">
          <img
            src="/assets/images/coverLogin.svg"
            alt="Login Cover"
            className="mx-auto"
          />
        </div>
        <div className="col-span-10 p-5 pt-24 md:col-span-3 bg-white  flex items-center">
          <Login></Login>
        </div>
      </div>
    </>
  );
};

export default loginPage;
