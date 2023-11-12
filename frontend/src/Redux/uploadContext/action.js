import * as types from "./actionTypes";
import axios from "axios";

export const getMedia = (id) => (dispatch) => {
    dispatch({type: types.GET_MEDIA_REQUEST});
    return axios
    .get(`http://localhost:4000/api/v1/media?projectId=${id}`)
    .then((res) => {
        dispatch({type: types.GET_MEDIA_SUCCESS, payload: res.data});
   
    })
    .catch((e) => {
        dispatch({type: types.GET_MEDIA_FAILURE, payload: e});
    });
};

export const postMedia = ({name , description , projectId}) => (dispatch) => {
    console.log(name , description,projectId);
    dispatch({ type: types.POST_MEDIA_REQUEST });
    
    return axios
        .post(`http://localhost:4000/api/v1/uploadMedia`, {name , description,projectId})
        .then((res) => {
            // Check the structure of the response from the server
        
            dispatch({ type: types.POST_MEDIA_SUCCESS, payload: res.data });
            
        })
        .catch((e) => {
            dispatch({ type: types.POST_MEDIA_FAILURE, payload: e });
        });
};

export const deleteMedia = ({ mediaId, projectId }) => (dispatch) => {
    console.log(mediaId, projectId);
    dispatch({ type: types.DELETE_MEDIA_REQUEST });
  
    return axios
      .delete("http://localhost:4000/api/v1/deletemedia", { data: { projectId, mediaId } })
      .then((res) => {
        // Check the structure of the response from the server
        dispatch({ type: types.DELETE_MEDIA_SUCCESS, payload: res.data });
        console.log(res.data);
      })
      .catch((e) => {
        dispatch({ type: types.DELETE_MEDIA_FAILURE, payload: e });
      });
  };

 export const editMedia = (itemId , description) => (dispatch) => {
    console.log(itemId, description);
    dispatch({type:types.EDIT_MEDIA_REQUEST});
    return axios
    .put(`http://localhost:4000/api/v1/editmedia`, {itemId , description})
    .then((r) => {
        dispatch({type: types.EDIT_MEDIA_SUCCESS, payload: r.data});
    })
    .catch((e) => {
        dispatch({type: types.EDIT_MEDIA_FAILURE, payload: e});
    });
};
  