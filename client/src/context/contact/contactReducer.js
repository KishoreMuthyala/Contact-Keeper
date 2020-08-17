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

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false,
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((c) => action.payload !== c._id)
          .payload,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    default:
      return state;
  }
};
