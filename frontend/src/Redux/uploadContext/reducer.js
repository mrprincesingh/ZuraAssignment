import * as types from "./actionTypes";
const initialState1 = {
    Media: [],
    isLoading: false,
    isError: false,
  };

export const reducer1 = (state = initialState1, action) => {
    const { type, payload } = action;
    switch (type) {
      case types.GET_MEDIA_REQUEST:
      case types.POST_MEDIA_REQUEST:
      case types.DELETE_MEDIA_REQUEST:  
      case types.EDIT_MEDIA_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case types.GET_MEDIA_SUCCESS:
      case types.POST_MEDIA_SUCCESS:
        case types.DELETE_MEDIA_SUCCESS:  
        case types.EDIT_MEDIA_SUCCESS: 
        return {
          ...state,
          Media: payload,
          isLoading: false,
          isError: false,
        };
      case types.GET_MEDIA_FAILURE:
      case types.POST_MEDIA_FAILURE:
        case types.DELETE_MEDIA_FAILURE:  
        case types.EDIT_MEDIA_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
  
  
  
      default:
        return state;
    }
  };