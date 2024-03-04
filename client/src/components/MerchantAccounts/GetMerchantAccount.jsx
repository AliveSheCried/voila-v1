import { useContext, useState } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import SelectMerchantAccount from "../SelectMerchantAccount/SelectMerchantAccount";
import Start from "../Start/Start";
import MerchantAccount from "./MerchantAccount";

const GetMerchantAccount = () => {
  const { merchantAccounts } = useContext(MerchantAccountContext);
  const [selectedAccountId, setSelectedAccountId] = useState("");

  const handleAccountChange = (account) => {
    setSelectedAccountId(account.id);
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
      <SelectMerchantAccount
        label=""
        selectedAccountId={selectedAccountId}
        onAccountChange={handleAccountChange}
        merchantAccounts={merchantAccounts}
      />
      <div className="sp-top-md sp-bottom-md"></div>
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
