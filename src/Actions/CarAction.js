import axios from "axios";
import { ADD_CAR_FAIL, ADD_CAR_REQUEST, ADD_CAR_SUCCESS, ALL_CAR_FAIL, ALL_CAR_REQUEST, ALL_CAR_SUCCESS, GET_CAR_FAIL, GET_CAR_REQUEST, GET_CAR_SUCCESS, GET__MYCAR_FAIL, GET__MYCAR_REQUEST, GET__MYCAR_SUCCESS, LOAN_CAR_FAIL, LOAN_CAR_REQUEST, LOAN_CAR_SUCCESS } from "../Constants/CarConstants";
export const addcar = (carData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_CAR_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const { data } = await axios.post('/api/v1/car/add',carData,config);
        dispatch({
            type: ADD_CAR_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADD_CAR_FAIL,
            payload: error.response.data.message,
        });
    }
  };
  export const getMycars=()=>async (dispatch)=>{
    try {

        dispatch({ type: GET__MYCAR_REQUEST});
        const { data } = await axios.get('/api/v1/mycars');
        dispatch({
            type: GET__MYCAR_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET__MYCAR_FAIL,
            payload: error.response.data.message,
        });
    }
}
export const getCarById=(id)=>async (dispatch)=>{
    try {
        dispatch({ type: GET_CAR_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const { data } = await axios.post('/api/v1/car',id,config);
        dispatch({
            type: GET_CAR_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_CAR_FAIL,
            payload: error.response.data.message,
        });
    }
}
export const getCarByLoanId=(id)=>async (dispatch)=>{
    try {
        dispatch({ type: LOAN_CAR_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const { data } = await axios.post('/api/v1/loancar',id,config);
        dispatch({
            type: LOAN_CAR_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOAN_CAR_FAIL,
            payload: error.response.data.message,
        });
    }
}
export const getAllCars = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CAR_REQUEST });
        const { data } = await axios.get('/api/v1/allcars');
        dispatch({
            type: ALL_CAR_SUCCESS,
            payload: data.cars,
        });
    } catch (error) {
        dispatch({
            type: ALL_CAR_FAIL,
            payload: error.response.data.message,
        });
    }
};