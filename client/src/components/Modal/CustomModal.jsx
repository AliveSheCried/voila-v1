import PropTypes from "prop-types";
import Modal from "react-modal";

const CustomModal = ({
  isOpen,
  position,
  onClose,
  parentSelector,
  children,
  contentLabel,
}) => {
  const customStyles = {
    content: {
      top: position.top,
      left: position.left,
      right: "auto",
      bottom: "auto",
      margin: "0px",
      // marginRight: "-50%",
      // transform: "translate(-50%, -50%)",
      // width: "150px",
      // height: "150px",
      backgroundColor: "#efcb68",
      borderRadius: "10px",
      border: "none",
      padding: "0px",
    },
    overlay: {
      background: "transparent", //"rgba(255, 255, 255, 0.1)", // Set the background to white with 50% transparency
      margin: "0px",
      border: "none",
    },
  };

  return (
    <Modal
      parentSelector={parentSelector}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  position: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  parentSelector: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  contentLabel: PropTypes.string.isRequired,
};

export default CustomModal;
