import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import DataTable from "../src/components/DataTable";
import Spinner from "../src/components/layouts/Spinner";
import useAxios from "../src/hooks/useAxios";

const countriesPage = () => {
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "id",
    orderBy: "asc",
    searchBy: "",
  });
  const {
    data: countries,
    loaded,
    reLoad,
  } = useAxios("/countries", "GET", { ...params, origen: "useAxios" });

  useEffect(() => {
    reLoad({ ...params, origen: "reLoad" }, true);
  }, [params]);

  const onChangePage = (page) => {
    if (params.page == page) return;
    setParams({ ...params, page });
  };
  const onChangePerPage = (perPage) => {
    if (params.perPage == perPage) return;
    setParams({ ...params, perPage });
  };

  const columns = {
    name: {
      header: "Country",
      className: "",
    },
    code: {
      header: "Code",
      className: "",
    },
  };

  //if (!users) return null;

  return (
    <>
      <h1>Countries List</h1>
      <Card className="relative">
        {!loaded && <Spinner />}
        {loaded && (
          <DataTable
            onAction={() => {}}
            datas={countries.data}
            columns={columns}
            params={{ ...params, total: countries.total }}
            onChangePage={onChangePage}
            onChangePerPage={onChangePerPage}
          />
        )}
      </Card>
    </>
  );
};

export default countriesPage;
countriesPage.auth = true;
