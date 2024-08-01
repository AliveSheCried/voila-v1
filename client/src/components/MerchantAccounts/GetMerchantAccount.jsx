import { useContext, useState } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import SelectMerchantAccount from "../SelectMerchantAccount/SelectMerchantAccount";
import Start from "../Start/Start";
import MerchantAccount from "./MerchantAccount";

const GetMerchantAccount = () => {
  const { merchantAccounts } = useContext(MerchantAccountContext);

  const [selectedIban, setSelectedIban] = useState("");

  const handleAccountChange = (account) => {
    const ibanIdentifier = account.account_identifiers.find(
      (identifier) => identifier.type === "iban"
    );
    if (ibanIdentifier) {
      setSelectedIban(ibanIdentifier.iban);
    }
  };

  if (!merchantAccounts.length) {
    return (
      <Start type={"MerchantAccountRoutes"} title={"Merchant account detail"} />
    );
  }

  const selectedAccount = merchantAccounts.find((account) =>
    account.account_identifiers.some(
      (identifier) =>
        identifier.type === "iban" && identifier.iban === selectedIban
    )
  );

  return (
    <div>
      <div className="content__head">
        <span className="content__arrow--pink">&raquo;</span> Merchant account
        detail
      </div>
      <SelectMerchantAccount
        label=""
        selectedIban={selectedIban}
        onAccountChange={handleAccountChange}
        merchantAccounts={merchantAccounts}
      />
      <div className="sp-top-md sp-bottom-md"></div>
      {selectedAccount && (
        <MerchantAccount
          key={selectedAccount.id}
          data={selectedAccount}
          className="sp-right-sm sp-bottom-md card__merchant-account--detail"
        />
      )}
    </div>
  );
};

export default GetMerchantAccount;
