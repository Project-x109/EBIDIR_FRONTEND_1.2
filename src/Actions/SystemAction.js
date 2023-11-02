import axios from "axios"
import { APPLICATIONSTATUS_FAIL, APPLICATIONSTATUS_REQUEST, APPLICATIONSTATUS_SUCCESS, GET_APPLICATIONSTATUS_FAIL, GET_APPLICATIONSTATUS_REQUEST, GET_APPLICATIONSTATUS_SUCCESS } from "../Constants/SystemConstants"

export const ApplicationStatus=(appInfo)=>async(dispatch)=>{
    try{
    const config = {
        headers: {
            "Content-Type": "application/json"}
    }
    dispatch({type:APPLICATIONSTATUS_REQUEST})
    const {data}=await axios.post("/api/v1/app/status",appInfo,config)
    dispatch({type:APPLICATIONSTATUS_SUCCESS,
    payload:data.ApplicationStatus
})}catch(error){
    dispatch({type:APPLICATIONSTATUS_FAIL,
    payload:error.response.data.message})
}
}

export const getStatus=()=>async(dispatch)=>{
    try{
    dispatch({type:GET_APPLICATIONSTATUS_REQUEST})
    const {data}=await axios.get("/api/v1/getstatus")
    dispatch({type:GET_APPLICATIONSTATUS_SUCCESS,
    payload:data
})}catch(error){
    dispatch({type:GET_APPLICATIONSTATUS_FAIL,
    payload:error.response.data.message})
}
}