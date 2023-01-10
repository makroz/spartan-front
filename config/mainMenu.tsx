import { Home, Users, Truck, Settings } from "react-feather";
export const mainMenu = [
  {
    id: "dasboard",
    title: "Dashboard",
    icon: <Home />,
    link: "/",
  },
  {
    id: "companies",
    title: "Companies",
    icon: <Truck />,
    link: "/companies",
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
        id: "plans",
        title: "Plans",
        link: "/plans",
      },
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
