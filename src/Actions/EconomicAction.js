import axios from "axios";
import { LOAD_BECONOMIC_FAIL, LOAD_BECONOMIC_REQUEST, LOAD_BECONOMIC_SUCCESS, LOAD_ECONOMIC_FAIL, LOAD_ECONOMIC_REQUEST, LOAD_ECONOMIC_SUCCESS, REGISTER_BECONOMIC_FAIL, REGISTER_BECONOMIC_REQUEST, REGISTER_BECONOMIC_SUCCESS, REGISTER_ECONOMIC_FAIL, REGISTER_ECONOMIC_REQUEST, REGISTER_ECONOMIC_SUCCESS } from "../Constants/EconomicConstants";
import { UPDATE_BECONOMIC_FAIL, UPDATE_BECONOMIC_REQUEST, UPDATE_BECONOMIC_SUCCESS, UPDATE_ECONOMIC_FAIL, UPDATE_ECONOMIC_REQUEST, UPDATE_ECONOMIC_SUCCESS } from "../Constants/UserConstants";
export const AddEconomic = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_ECONOMIC_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const { data } = await axios.post('/api/v1/register/economic',userData,config);
        dispatch({
            type: REGISTER_ECONOMIC_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_ECONOMIC_FAIL,
            payload: error.response.data.message,
        });
    }
  };
  export const updateEconomic = (userdata) => async (dispatch) => {
    try {
      const config = {
          headers: {
              "Content-Type": "application/json"}
            }
        dispatch({ type: UPDATE_ECONOMIC_REQUEST });
        const { data } = await axios.put('/api/v1/me/economic',userdata, config);
        dispatch({
            type: UPDATE_ECONOMIC_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ECONOMIC_FAIL,
            payload: error.response.data.message,
        });
    }
  };
  export const loadEconomic = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_ECONOMIC_REQUEST });
        const { data } = await axios.get('/api/v1/me/economic');
        dispatch({
            type: LOAD_ECONOMIC_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOAD_ECONOMIC_FAIL,
            payload: error.response.data.message,
        });
    }
  };
  export const registerBEconomic = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_BECONOMIC_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const { data } = await axios.post(
            '/api/v1/register/beconomic',userData,config);
        dispatch({
            type: REGISTER_BECONOMIC_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_BECONOMIC_FAIL,
            payload: error.response.data.message,
        });
    }
  };
  export const loadBEconomic = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_BECONOMIC_REQUEST });
        const { data } = await axios.get('/api/v1/me/beconomic');
        dispatch({
            type: LOAD_BECONOMIC_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOAD_BECONOMIC_FAIL,
            payload: error.response.data.message,
        });
    }
  };
  export const updateBEconomic = (userdata) => async (dispatch) => {
    try {
      const config = {
          headers: {
              "Content-Type": "application/json"}
      }
        dispatch({ type: UPDATE_BECONOMIC_REQUEST });
        const { data } = await axios.put('/api/v1/me/beconomic',userdata,config);
        dispatch({
            type: UPDATE_BECONOMIC_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BECONOMIC_FAIL,
            payload: error.response.data.message,
        });
    }
  };