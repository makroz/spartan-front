import { Home, Users, Circle, Settings } from "react-feather";
export const mainMenu = [
  {
    id: "dasboard",
    title: "Dashboard",
    icon: <Home />,
    link: "/",
  },
  {
    id: "users",
    title: "Users",
    icon: <Users />,
    link: "/users",
  },
  {
    id: "separator",
    type: "separator",
  },
  {
    id: "setting",
    title: "Setting",
    icon: <Settings />,
    link: "/setting",
    children: [
      {
        id: "countries",
        title: "Countries",
        link: "/countries",
      },
      {
        id: "states",
        title: "States",
        link: "/states",
      },
      {
        id: "cities",
        title: "Cities",
        link: "/cities",
      },
    ],
  },
];
