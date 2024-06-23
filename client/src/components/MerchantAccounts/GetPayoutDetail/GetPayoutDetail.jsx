import { useContext } from "react";
import { PaymentTokenContext } from "../../../contexts/TokenContext";
import Start from "../../Start/Start";
import PayoutSearch from "./PayoutSearch";

const GetPayoutDetail = () => {
  const { token } = useContext(PaymentTokenContext);
  if (!token.accessToken) {
    return <Start type={"routes"} title={"Get payout details"} />;
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
