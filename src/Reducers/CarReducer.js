import { ADD_CAR_FAIL, ADD_CAR_REQUEST, ADD_CAR_REST, ADD_CAR_SUCCESS, GET_CAR_FAIL, GET_CAR_REQUEST, GET_CAR_SUCCESS, GET__MYCAR_FAIL, GET__MYCAR_REQUEST, GET__MYCAR_SUCCESS, LOAN_CAR_FAIL, LOAN_CAR_REQUEST, LOAN_CAR_SUCCESS } from "../Constants/CarConstants";
import { CLEAR_ERRORS } from "../Constants/UserConstants";
export const carReducer = (state = { car: {} }, { type, payload }) => {
    switch (type) {
      case ADD_CAR_REQUEST:
      case GET_CAR_REQUEST:
        case LOAN_CAR_REQUEST:
        return {
          loading: true,
        };
      case ADD_CAR_SUCCESS:
        case GET_CAR_SUCCESS:
          case LOAN_CAR_SUCCESS:
        return {
          ...state,
          loading: false,
          carSuccess: payload.success,
          car: payload.car,
        };
      case ADD_CAR_FAIL:
        case GET_CAR_FAIL:
          case LOAN_CAR_FAIL:
        return {
          ...state,
          loading: false,
          car: null,
          carError: payload,
        };
        case ADD_CAR_REST:
          return {
            ...state,
            carSuccess: null,
            carError:null
          }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  export const myCarReducer = (state = { mycars: {} }, { type, payload }) => {
    switch (type) {
      case GET__MYCAR_REQUEST:
        return {
          loading: true,
        };
      case GET__MYCAR_SUCCESS:
        return {
          ...state,
          loading: false,
          Success: payload.success,
          mycars: payload.mycars,
        };
      case GET__MYCAR_FAIL:
        return {
          ...state,
          loading: false,
          mycars: null,
          Error: payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };