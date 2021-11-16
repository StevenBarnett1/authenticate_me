import { csrfFetch } from "./csrf"
const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"
const ADD_MODAL_TYPE = "session/ADD_MODAL_TYPE"
const MODAL_VIEW = "session/MODAL_VIEW"
const MODAL_REQUIRED = "session/MODAL_REQUIRED"
const MODAL_INFO = "session/MODAL_INFO"

export const setUser = (user) => {
    return {
    type:SET_USER,
    payload:user
    }
}

export const removeUser = () => {
    return {
    type:REMOVE_USER
    }
}

export const addModal = (type) => {
  return {
    type:ADD_MODAL_TYPE,
    payload:type
  }
}

export const toggleModalView = (visible) => {
  return {
    type:MODAL_VIEW,
    payload:visible
  }
}

export const toggleModalRequired = (required) => {
  return {
    type:MODAL_REQUIRED,
    payload:required
  }
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const login = (user) => async (dispatch) => {
    const {credential, password} = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
          credential,
          password,
        }),
      });
      const data = await response.json();
      dispatch(setUser(data.user));
      return response;
}

export const signup = (user) => async (dispatch) => {
  console.log("USER IN SIGNUP THUNK: ", user)
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

  export const setModalInfo = (info) => {
    return {
      type:MODAL_INFO,
      payload:info
    }
  }

const initialState = { user: null,modalView:null,modalType:null,modalInfo:null };

const sessionReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
      case SET_USER:
        newState.user = action.payload;
        return newState;
      case REMOVE_USER:
        newState.user = null;
        return newState;
      case ADD_MODAL_TYPE:{
        newState.modalType=action.payload
        return newState
      }
      case MODAL_VIEW:{
        newState.modalView=action.payload
        return newState
      }
      case MODAL_REQUIRED:{
        newState.modalRequired=action.payload
        return newState
      }
      case MODAL_INFO:{
        newState.modalInfo=action.payload
        return newState
      }
      default:
        return state;
    }
  };

  export default sessionReducer
