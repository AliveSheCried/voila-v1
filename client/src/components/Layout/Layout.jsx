import PropTypes from "prop-types";

const Layout = (props) => {
  return <div className="container">{props.children}</div>;
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
