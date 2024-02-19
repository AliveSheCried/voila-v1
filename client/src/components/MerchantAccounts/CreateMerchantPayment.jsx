import { useContext, useState } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import { TokenContext } from "../../contexts/TokenContext";
//components
import Start from "../Start/Start";

const CreateMerchantPayment = () => {
  const { merchantAccounts } = useContext(MerchantAccountContext);
  const { tokenData } = useContext(TokenContext);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  //handlers
  const handleCreatePayment = () => {
    console.log("Create payment");
  };

  function handleAccountChange(account) {
    setSelectedAccountId(account.id);
    setSelectedCurrency(account.currency);
  }

  if (!tokenData.accessToken) {
    return <Start type={"routes"} title={"Merchant account payout"} />;
  }

  return (
    <>
      <div className="content__head">
        <span className="content__arrow">&raquo;</span> Merchant account payout
      </div>
      <div className="token__container">
        <div className="token__title">
          <span
            className={`material-symbols-outlined token__icon token__icon--bank`}
          >
            attach_money
          </span>
          Merchant account payout - external
        </div>
        <div className="merchant-account__search-container">
          <div className="sp-right-md">
            <div className="content__label sp-top-sm">
              Select disbursement account
            </div>
            <div>
              <select
                value={selectedAccountId}
                onChange={(event) =>
                  handleAccountChange(
                    merchantAccounts.find(
                      (account) => account.id === event.target.value
                    )
                  )
                }
              >
                <option value="">-- Select merchant account --</option>
                {merchantAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.id}
                    {/* Change to IBAN / Account Number*/}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="content__label sp-top-sm">Currency</div>
            <div className="input__merchant-account merchant-account__search-dates text-sm">
              <div>
                <div>
                  <input
                    type="text"
                    id="currency"
                    value={selectedCurrency}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="date"
                    id="dateTo"
                    // value={dateTo}
                    // onChange={onDateToChange}
                  />
                </div>
              </div>
            </div>
            <div className="absolute-right sp-top-sm">
              <button
                className="btn btn--tertiary"
                onClick={handleCreatePayment}
              >
                Create payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMerchantPayment;
