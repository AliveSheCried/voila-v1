import { TLAccessTokenAPI } from "./tlAccessToken_api.js";
import { TLDataAPI } from "./tlData_api.js";
import { TLMerchantAccountAPI } from "./tlMerchantAccount_api.js";
import { TLPayoutAPI } from "./tlPayout_api.js";

export const tlMerchantAccountAPI = new TLMerchantAccountAPI();
export const tlDataAPI = new TLDataAPI();
export const tlPayoutAPI = new TLPayoutAPI();
export const tlAccessTokenAPI = new TLAccessTokenAPI();
