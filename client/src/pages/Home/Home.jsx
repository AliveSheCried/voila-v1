import PropTypes from "prop-types";
import GenerateToken from "../GenerateToken";
import Header from "../Header/Header";

const Home = ({ name }) => {
  return (
    <div className="container__content">
      <Header name={name} />
      <GenerateToken />
    </div>
  );
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Home;
