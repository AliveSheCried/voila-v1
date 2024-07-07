import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext({
  user: null,

  setUser: () => {},
  clearUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => {
    const clearUser = () => {
      setUser(null);
    };

    return { user, setUser, clearUser };
  }, [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
