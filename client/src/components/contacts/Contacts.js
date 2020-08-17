import React, { useContext, useEffect } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { getContacts, contacts, loading, state } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, [contacts]);

  if (contacts && contacts.length === 0 && !loading) {
    return <h3>Please add Contacts</h3>;
  }
  console.log(contacts);

  return (
    <div>
      {contacts && !loading ? (
        contacts.map((contact) => {
          return <ContactItem key={contact._id} contact={contact} />;
        })
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Contacts;
