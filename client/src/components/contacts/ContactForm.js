import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const {
    addContact,
    current,
    updateContact,
    setCurrent,
    contacts,
  } = contactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  useEffect(() => {
    if (current !== null) {
      if (current) setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [ContactContext, current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) addContact(contact);
    else {
      updateContact(contact);
      setCurrent(null);
    }
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {current === null ? <h2>Add Contact</h2> : <h2>Update Contact</h2>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          name="name"
          required
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={phone}
          name="phone"
          required
          onChange={onChange}
        />
        <h5>Contact Type</h5>
        <input
          type="radio"
          name="type"
          value="personal"
          onChange={onChange}
          checked={type === "personal"}
        />
        Personal
        <input
          type="radio"
          name="type"
          value="professional"
          onChange={onChange}
          checked={type === "professional"}
        />
        Professional
        {current === null ? (
          <input
            type="submit"
            value="Add Contact"
            className="btn btn-primary btn-block"
          />
        ) : (
          <input
            type="submit"
            value="Update Contact"
            className="btn btn-primary btn-block"
          />
        )}
      </form>
    </div>
  );
};

export default ContactForm;
