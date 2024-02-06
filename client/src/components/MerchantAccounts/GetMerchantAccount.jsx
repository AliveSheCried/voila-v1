import { useContext, useState } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import MerchantAccount from "./MerchantAccount";
// import Card from "../Card/Card";
import Start from "../Start/Start";

const GetMerchantAccount = () => {
  const { merchantAccounts } = useContext(MerchantAccountContext);
  const [selectedAccountId, setSelectedAccountId] = useState("");

  const handleAccountChange = (event) => {
    setSelectedAccountId(event.target.value);
  };

  if (!merchantAccounts.length) {
    return <Start type={"routes"} title={"Merchant account detail"} />;
  }

  const selectedAccount = merchantAccounts.find(
    (account) => account.id === selectedAccountId
  );

  return (
    <div>
      <div className="content__head">
        <span className="content__arrow">&raquo;</span> Merchant account detail
      </div>
      <div>
        <select value={selectedAccountId} onChange={handleAccountChange}>
          <option value="">-- Select merchant account --</option>
          {merchantAccounts.map((account) => (
            <option key={account.id} value={account.id}>
              {"CURRENCY: " + account.currency + " - ID: " + account.id}
            </option>
          ))}
        </select>
      </div>
      {selectedAccount && (
        <MerchantAccount
          key={selectedAccount.id}
          data={selectedAccount}
          style="sp-right-sm sp-bottom-md card__merchant-account--detail"
        />
      )}
    </div>
  );
};

export default GetMerchantAccount;
