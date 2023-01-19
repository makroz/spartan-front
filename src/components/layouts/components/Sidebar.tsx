import { Avatar } from "flowbite-react";
import { XCircle } from "react-feather";
import { initialsName } from "../../../utils/string";
import MainMenu from "./MainMenu";

const Sidebar = ({ config, onVisible, visible }) => {
  return (
    <>
      <div className="p-0 pt-2 m-0 flex items-center ">
        {config?.app.appLogoImage ? (
          <img
            src={config?.app.appLogoImage}
            alt="logo"
            className="m-0 p-0 w-10"
            width="2.5rem"
            height="2.5rem"
          />
        ) : (
          <Avatar
            placeholderInitials={initialsName(config?.app.appName)}
            rounded={true}
            className="m-0 p-0 w-8"
          />
        )}
        <div
          className="logoTitle text-secondary ml-2 max-h-[64px] overflow-hidden"
          style={{ color: config?.app?.colorSecondary }}
        >
          {config?.app.appName}
        </div>
      </div>
      <div className="py-4 overflow-y-auto overflow-x-hidden">
        <MainMenu config={config} onVisible={onVisible} visible={visible} />
      </div>
    </>
  );
};

export default Sidebar;
