import DataCrud from "../src/components/DataCrud";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";

const citiesPage = () => {
  const { data, loaded }: any = useAxios("/states", "GET", { perPage: 0 });

  const fields = getFields(["id", "name*|_h_::City|", "state_id|_h_"]);
  fields["state_id"].options = data?.data;
  return (
    <>
      <DataCrud title="City" modulo="cities" columns={fields} />
    </>
  );
};

export default citiesPage;
citiesPage.auth = true;
