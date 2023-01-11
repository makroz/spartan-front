import { useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

const DropDown = (props) => {
  const container: any = useRef(null);
  useOnClickOutside(container, () => {
    props.onOpen(false);
  });

  return (
    <div
      ref={container}
      id="userDropdown"
      className={
        !props.open
          ? "hidden"
          : "top-10 right-2 absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
      }
    >
      {props.children}
    </div>
  );
};

export default DropDown;
