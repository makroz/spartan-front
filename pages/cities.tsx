import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import DataTable from "../src/components/DataTable";
import Spinner from "../src/components/layouts/Spinner";
import useAxios from "../src/hooks/useAxios";

const citiesPage = () => {
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "id",
    orderBy: "asc",
    searchBy: "",
  });
  const { data, loaded, reLoad } = useAxios("/cities", "GET", {
    ...params,
    origen: "useAxios",
  });

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
      header: "Cities",
      className: "",
    },
    state: {
      header: "State",
      className: "",
      render: (value, row) => row.state.name + " (" + row.state.abv + ")",
    },
  };

  //if (!users) return null;

  return (
    <>
      <h1>Cities List</h1>
      <Card className="relative">
        {!loaded && <Spinner />}
        {data && (
          <DataTable
            onAction={() => {}}
            datas={data.data}
            columns={columns}
            params={{ ...params, total: data.total }}
            onChangePage={onChangePage}
            onChangePerPage={onChangePerPage}
          />
        )}
      </Card>
    </>
  );
};

export default citiesPage;
citiesPage.auth = true;
