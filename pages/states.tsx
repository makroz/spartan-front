import DataCrud from "../src/components/DataCrud";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";

const statesPage = () => {
  const { data, loaded }: any = useAxios("/countries", "GET", { perPage: 0 });

  const fields = getFields([
    "id",
    "name*|_h_::State",
    "abv*|_h_",
    "country_id*|_h_",
  ]);
  fields["country_id"].options = data?.data;
  return (
    <>
      <DataCrud title="State" modulo="states" columns={fields} />
    </>
  );
};
export default statesPage;
statesPage.auth = true;
