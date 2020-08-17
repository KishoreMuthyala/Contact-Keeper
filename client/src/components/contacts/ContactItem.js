import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";
import { UPDATE_CONTACT, SET_CURRENT } from "../../context/types";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, updateContact, setCurrent } = contactContext;
  const onDelete = () => {
    deleteContact(contact._id);
  };
  const onEdit = () => {
    setCurrent(contact);
  };

  const { name, email, type, phone } = contact;
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{name} </h3>
      <span
        style={{ float: "right" }}
        className={
          "badge " + (type === "personal" ? "badge-success" : "badge-primary")
        }
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
      <ul className="list">
        <li>
          <i className="fas fa-envelope-open" />
          {email}
        </li>
        <li>
          <i className="fas fa-phone" />
          {phone}
        </li>
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
