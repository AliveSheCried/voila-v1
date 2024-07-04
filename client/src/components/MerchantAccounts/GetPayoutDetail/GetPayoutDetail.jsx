import { useMerchantAccountDataToken } from "../../../providers/MerchantAccountDataTokenProvider";
import Start from "../../Start/Start";
import PayoutSearch from "./PayoutSearch";

const GetPayoutDetail = () => {
  const { token: merchantToken } = useMerchantAccountDataToken();
  if (!merchantToken.accessToken) {
    return (
      <Start type={"MerchantAccountRoutes"} title={"Get payout details"} />
    );
  }

  return (
    <div>
      <div className="content__head">
        <span className="content__arrow">&raquo;</span> Get payout detail
      </div>

      <PayoutSearch />
    </div>
  );
};

export default GetPayoutDetail;
