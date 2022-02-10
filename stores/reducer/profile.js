const initialState = {
  isError: false,
  isLoading: false,
  msg: "",
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PASSWORD_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "CHANGE_PASSWORD_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "CHANGE_PASSWORD_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    // Phone
    case "UPDATE_PHONE_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "UPDATE_PHONE_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "UPDATE_PHONE_REJECTED": {
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
export default profile;
