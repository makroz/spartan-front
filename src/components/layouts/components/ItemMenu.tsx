import Link from "next/link";
import React from "react";

const ItemMenu = ({ item, slug = "", active = "", config }: any) => {
  return (
    <li key={item.id}>
      <Link
        href={slug + item.link}
        className={
          (active == item.link ? "menuItemActive" : "menuItemNormal") +
          " menuItem"
        }
        style={
          active == item.link
            ? {
                background: config?.app?.colorSecondary,
              }
            : undefined
        }
      >
        {item.icon}
        <span className="flex-1 ml-3 whitespace-nowrap">{item.title}</span>
        {item.tag && (
          <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium  text-blue-600 bg-blue-200 rounded-full">
            {item.tag}
          </span>
        )}
      </Link>
    </li>
  );
};

export default ItemMenu;
