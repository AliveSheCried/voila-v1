import PropTypes from "prop-types";
import Content from "../../components/Content/Content";
import Header from "../Header/Header";

const Home = ({ name }) => {
  return (
    <div className="container__content">
      <Header name={name} />
      <Content />
    </div>
  );
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Home;
