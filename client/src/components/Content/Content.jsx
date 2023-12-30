//import ApiContent from "../ApiContent/ApiContent";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { TokenContext } from "../../contexts/TokenContext";

import RightPanel from "../RightPanel/RightPanel";
import Start from "../Start/Start";

//routes
import GetMerchantAccount from "../MerchantAccounts/GetMerchantAccount";
import GetMerchantAccounts from "../MerchantAccounts/GetMerchantAccounts";

const Content = () => {
  const { tokenData } = useContext(TokenContext);
  //console.log("tokenData", tokenData);

  return (
    <main>
      {/* <div className="main__content">{active ? <ApiContent /> : <Start />}</div> */}
      <div className="main__content">
        <Routes>
          <Route path="getMerchantAccount" element={<GetMerchantAccount />} />
          <Route path="getMerchantAccounts" element={<GetMerchantAccounts />} />
          <Route path="/" element={<Start type={"home"} />} />
        </Routes>
        {/* {tokenData.name ? <GetMerchantAccounts /> : <Start />} */}
      </div>
      <div className="main__right-panel">
        <RightPanel />
      </div>
    </main>
  );
};

export default Content;
