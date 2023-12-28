import PropTypes from "prop-types";
import Content from "../../components/Content/Content";
import Header from "../../components/Header/Header";

const Home = ({ name, email }) => {
  return (
    <div className="container__content">
      <Header name={name} email={email} />
      <Content />
    </div>
  );
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Home;
