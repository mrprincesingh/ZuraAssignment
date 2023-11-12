import * as types from "./actionTypes";
const initialState = {
  Project: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PROJECT_REQUEST:
    case types.POST_PROJECT_REQUEST:
   
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.GET_PROJECT_SUCCESS:
    case types.POST_PROJECT_SUCCESS:
   
      return {
        ...state,
        Project: payload,
        isLoading: false,
        isError: false,
      };
    case types.GET_PROJECT_FAILURE:
    case types.POST_PROJECT_FAILURE:
   
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};


  
