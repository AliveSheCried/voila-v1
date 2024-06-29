import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// Create context
const PaymentTokenContext = createContext({
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
export const usePaymentToken = () => useContext(PaymentTokenContext);

export const PaymentTokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const updateToken = useCallback((newToken) => {
    setToken(newToken);
  }, []);

  const value = useMemo(() => {
    const clearToken = () => {
      setToken(null);
    };

    return { token, updateToken, clearToken };
  }, [token, updateToken]);

  return (
    <PaymentTokenContext.Provider value={value}>
      {children}
    </PaymentTokenContext.Provider>
  );
};

PaymentTokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
