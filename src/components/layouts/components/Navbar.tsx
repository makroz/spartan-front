import React, { useState } from "react";
import { Menu } from "react-feather";
import useAuth from "../../../hooks/useAuth";
import { initialsName } from "../../../utils/string";
import t from "../../../utils/traductor";
import DropDown from "../../DropDown";

const Navbar = ({ onVisible = null }: any) => {
  const { user, logout }: any = useAuth();
  const [dropUser, setDropUser] = useState(false);

  return (
    <div className="navbar">
      <div>
        {onVisible && <Menu className="block md:hidden" onClick={onVisible} />}
      </div>
      <div
        className="flex items-center align-middle gap-2"
        onClick={(e) => setDropUser(!dropUser)}
      >
        <div>
          <div className="text-title">{user.name}</div>
          <div className="text-subTitle text-xs">{t(user.rol)}</div>
        </div>
        <div className="relative">
          {user.photoURL && (
            <img
              className="w-10 h-10 rounded-full"
              src="/images/people/profile-picture-5.jpg"
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
          <DropDown open={dropUser} onOpen={setDropUser}>
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {t("Settings")}
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={() => logout()}
              >
                {t("Sign out")}
              </a>
            </div>
          </DropDown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
