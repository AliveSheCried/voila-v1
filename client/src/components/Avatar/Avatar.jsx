import PropTypes from "prop-types";
import avatar from "../../assets/images/avatar.jpg";

const Avatar = ({ name, email }) => {
  return (
    <div className="avatar">
      <div className="avatar__group">
        <div className="avatar__contact text-xs">
          <div className="avatar__name">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </div>
          <div className="avatar__email">
            <a href="#">{email}</a>
          </div>
        </div>
        <div className="avatar__img">
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Avatar;
