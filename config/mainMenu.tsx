import { Home, Users, Truck, Settings } from "react-feather";
export const mainMenu = [
  {
    id: "dasboard",
    title: "Dashboard",
    icon: <Home />,
    link: "/",
  },

  {
    id: "m_companies",
    title: "Companies",
    icon: <Truck />,
    children: [
      {
        id: "companies",
        title: "Companies",
        icon: <Truck />,
        link: "/companies",
      },
      {
        id: "cia_users",
        title: "Users of Cias",
        link: "/cia_users",
        icon: <Users />,
      },
    ],
  },
  {
    id: "_dealers",
    title: "Dealers",
    icon: <Truck />,
    link: "/dealers",
    children: [
      {
        id: "dealers",
        title: "Dealers",
        icon: <Truck />,
        link: "/dealers",
      },
      {
        id: "dealer_users",
        title: "Users of Dealers",
        link: "/dealer_users",
        icon: <Users />,
      },
    ],
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
      {
        id: "roles",
        title: "Roles",
        link: "/roles",
      },
      {
        id: "abilities",
        title: "Permisos",
        link: "/abilities",
      },
    ],
  },
];
