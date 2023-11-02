import { ADD_BUILDING_FAIL, ADD_BUILDING_REQUEST, ADD_BUILDING_REST, ADD_BUILDING_SUCCESS, GET_BUILDING_FAIL, GET_BUILDING_REQUEST, GET_BUILDING_SUCCESS, LOAN_BUILDING_FAIL, LOAN_BUILDING_REQUEST, LOAN_BUILDING_SUCCESS, MY_BUILDING_FAIL, MY_BUILDING_REQUEST, MY_BUILDING_SUCCESS } from "../Constants/BuildingConstants";
import { CLEAR_ERRORS } from "../Constants/UserConstants";
export const buidingReducer = (state = { building: {} }, { type, payload }) => {
    switch (type) {
      case ADD_BUILDING_REQUEST:
        case GET_BUILDING_REQUEST:
          case LOAN_BUILDING_REQUEST:
        return {
          loading: true,
        };
      case ADD_BUILDING_SUCCESS:
        case GET_BUILDING_SUCCESS:
          case LOAN_BUILDING_SUCCESS:
        return {
          ...state,
          loading: false,
          buildingSuccess: payload.success,
          building: payload.building,
        };
      case ADD_BUILDING_FAIL:
         case GET_BUILDING_FAIL:
          case LOAN_BUILDING_FAIL:
        return {
          ...state,
          loading: false,
          building: null,
          buildingError: payload,
        };
        case ADD_BUILDING_REST:
          return {
            ...state,
            buildingSuccess:null,
            loading: false,
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
  export const myBuildingReducer = (state = { myBuilding: {} }, { type, payload }) => {
    switch (type) {
      case MY_BUILDING_REQUEST:
        return {
          loading: true,
        };
      case MY_BUILDING_SUCCESS:
        return {
          ...state,
          loading: false,
          Success: payload.success,
          myBuilding: payload.myBuilding,
        };
      case MY_BUILDING_FAIL:
        return {
          ...state,
          loading: false,
          mycars: null,
          berror: payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          berror: null,
        };
      default:
        return state;
    }
  };