import { Avatar } from "flowbite-react";
import { XCircle } from "react-feather";
import { initialsName } from "../../../utils/string";
import MainMenu from "./MainMenu";

const Sidebar = ({ config, onVisible = null }) => {
  return (
    <>
      <div className="p-0 flex items-center ">
        {config?.app.appLogoImage ? (
          <img
            src={config?.app.appLogoImage}
            alt="logo"
            className="m-2"
            width={50}
            height={50}
          />
        ) : (
          <Avatar
            placeholderInitials={initialsName(config?.app.appName)}
            rounded={true}
            className="m-2"
            size="lg"
          />
        )}
        <div
          className="logoTitle text-secondary"
          style={{ color: config?.app?.colorSecondary }}
        >
          {config?.app.appName}
        </div>
        {onVisible && (
          <XCircle
            onClick={onVisible}
            size={18}
            className="text-white absolute top-1 md:hidden"
          />
        )}
      </div>
      <div className="py-4 overflow-y-auto overflow-x-hidden">
        <MainMenu config={config} />
      </div>
    </>
  );
};

export default Sidebar;
