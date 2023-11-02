import { LOAD_BECONOMIC_FAIL, LOAD_BECONOMIC_REQUEST, LOAD_BECONOMIC_SUCCESS, LOAD_ECONOMIC_FAIL, LOAD_ECONOMIC_REQUEST, LOAD_ECONOMIC_SUCCESS, REGISTER_BECONOMIC_FAIL, REGISTER_BECONOMIC_REQUEST, REGISTER_BECONOMIC_SUCCESS, REGISTER_ECONOMIC_FAIL, REGISTER_ECONOMIC_REQUEST, REGISTER_ECONOMIC_REST, REGISTER_ECONOMIC_SUCCESS } from "../Constants/EconomicConstants";
import { CLEAR_ERRORS } from "../Constants/UserConstants";
export const economicReducer = (state = { economic: {} },{ type, payload }) => {
    switch (type) {
      case REGISTER_ECONOMIC_REQUEST:
      case LOAD_ECONOMIC_REQUEST:
        return {
          loading: true,
        };
      case LOAD_ECONOMIC_SUCCESS:
        return {
          ...state,
          loading: false,
          economic: payload.economic,
        };
        case REGISTER_ECONOMIC_SUCCESS:
            return {
              ...state,
              loading: false,
              economic: payload.economic,
              economicSuccess:payload.success
            };  
      case REGISTER_ECONOMIC_FAIL:
        return {
          ...state,
          loading: false,
          economic: null,
          economicError: payload,
        };
        case REGISTER_ECONOMIC_REST:
          return {
            ...state,
            loading: false,
            economicSuccess:null
          };
      case LOAD_ECONOMIC_FAIL:
        return {
          loading: false,
          economic: null,
          error: payload,
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
  export const beconomicReducer = (state = { beconomic: {} },{ type, payload }) => {
    switch (type) {
      case REGISTER_BECONOMIC_REQUEST:
      case LOAD_BECONOMIC_REQUEST:
        return {
          loading: true,
        };
       case LOAD_BECONOMIC_SUCCESS:
        return {
          ...state,
          loading: false,
          beconomic: payload.beconomic,
        };
        case REGISTER_BECONOMIC_SUCCESS:
            return {
              ...state,
              loading: false,
              beconomic: payload.economic,
              beconomicSuccess:payload.success
            };
      case REGISTER_BECONOMIC_FAIL:
        return {
          ...state,
          loading: false,
          economic: null,
          beconomicError: payload,
        };
      case LOAD_BECONOMIC_FAIL:
        return {
          loading: false,
          economic: null,
          error: payload,
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