import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "react-modal";

const Transaction = ({ transaction }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({
    top: "50%",
    left: "50%",
  });

  //Modal related code
  const openModal = (e) => {
    const rect = e.target.getBoundingClientRect();
    setModalPosition({ top: `${rect.top}px`, left: `${rect.left}px` });
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const customStyles = {
    content: {
      top: modalPosition.top,
      left: modalPosition.left,
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "150px",
      height: "150px",
      backgroundColor: "#ffffff",
    },
    overlay: {
      background: "transparent", //"rgba(255, 255, 255, 0.1)", // Set the background to white with 50% transparency
    },
  };

  return (
    <tr key={transaction.id}>
      <td className="content__value--table">{transaction.type}</td>
      <td className="content__value--table">{transaction.status}</td>
      <td className="content__value--table right">
        {new Date(transaction.created_at).toLocaleDateString()}
      </td>
      <td className="content__value--table">{transaction.currency}</td>
      <td className="content__value--table right">
        {transaction.amount_in_minor}
      </td>
      <td className="content__value--table">
        {transaction.beneficiary.account_holder_name}
      </td>
      <td className="content__value--table">
        {transaction.beneficiary.reference}
      </td>
      <td className="content__value--table" id="txDetail">
        <Modal
          parentSelector={() => document.querySelector("#txDetail")}
          isOpen={modalIsOpen}
          //onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
          // subtitle="Hello"
        >
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
        </Modal>
        <span className="material-symbols-outlined">
          <a
            className="a--table-icon"
            href="#"
            title="View transaction details"
            onClick={openModal}
          >
            data_info_alert
          </a>
        </span>
      </td>
    </tr>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.string,
    created_at: PropTypes.string,
    currency: PropTypes.string,
    amount_in_minor: PropTypes.number,
    beneficiary: PropTypes.shape({
      account_holder_name: PropTypes.string,
      reference: PropTypes.string,
    }),
  }),
};

export default Transaction;
