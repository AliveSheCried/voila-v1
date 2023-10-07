import avatar from "../../assets/images/avatar.jpg";

const Avatar = () => {
  return (
    <div className="avatar">
      <div className="avatar__group">
        <div className="avatar__img">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="avatar__contact text-xxs">
          <div className="avatar__name">Jane Doe</div>
          <div className="avatar__email">
            <a href="#" className="a--secondary">
              jane.doe@email.com
            </a>
          </div>
        </div>
      </div>
      <div className="avatar__elipse">
        <a href="#" className="a--tertiary">
          ...
        </a>
      </div>
    </div>
  );
};

export default Avatar;
