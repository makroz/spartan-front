const Hamburguer = ({ onClick, active = false, className = "" }) => {
  return (
    <div className={className + " transform scale-75 "}>
      <button className="relative group" onClick={onClick}>
        <div
          className={
            (active ? "ring-4 -translate-x-5 " : "") +
            "relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8  ring-opacity-30 duration-200 shadow-md"
          }
        >
          <div
            className={
              (active ? "-rotate-180 " : "") +
              "flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-500 origin-center overflow-hidden"
            }
          >
            <div
              className={
                (active ? "rotate-45  " : "") +
                "bg-white h-[2px] w-7 transform transition-all duration-500 -translate-x-1"
              }
            ></div>
            <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-500 "></div>
            <div
              className={
                (active ? "-rotate-45 " : "") +
                "bg-white h-[2px] w-7 transform transition-all duration-500  -translate-x-1"
              }
            ></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Hamburguer;
