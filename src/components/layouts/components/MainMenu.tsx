import { useRouter } from "next/router";
import React, { useState } from "react";
import { ChevronRight } from "react-feather";
import { mainMenu } from "../../../../config/mainMenu";
import useAuth from "../../../hooks/useAuth";
import ItemMenu from "./ItemMenu";

const MainMenu = ({ config, onVisible, visible }: any) => {
  const [menu, setMenu]: any = useState(mainMenu);
  const { userCan }: any = useAuth();
  const router = useRouter();
  const slug = config?.app?.link || "";
  let active = router.route;
  if (active.indexOf("]") >= 0) {
    active = active.substring(active.indexOf("]") * 1 + 1);
    if (active == "") {
      active = "/";
    }
  }
  return (
    <ul className="space-y-2">
      {menu.map((item, index) => {
        if (item.type === "separator") return <hr key={index} />;
        if (item.ability && userCan(item.id, "R") === false) return null;
        if (item.children)
          return (
            <li key={item.id + "-" + index}>
              <div
                className={
                  (item.open === true ? "text-secondary" : "menuItemNormal") +
                  " menuItem"
                }
                onClick={(e) => {
                  menu[index].open = menu[index].open !== true;
                  setMenu([...menu]);
                }}
              >
                <span className="w-4">{item.icon}</span>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {item.title}
                </span>
                {/* <span className="flex-1 whitespace-nowrap">{item.title}</span> */}
                <span className="inline-flex items-center justify-center text-sm font-medium ">
                  <ChevronRight
                    className={
                      (item.open === true
                        ? "transform rotate-90"
                        : "transform rotate-0 ") + " transition-all "
                    }
                  />
                </span>
              </div>
              <ul
                id={`dropdown-${item.id}`}
                className={
                  (item.open !== true || !visible ? "hidden" : null) +
                  " py-2 space-y-2 px-8 pr-0 md:" +
                  (item.open === true ? "block" : null)
                }
              >
                {item.children.map((item2) => {
                  return (
                    <ItemMenu
                      key={item2.id}
                      item={item2}
                      slug={slug}
                      config={config}
                      active={active}
                      onVisible={onVisible}
                    />
                  );
                })}
              </ul>
            </li>
          );
        return (
          <ItemMenu
            key={item.id}
            item={item}
            slug={slug}
            active={active}
            config={config}
            onVisible={onVisible}
          />
        );
      })}
    </ul>
  );
};

export default MainMenu;
