import { Spinner } from "flowbite-react";
import t from "../utils/traductor";
import DataAdvSearch from "./DataAdvSearch";
import DataSearch from "./DataSearch";
const DataHeader = ({
  columns,
  msg,
  onAdd,
  textBtnAdd,
  title,
  loaded,
  setSearch = null,
  searchType = "b",
  search = [],
}: any) => {
  return (
    <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col p-2">
      <div className="flex justify-between items-center">
        <div className="">
          {!loaded && <Spinner />}
          {searchType != "" && (
            <div className={!loaded ? "hidden" : "block"}>
              {searchType == "b" ? (
                <DataSearch setSearch={setSearch} />
              ) : (
                <DataAdvSearch campos={columns} setAdvSearch={setSearch} />
              )}
            </div>
          )}
        </div>
        <div className="flex-grow">{msg}</div>
        {(!columns._actions?.render || columns._actions.render("add")) && (
          <button
            className="btn btn-primary flex-shrink w-fit"
            onClick={(e) => onAdd()}
          >
            {textBtnAdd || t("Add ") + title}
          </button>
        )}
      </div>
    </div>
  );
};

export default DataHeader;
