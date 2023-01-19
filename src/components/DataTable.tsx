import { Badge, Checkbox, Pagination, Table } from "flowbite-react";
import { Fragment, useState } from "react";
import { ChevronDown, ChevronUp, Edit, Eye, Trash } from "react-feather";
import t from "../utils/traductor";
import Select from "./forms/Select";

const DataTable = ({
  datas,
  columns,
  params,
  onChangePage,
  onChangePerPage,
  onAction,
  onClickRowChildren,
  onChangeSort,
  _sel = true,
}): any => {
  const [sel, setSel]: any = useState([]);
  const [rowChildren, setRowChildren]: any = useState({});
  const onSelAll = (e) => {
    if (e.target.checked) {
      setSel(datas.map((row) => row.id + ""));
    } else {
      setSel([]);
    }
  };

  const onSel = (e) => {
    if (e.target.checked) {
      if (sel.includes(e.target.value)) return;
      setSel([...sel, e.target.value]);
    } else {
      setSel(sel.filter((row) => row != e.target.value));
    }
  };

  const columnsHeader: any = [];
  Object.keys(columns).map((key) => {
    if (columns[key].header) columnsHeader.push(key);
  });

  const renderCell = (row, key, index_row) => {
    if (columns[key].render) {
      return columns[key].render(row[key], row, key, index_row);
    }
    switch (columns[key].inputType) {
      case "select":
        if (columns[key].options) {
          if (columns[key].badge) {
            return (
              <Badge
                color={columns[key].options[row[key]]?.color}
                className="rounded-full  justify-center"
              >
                {columns[key].options[row[key]]?.label}
              </Badge>
            );
          }
          if (columns[key].options.find) {
            return columns[key].options.find(
              (item) => item[columns[key].optionValue] == row[key]
            )?.[columns[key].optionLabel];
          }
          return (
            columns[key].options[row[key]][columns[key].optionLabel] ||
            columns[key].options[row[key]]?.label
          );
        }
        return "...";
        break;
      case "color":
        return (
          <div
            style={{ backgroundColor: row[key], color: "black" }}
            className="rounded-full  justify-center text-center py-0 px-3"
          >
            {row[key]}
          </div>
        );
        break;
      default:
        return row[key];
        break;
    }
  };

  const onSort = (key) => {
    let p = "asc";
    if (params.sortBy == key) {
      if (params.orderBy == "asc") {
        p = "desc";
      }
    }
    if (onChangeSort) onChangeSort(key, p);
  };

  const renderActions = (row, index) => {
    if (!onAction) return null;
    return (
      <>
        {(!columns._actions?.render ||
          columns._actions.render("view", row, index)) && (
          <button
            onClick={() => onAction("view", row)}
            className="font-medium text-green-600 hover:-translate-y-1 "
          >
            <Eye size={18} />
          </button>
        )}
        {(!columns._actions?.render ||
          columns._actions.render("edit", row, index)) && (
          <button
            onClick={() => onAction("edit", row)}
            className="font-medium text-blue-600 hover:-translate-y-1 "
          >
            <Edit size={18} />
          </button>
        )}
        {(!columns._actions?.render ||
          columns._actions.render("del", row, index)) && (
          <button
            onClick={() => onAction("del", row)}
            className="font-medium text-red-600 hover:-translate-y-1"
          >
            <Trash size={18} />
          </button>
        )}
      </>
    );
  };

  return (
    <>
      <Table hoverable={true} striped={true}>
        <Table.Head>
          {_sel && (
            <Table.HeadCell className="!p-4 w-12">
              <Checkbox onChange={onSelAll} />
            </Table.HeadCell>
          )}
          {columnsHeader.map((key) => (
            <Table.HeadCell key={key}>
              <div
                className="flex justify-between group"
                onClick={() => {
                  if (columns[key].sortable) onSort(key);
                }}
              >
                <div
                  className={`${
                    columns[key].sortable ? "group-hover:text-blue-500" : null
                  }`}
                >
                  {columns[key].header === true
                    ? columns[key].label
                    : columns[key].header}
                </div>
                {params.sortBy == key && (
                  <ChevronDown
                    size={18}
                    className={`font-medium text-blue-600 group-hover:-translate-y-1 transform ${
                      params.orderBy == "asc" ? "rotate-180" : null
                    } transition-all ease-in-out duration-200`}
                  />
                )}
              </div>
            </Table.HeadCell>
          ))}
          {onAction && (
            <Table.HeadCell className="w-24">{t("Actions")}</Table.HeadCell>
          )}
        </Table.Head>

        <Table.Body className="divide-y">
          {datas.length > 0 ? (
            datas.map((row, index_row) => (
              <Fragment key={row.id}>
                <Table.Row
                  key={row.id}
                  onClick={(e) => {
                    if (onClickRowChildren) {
                      if (rowChildren[row.id] && rowChildren[row.id] != "") {
                        setRowChildren({ ...rowChildren, [row.id]: "" });
                      } else {
                        setRowChildren({
                          ...rowChildren,
                          [row.id]: onClickRowChildren(row, index_row),
                        });
                      }
                    }
                  }}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {_sel && (
                    <Table.Cell className="!p-4">
                      <Checkbox
                        value={row.id}
                        onChange={onSel}
                        checked={sel.includes(row.id + "")}
                      />
                    </Table.Cell>
                  )}
                  {columnsHeader.map((key) => (
                    <Table.Cell
                      key={`${key}-cell`}
                      className={columns[key].className}
                    >
                      {renderCell(row, key, index_row)}
                    </Table.Cell>
                  ))}
                  {onAction && (
                    <Table.Cell className="flex items-center gap-2">
                      {renderActions(row, index_row)}
                    </Table.Cell>
                  )}
                </Table.Row>
                {rowChildren[row.id] && rowChildren[row.id] != "" && (
                  <>
                    <Table.Row key={`${row.id}-children`}>
                      <Table.Cell colSpan={columnsHeader.length + 2}>
                        {rowChildren[row.id]}
                      </Table.Cell>
                    </Table.Row>
                  </>
                )}
              </Fragment>
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan={columnsHeader.length + 2}
                className="text-center"
              >
                {t("Empty Data")}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div className="flex justify-between flex-wrap">
        {onChangePage && (
          <Pagination
            currentPage={params.page}
            onPageChange={onChangePage}
            showIcons={true}
            totalPages={Math.ceil((params.total || 1) / (params.perPage || 1))}
            previousLabel=""
            nextLabel=""
          />
        )}
        {onChangePerPage && (
          <Select
            name="perPage"
            value={params.perPage}
            onChange={onChangePerPage}
            className="w-24"
            placeholder={t("All")}
            options={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "30", label: "30" },
              { value: "40", label: "40" },
              { value: "50", label: "50" },
            ]}
          ></Select>
        )}
      </div>
    </>
  );
};

export default DataTable;
