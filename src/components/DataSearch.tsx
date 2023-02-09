import { useState } from "react";
import t from "../utils/traductor";

const DataSearch = ({ setSearch }) => {
  const [active, setActive] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [oldSearch, setOldSearch] = useState("");

  const onSearch = (v: any = false) => {
    let s = searchBy.trim();
    if (v !== false) {
      s = v.trim();
      setSearchBy(v);
    }
    if (active) {
      if (s == "") setActive(false);
      if (s == oldSearch) return;
      setSearch(s);
      setOldSearch(s);
    }
    if (s == "") setActive(!active);
  };

  return (
    <div className="flex">
      <div className="relative w-full mr-1">
        {oldSearch != "" && active && (
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-3 h-3 absolute top-[1.5px] left-[2px]"
            onClick={() => {
              onSearch("");
            }}
          >
            <path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <input
          type="search"
          id="search-dropdown"
          onChange={(e) => setSearchBy(e.target.value)}
          value={searchBy}
          className={
            (active ? "w-full" : "w-9") +
            " block p-2 pr-6 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all ease-in-out "
          }
          placeholder={t("Search")}
          required
        />
        <button
          className={
            (active ? "text-white bg-primary" : "bg-white border-white") +
            " absolute top-0  right-0 p-2 text-sm font-medium  rounded-lg border hover:bg-secondary hover:text-primary   focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all ease-in-out"
          }
          onClick={() => onSearch()}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DataSearch;
