import { useState } from "react";
import { Plus, Trash2 } from "react-feather";
import t from "../utils/traductor";
import DataModal from "./DataModal";

const initialValues = {
  field: "",
  criteria: "",
  search: "",
  join: "a",
  gb: "",
  ge: "",
};

const DataAdvSearch = ({ campos, setAdvSearch }) => {
  const [openSearch, setOpenSearch] = useState(false);

  const [search, setSearch]: any = useState([initialValues]);
  const onChange = (e, i) => {
    const { name, value } = e.target;
    let sSearch = [...search];
    sSearch[i] = { ...search[i], [name]: value };
    if (name == "field") {
      sSearch[i].criteria = "=";
      sSearch[i].search = "";
    }

    if (name == "ge" || name == "gb") {
      if (name == "ge" && value == "1") sSearch[i].gb = "";
      if (name == "gb" && value == "1") sSearch[i].ge = "";
      let a = 0;
      let c = 0;
      let a1 = 0;
      let c1 = 0;
      sSearch.map((item, index) => {
        if (item.gb != "") a++;
        if (item.ge != "") c++;
        if (c == a) {
          c = 0;
          a = 0;
          if (sSearch[index].ge != "") sSearch[index].ge = "1";
        }
        if (c > a) {
          c = 0;
          a = 0;
          if (sSearch[index].ge != "") sSearch[index].ge = "2";
        }

        if (sSearch[sSearch.length - (index + 1)].gb != "") a1++;
        if (sSearch[sSearch.length - (index + 1)].ge != "") c1++;
        if (c1 == a1) {
          c1 = 0;
          a1 = 0;
          if (sSearch[sSearch.length - (index + 1)].gb != "")
            sSearch[sSearch.length - (index + 1)].gb = "1";
        }
        if (a1 > c1) {
          c1 = 0;
          a1 = 0;
          if (sSearch[sSearch.length - (index + 1)].gb != "")
            sSearch[sSearch.length - (index + 1)].gb = "2";
        }
      });
    }
    setSearch(sSearch);
  };

  const addSearch = () => {
    const sSearch = [...search];
    sSearch.push(initialValues);
    setSearch(sSearch);
  };

  const delSearch = (i) => {
    const sSearch = [...search];
    sSearch.splice(i, 1);
    setSearch(sSearch);
  };

  const open = () => {
    setOpenSearch(!openSearch);
  };

  const onCloseModal = () => {
    setOpenSearch(false);
  };

  const onClear = () => {
    setSearch([initialValues]);
    if (setAdvSearch) setAdvSearch("", setSearch);
    setOpenSearch(false);
  };

  const onSave = () => {
    const sSearch: any = [];
    search.map((item, index) => {
      if (
        item.field.trim() != "" &&
        item.criteria.trim() != "" &&
        (item.search + "").trim() != ""
      ) {
        sSearch.push(item);
      }
    });
    if (sSearch.length > 0) {
      setSearch(sSearch);
      if (setAdvSearch) setAdvSearch(search, setSearch);
      setOpenSearch(false);
      return;
    }
    //setSearch([initialValues]);
    console.log("search", search);
    return;
  };

  // useEffect(() => {
  //   //console.log("search", search);
  // }, [search]);

  const camposList: any = [];
  Object.keys(campos).map((key) => {
    if (campos[key].search) camposList.push(key);
  });

  const lCriteriosDef = [{ value: "-1", label: t("Empty Data") }];

  const lCriterios = [
    { value: "=", label: t("Equal") },
    { value: "!=", label: t("Not Equal") },
    { value: ">", label: t("Greater Than") },
    { value: ">=", label: t("Greater or Equal") },
    { value: "<", label: t("Less Than") },
    { value: "<=", label: t("Less or Equal") },
  ];
  const lCriteriosSelect = [
    { value: "=", label: t("Equal") },
    { value: "!=", label: t("Not Equal") },
  ];
  const lCriteriosAlfa = [
    { value: "=", label: t("Equal") },
    { value: "!=", label: t("Not Equal") },
    { value: ">", label: t("Greater Than") },
    { value: ">=", label: t("Greater or Equal") },
    { value: "<", label: t("Less Than") },
    { value: "<=", label: t("Less or Equal") },
    { value: "lb", label: t("Starts With") },
    { value: "le", label: t("Ends With") },
    { value: "l", label: t("Contains") },
    { value: "!l", label: t("Not Contain") },
  ];

  const criterios = (i, field) => {
    if (field == "") return lCriteriosDef;
    if (["select", "subselect"].includes(campos[field].inputType))
      return lCriteriosSelect;
    if (["number", "date", "datetime"].includes(campos[field].inputType))
      return lCriterios;
    return lCriteriosAlfa;
  };

  const searchInput = (i, s) => {
    if (s.field != "") {
      if (["select", "subselect"].includes(campos[s.field].inputType)) {
        return (
          <select
            name="search"
            value={s.search}
            onChange={(e) => onChange(e, i)}
            className="w-full my-1 p-1 text-xs rounded-lg  border border-gray-300  focus:border-blue-500"
          >
            <option value="">--</option>
            {campos[s.field].options?.map((o, ind) => (
              <option
                key={ind + "-s"}
                value={o[campos[s.field].optionValue || "id"]}
              >
                {o[campos[s.field].optionLabel || "name"]}
              </option>
            ))}
          </select>
        );
      }
    }
    return (
      <input
        name="search"
        value={s.search}
        onChange={(e) => onChange(e, i)}
        type={campos[s.field]?.inputType || "text"}
        className="w-full my-1 p-1 text-xs rounded-lg  border border-gray-300  focus:border-blue-500"
      />
    );
  };
  return (
    <div className="flex">
      <button
        className={
          (search.length > 1 || search[0].field != "" ? "text-red-500" : "") +
          " bg-white border-white p-1 text-sm font-medium  rounded-lg border hover:bg-primary hover:text-secondary   focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all ease-in-out"
        }
        onClick={() => open()}
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
      {(search.length > 1 || search[0].field != "") && (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-3 h-3 -m-1.5 self-center text-red-500 cursor-pointer"
          onClick={() => onClear()}
        >
          <path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      <DataModal
        open={openSearch}
        title={t("Advanced Search")}
        onClose={onCloseModal}
        onSave={onSave}
        buttonText={t("Search")}
      >
        <div className="flex flex-col w-full">
          {search?.map((s, i) => (
            <div
              key={"fileds-" + i}
              className="flex flex-wrap gap-0 border-b mt-2 relative"
            >
              <button
                className={
                  (s.gb != ""
                    ? s.gb == "1"
                      ? "text-black"
                      : "text-red-700"
                    : "text-gray-200") + " absolute top-0.5 -left-1.5 "
                }
                onClick={() =>
                  onChange(
                    { target: { name: "gb", value: s.gb == "" ? "1" : "" } },
                    i
                  )
                }
              >
                {"("}
              </button>
              <div className="w-1/2 px-0.5 sm:w-1/4">
                <select
                  name="field"
                  value={s.field}
                  onChange={(e) => onChange(e, i)}
                  className="w-full my-1 p-1 text-xs rounded-lg  border border-gray-300  focus:border-blue-500"
                >
                  <option value="" disabled hidden>
                    {t("Field")}
                  </option>
                  {camposList.map((key, index) => (
                    <option key={index} value={key}>
                      {campos[key].label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 px-0.5 sm:w-1/4">
                <select
                  name="criteria"
                  value={s.criteria}
                  onChange={(e) => onChange(e, i)}
                  className="w-full my-1 p-1 text-xs rounded-lg  border border-gray-300  focus:border-blue-500"
                >
                  <option value="" disabled hidden>
                    {t("Criteria")}
                  </option>
                  {criterios(i, s.field).map((crit, index) => (
                    <option key={index} value={crit.value}>
                      {crit.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-grow px-0.5 relative">
                {searchInput(i, s)}
                <button
                  className={
                    (s.ge != ""
                      ? s.ge == "1"
                        ? "text-black"
                        : "text-red-700"
                      : "text-gray-200") + " absolute top-0.5 -right-1.5 "
                  }
                  onClick={() =>
                    onChange(
                      { target: { name: "ge", value: s.ge == "" ? "1" : "" } },
                      i
                    )
                  }
                >
                  {")"}
                </button>
              </div>
              <div className="flex self-center gap-1 w-[90px] px-0.5 justify-between ml-1">
                <div className="">
                  {search.length - 1 !== i && (
                    <select
                      name="join"
                      value={s.join}
                      onChange={(e) => onChange(e, i)}
                      className=" my-1 p-1 text-xs rounded-lg  border border-gray-300  focus:border-blue-500"
                    >
                      <option
                        value=""
                        disabled
                        hidden
                        className="text-[6px]"
                      ></option>
                      <option value="a">{t("and")}</option>
                      <option value="o">{t("or")}</option>
                    </select>
                  )}
                </div>
                <div className="flex gap-1 self-center">
                  {search.length - 1 === i && (
                    <Plus
                      className="p-1 rounded-full bg-green-600 text-white w-6 h-6  hover:bg-green-400 transition-all"
                      onClick={() => addSearch()}
                    />
                  )}
                  {i > 0 && (
                    <Trash2
                      className="p-1 rounded-full bg-red-800 text-white w-6 h-6  hover:bg-red-400 transition-all"
                      onClick={() => delSearch(i)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DataModal>
    </div>
  );
};

export default DataAdvSearch;
