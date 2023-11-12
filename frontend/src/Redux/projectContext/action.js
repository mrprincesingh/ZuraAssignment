//describe your actions here
import * as types from "./actionTypes";
import axios from "axios";


export const getProject = () => (dispatch) => {
    dispatch({type: types.GET_PROJECT_REQUEST});
    return axios
    .get(`http://localhost:4000/api/v1/project`)
    .then((res) => {
        dispatch({type: types.GET_PROJECT_SUCCESS, payload: res.data});
   
    })
    .catch((e) => {
        dispatch({type: types.GET_PROJECT_FAILURE, payload: e});
    });
};

export const postProject = (payload) => (dispatch) => {
    console.log(payload)
    dispatch({ type: types.POST_PROJECT_REQUEST });
    
    return axios
        .post(`http://localhost:4000/api/v1/createproject`, payload)
        .then((res) => {
            // Check the structure of the response from the server
            const responseData = res.data;

            // Assuming the response contains the project data
            dispatch({ type: types.POST_PROJECT_SUCCESS, payload: responseData });
        })
        .catch((e) => {
            dispatch({ type: types.POST_PROJECT_FAILURE, payload: e });
        });
};


