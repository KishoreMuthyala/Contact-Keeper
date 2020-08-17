import React, { useReducer } from "react";

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_ALERT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  CONTACT_ERROR,
  SET_CURRENT,
} from "../types";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from "axios";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    error: null,
    current: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContacts = async () => {
    try {
      const res = await axios.get("api/contacts");
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: "Error in Deletion",
      });
    }
  };

  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  const updateContact = async (p) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/contacts/${p._id}`, p, config);
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
