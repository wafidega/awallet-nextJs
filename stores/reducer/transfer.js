const initialState = {
  isError: false,
  isLoading: false,
  msg: "",
  dataUser: {},
};

const transfer = (state = initialState, action) => {
  switch (action.type) {
    // Get User
    case "GET_USER_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "GET_USER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataUser: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    }
    case "GET_USER_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    // Transfer
    case "TRANSFER_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "TRANSFER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "TRANSFER_REJECTED": {
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
export default transfer;
