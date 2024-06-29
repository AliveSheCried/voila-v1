import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

//create Context
export const MerchantAccountDataTokenContext = createContext({
  token: {
    name: "",
    type: "",
    expiry: "",
    state: "",
    accessToken: "",
  },

  updateToken: () => {},
});

// Custom hook
export const useMerchantAccountDataToken = () =>
  useContext(MerchantAccountDataTokenContext);

// Provider
export const MerchantAccountDataTokenProvider = ({ children }) => {
  const [token, setToken] = useState({
    name: "",
    type: "",
    expiry: "",
    state: "",
    accessToken: "",
  });
  const [expiryTime, setExpiryTime] = useState(null);

  useEffect(() => {
    if (expiryTime) {
      const timeout = setTimeout(() => {
        setToken({
          name: "",
          type: "",
          expiry: "",
          state: "",
          accessToken: "",
        });
        setExpiryTime(null);
      }, expiryTime - Date.now());

      return () => clearTimeout(timeout);
    }
  }, [expiryTime]);

  const updateToken = useCallback(
    (newToken, expiresIn) => {
      setToken(newToken);
      setExpiryTime(Date.now() + expiresIn * 1000);
    },
    [setToken, setExpiryTime]
  ); // Dependencies

  const value = useMemo(() => ({ token, updateToken }), [token, updateToken]);

  return (
    <MerchantAccountDataTokenContext.Provider value={value}>
      {children}
    </MerchantAccountDataTokenContext.Provider>
  );
};

MerchantAccountDataTokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
