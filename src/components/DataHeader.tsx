import t from "../utils/traductor";
import DataAdvSearch from "./DataAdvSearch";
import DataSearch from "./DataSearch";
const DataHeader = ({
  columns,
  msg,
  onAdd,
  textBtnAdd,
  loaded,
  setSearch = null,
  searchType = "b",
  search = [],
  params = {},
  setParams = null,
}: any) => {
  const onFilter = (e: any) => {
    let param = {};
    if (params.filter != "") {
      try {
        param = { ...JSON.parse(params.filter) };
      } catch (error) {}
    }

    param[e.target.name] = e.target.value;
    setParams({ ...params, filter: JSON.stringify(param) });
  };

  return (
    <>
      {params.filter && (
        <div className="flex rounded-lg mb-0.5 border border-gray-200 bg-white shadow-md p-2 justify-between ">
          {Object.keys(columns).map((key: any) => {
            if (columns[key].filter !== true || !columns[key].options)
              return null;
            return (
              <div key={key + "-filter"} className="relative">
                <label className="absolute -top-1.5 left-1.5 bg-white px-1 text-[8px] text-gray-700 ">
                  {t(columns[key].label)}
                </label>
                <select
                  name={key}
                  id={key}
                  className="rounded-lg border-gray-300 p-0 px-1"
                  value={params.filter[key]}
                  onChange={onFilter}
                >
                  <option value="">{t("all")}</option>
                  {columns[key].options.map((option: any) => (
                    <option
                      key={option[columns[key].optionValue] + "-op"}
                      value={option[columns[key].optionValue]}
                      // selected={
                      //   params.filter[key] == option[columns[key].optionValue]
                      // }
                    >
                      {option[columns[key].optionLabel]}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      )}
      <div className="relative mb-0.5 flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col p-2">
        {!loaded && (
          <div className="loading absolute  roundex-lg bottom-0 left-0 right-0 p-0.5 mx-2"></div>
        )}
        <div className="flex justify-between items-center">
          <div className="">
            {searchType != "" && (
              // <div className={!loaded ? "hidden" : "block"}>
              <div>
                {searchType == "b" ? (
                  <DataSearch setSearch={setSearch} />
                ) : (
                  <DataAdvSearch campos={columns} setAdvSearch={setSearch} />
                )}
              </div>
            )}
          </div>
          <div className="flex-grow">{msg}</div>
          {(!columns._actions?.render ||
            columns._actions.render({ value: "add" })) && (
            <button
              className="btn btn-primary flex-shrink w-fit"
              onClick={(e) => onAdd()}
            >
              {textBtnAdd || t("Add ")}
            </button>
          )}
          {/* <Filter className="ml-1" /> */}
        </div>
      </div>
    </>
  );
};

export default DataHeader;
