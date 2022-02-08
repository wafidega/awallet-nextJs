const initialState = {
  idUser: "",
  isError: false,
  isLoading: false,
  msg: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "LOGIN_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        idUser: action.payload.data.data.id,
        msg: action.payload.data.msg,
      };
    }
    case "LOGIN_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        idUser: "",
        msg: action.payload.response.data.msg,
      };
    }
    case "ADDCART": {
      return {
        ...state,
        cart: `BERTAMBAH ${action.data}`,
      };
    }
    // Register
    case "REGISTER_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "REGISTER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        idUser: action.payload.data.data.id,
        msg: action.payload.data.msg,
      };
    }
    case "REGISTER_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    // Pin
    case "CREATE_PIN_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "CREATE_PIN_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "CREATE_PIN_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    case "LOGOUT_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "LOGOUT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        idUser: "",
      };
    }
    case "LOGOUT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    default: {
      return state;
    }
  }
};
export default auth;
