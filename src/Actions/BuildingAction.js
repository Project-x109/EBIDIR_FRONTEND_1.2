import axios from "axios";
import { ADD_BUILDING_FAIL, ADD_BUILDING_REQUEST, ADD_BUILDING_SUCCESS, ALL_BUILDING_FAIL, ALL_BUILDING_REQUEST, ALL_BUILDING_SUCCESS, GET_BUILDING_FAIL, GET_BUILDING_REQUEST, GET_BUILDING_SUCCESS, LOAN_BUILDING_FAIL, LOAN_BUILDING_REQUEST, LOAN_BUILDING_SUCCESS, MY_BUILDING_FAIL, MY_BUILDING_REQUEST, MY_BUILDING_SUCCESS } from "../Constants/BuildingConstants";
export const addBuilding = (buildingData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_BUILDING_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const { data } = await axios.post(
            '/api/v1/building/add',
            buildingData,
            config
        );
        dispatch({
            type: ADD_BUILDING_SUCCESS, 
            payload: data});
    } catch (error) {
        dispatch({
            type: ADD_BUILDING_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getMyBuilding=()=>async (dispatch)=>{
    try {
        dispatch({ type: MY_BUILDING_REQUEST});
        const { data } = await axios.get('/api/v1/mybuilding');
        dispatch({
            type: MY_BUILDING_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MY_BUILDING_FAIL,
            payload: error.response.data.message,
        });
    }
}
export const getBuildingById=(id)=>async (dispatch)=>{
    try {

        dispatch({ type: GET_BUILDING_REQUEST});
  
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        const { data } = await axios.post('/api/v1/building',
        id,
          config        
        );
        dispatch({
            type: GET_BUILDING_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_BUILDING_FAIL,
            payload: error.response.data.message,
        });
    }
}
export const getBuildingByLoanId=(id)=>async (dispatch)=>{
    try {
        dispatch({ type: LOAN_BUILDING_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        const { data } = await axios.post('/api/v1/loanbuilding',id,config
        );
        dispatch({
            type: LOAN_BUILDING_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOAN_BUILDING_FAIL,
            payload: error.response.data.message,
        });
    }
}
export const getAllBuildings = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BUILDING_REQUEST });
        const { data } = await axios.get('/api/v1/buildings');
        dispatch({
            type: ALL_BUILDING_SUCCESS,
            payload: data.buildings,
        });
    } catch (error) {
        dispatch({
            type: ALL_BUILDING_FAIL,
            payload: error.response.data.message,
        });
}
};