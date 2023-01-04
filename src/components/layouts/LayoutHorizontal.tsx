import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Circle,
  Menu,
  XCircle,
} from "react-feather";
import config from "../../config";
import useAuth from "../../hooks/useAuth";
import { mainMenu } from "../../mainMenu";
import { initialsName } from "../../utils/string";
import DropDown from "../DropDown";

const LayoutHorizontal = ({ children }) => {
  const { user, logout }: any = useAuth();
  const [menu, setMenu]: any = useState(mainMenu);
  const router = useRouter();
  const [dropUser, setDropUser] = useState(false);
  const [visible, setVisible] = useState(false);

  const onVisible = (e) => {
    setVisible(!visible);
  };
  // const avatarName = (name: string) => {
  //   const names = (name + " ").split(" ");
  //   return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase().trim();
  // };

  const handleClickOutside = (e) => {
    setVisible(false);
  };
  useEffect(() => {
    window.addEventListener("resize", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleClickOutside);
    };
  }, []);

  if (!user) return children;
  return (
    <div className="grid grid-cols-[300px__1fr] min-h-screen h-full">
      <div
        className={`${visible ? " block" : "md:block hidden"}  bg-primary px-2`}
      >
        <div className="p-0 flex items-center ">
          <Image
            src={config.app.appLogoImage}
            alt="logo"
            className="m-2"
            width={50}
          />
          <div className="logoTitle text-secondary">{config.app.appName}</div>
          <XCircle
            onClick={onVisible}
            size={18}
            className="text-white absolute top-1 md:hidden"
          />
        </div>
        <div className="py-4 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-2">
            {menu.map((item, index) => {
              if (item.type === "separator") return <hr key={index} />;
              if (item.children)
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={
                        (item.open === true
                          ? "menuItemActive"
                          : "menuItemNormal") + " menuItem w-full"
                      }
                      onClick={(e) => {
                        menu[index].open = menu[index].open !== true;
                        setMenu([...menu]);
                      }}
                    >
                      {item.icon}
                      <span className="flex-1 ml-3 text-left whitespace-nowrap">
                        {item.title}
                      </span>

                      <span className="inline-flex items-center justify-center">
                        {item.open !== true ? (
                          <ChevronRight />
                        ) : (
                          <ChevronDown />
                        )}
                      </span>
                    </button>
                    <ul
                      id={`dropdown-${item.id}`}
                      className={
                        (item.open !== true ? "hidden" : null) +
                        " py-2 space-y-2"
                      }
                    >
                      {item.children.map((item2) => {
                        return (
                          <li key={item2.id} className="px-4 pr-0">
                            <Link
                              href={item2.link}
                              className="flex items-center p-2 text-base font-normal text-textMenu rounded-lg hover:px-4 hover:pr-0"
                            >
                              {item2.icon || <Circle size={12} />}
                              <span className="flex-1 ml-3 whitespace-nowrap">
                                {item2.title}
                              </span>
                              {item2.tag && (
                                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium  text-blue-600 bg-blue-200 rounded-full">
                                  {item2.tag}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              return (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className={
                      (router.route == item.link
                        ? "menuItemActive"
                        : "menuItemNormal") + " menuItem"
                    }
                  >
                    {item.icon}
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      {item.title}
                    </span>
                    {item.tag && (
                      <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium  text-blue-600 bg-blue-200 rounded-full">
                        {item.tag}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className={`${
          visible ? " col-span-1" : "col-span-2 md:col-span-1"
        }  bg-white flex flex-col h-full`}
      >
        <div className="navbar">
          <div>
            <Menu className="block md:hidden" onClick={onVisible} />
          </div>
          <div
            className="flex items-center align-middle gap-2"
            onClick={(e) => setDropUser(!dropUser)}
          >
            <div>
              <div className="text-title">{user.name}</div>
              <div className="text-subTitle text-xs">{user.rol}</div>
            </div>
            <div className="relative">
              {user.photoURL && (
                <img
                  className="w-10 h-10 rounded-full"
                  src="/docs/images/people/profile-picture-5.jpg"
                  alt=""
                />
              )}
              {!user.photoURL && (
                <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {initialsName(user.name)}
                  </span>
                </div>
              )}
              <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              <DropDown open={dropUser} onClose={setDropUser}>
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => logout()}
                  >
                    Sign out
                  </a>
                </div>
              </DropDown>
            </div>
          </div>
        </div>
        <div className="h-full m-8">{children}</div>
      </div>
    </div>
  );
};

export default LayoutHorizontal;
