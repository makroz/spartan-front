import { Spinner } from "flowbite-react";
import t from "../utils/traductor";
import DataSearch from "./DataSearch";
const DataHeader = ({
  columns,
  msg,
  onAdd,
  textBtnAdd,
  title,
  loaded,
  setSearch = null,
}: any) => {
  return (
    <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col p-2">
      <div className="flex justify-between items-center">
        <div className="">
          {!loaded && <Spinner />}
          {setSearch && (
            <div className={!loaded ? "hidden" : "block"}>
              <DataSearch setSearch={setSearch} />
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
