import { APPLICATIONSTATUS_FAIL, APPLICATIONSTATUS_REQUEST, APPLICATIONSTATUS_SUCCESS, GET_APPLICATIONSTATUS_FAIL, GET_APPLICATIONSTATUS_REQUEST, GET_APPLICATIONSTATUS_RESET, GET_APPLICATIONSTATUS_SUCCESS } from "../Constants/SystemConstants";
import { CLEAR_ERRORS } from "../Constants/UserConstants";

export const statusReducer=(state={status:{}},{type,payload})=>{
    switch(type){
        case APPLICATIONSTATUS_REQUEST:
            case GET_APPLICATIONSTATUS_REQUEST:
        return {
            ...state,
            loading:true
        }
        case APPLICATIONSTATUS_SUCCESS:
            case GET_APPLICATIONSTATUS_SUCCESS:
            return{
            ...state,
            loading:false,
            status:payload.status,
            success:payload.success
            }
        case APPLICATIONSTATUS_FAIL:
            case GET_APPLICATIONSTATUS_FAIL:
            return{
                ...state,
                loading: false,
                error: payload,
            }
            case GET_APPLICATIONSTATUS_RESET:
                return {
                    status:null,
                    success:false
                }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null,
                };
            default:
                return state;
    }

}