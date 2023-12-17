//import ApiContent from "../ApiContent/ApiContent";
import { useContext } from "react";
import { TokenContext } from "../../contexts/TokenContext";
import GetMerchantAccounts from "../MerchantAccounts/GetMerchantAccounts";

import RightPanel from "../RightPanel/RightPanel";
import Start from "../Start/Start";

const Content = () => {
  const { tokenData } = useContext(TokenContext);
  //console.log("tokenData", tokenData);

  return (
    <main>
      {/* <div className="main__content">{active ? <ApiContent /> : <Start />}</div> */}
      <div className="main__content">
        {tokenData.name ? <GetMerchantAccounts /> : <Start />}
      </div>
      <div className="main__right-panel">
        <RightPanel />
      </div>
    </main>
  );
};

export default Content;
