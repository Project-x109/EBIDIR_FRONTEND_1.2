import { BRANCH_DETAILS_REQUEST,BRANCH_DETAILS_SUCCESS,BRANCH_DETAILS_FAIL,CLEAR_ERRORS,REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,REGISTER_COMPANY_FAIL, REGISTER_USER_FAIL, REGISTER_COMPANY_REQUEST, REGISTER_COMPANY_SUCCESS, REGISTER_BANK_REQUEST, REGISTER_BANK_SUCCESS, REGISTER_BANK_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAIL, REGISTER_PERSONAL_REQUEST, REGISTER_PERSONAL_SUCCESS, REGISTER_PERSONAL_FAIL, UPDATE_PERSONAL_REQUEST, UPDATE_PERSONAL_SUCCESS, UPDATE_PERSONAL_FAIL, LOAD_PERSONAL_REQUEST, LOAD_PERSONAL_SUCCESS, LOAD_PERSONAL_FAIL, GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL, COMPANY_DETAILS_REQUEST, COMPANY_DETAILS_SUCCESS, COMPANY_DETAILS_FAIL, BANK_DETAILS_REQUEST, BANK_DETAILS_SUCCESS, BANK_DETAILS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL, ALL_COMPANIES_REQUEST, ALL_COMPANIES_SUCCESS, ALL_COMPANIES_FAIL, ALL_BANKS_REQUEST, ALL_BANKS_SUCCESS, ALL_BANKS_FAIL, ACTIVATE_SUCCESS, ACTIVATE_REQUEST, ACTIVATE_FAIL, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, GET_BANK_BARNCH_REQUEST, GET_BANK_BARANCH_FAIL, GET_BANK_BARNCH_SUCCESS, REGISTER_BRANCH_REQUEST, REGISTER_BRANCH_SUCCESS, REGISTER_BRANCH_FAIL, GET_MYBANK_BARNCH_REQUEST, GET_MYBANK_BARNCH_SUCCESS, GET_MYBANK_BARANCH_FAIL, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RECOVER_PASSWORD_REQUEST, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAIL, DEACTIVATE_ACCOUNT_REQUEST, DEACTIVATE_ACCOUNT_SUCCESS, DEACTIVATE_MY_ACCOUNT_REQUEST, DEACTIVATE_MY_ACCOUNT_SUCCESS, DEACTIVATE_MY_ACCOUNT_FAIL, DEACTIVATE_ACCOUNT_FAIL, BRANCH_BANK_DETAILS_REQUEST, BRANCH_BANK_DETAILS_SUCCESS, BRANCH_BANK_DETAILS_FAIL, REGISTER_AGENT_REQUEST, REGISTER_AGENT_SUCCESS, REGISTER_AGENT_FAIL, ALL_AGENT_USERS_REQUEST, ALL_AGENT_USERS_FAIL, ALL_AGENT_COMPANIES_REQUEST, ALL_AGENT_COMPANIES_SUCCESS, ALL_AGENT_COMPANIES_FAIL, ALL_AGENT_USERS_SUCCESS, GET_AGENT_INFO_REQUEST, GET_AGENT_INFO_SUCCESS, GET_AGENT_INFO_FAIL, ALL_AGENT_REQUEST, ALL_AGENT_SUCCESS, ALL_AGENT_FAIL, GET_ADMIN_USER_INFO_REQUEST, GET_ADMIN_USER_INFO_SUCCESS, GET_ADMIN_USER_INFO_FAIL, COMPANY_ADMIN_DETAILS_REQUEST, COMPANY_ADMIN_DETAILS_SUCCESS, COMPANY_ADMIN_DETAILS_FAIL, AGENT_DETIALS_REQUEST, AGENT_DETIALS_SUCCESS, AGENT_DETIALS_FAIL } from "../Constants/UserConstants";
import axios from 'axios';
axios.defaults.baseURL = 'https://ebidirbackend.onrender.com';
export const loginUser = (phoneNo, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const { data } = await axios.post('/api/v1/login',{ phoneNo, password },config
        );
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const logoutUser = () => async (dispatch) => {
    try {
    await axios.get('/api/v1/logout');
        dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"}
     }
        const { data } = await axios.post('/api/v1/register/user',userData,config);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload:error.response.data.message,
        });
    }
};
export const registerAgent = (userData) => async (dispatch) => {
    try {
        dispatch({ type:REGISTER_AGENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"}
     }
        const { data } = await axios.post('/api/v1/register/agent',userData,config);
        dispatch({
            type: REGISTER_AGENT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_AGENT_FAIL,
            payload:error.response.data.message,
        });
    }
};
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
export const registerCompany = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_COMPANY_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const { data } = await axios.post('/api/v1/register/company',userData,config
        );
        dispatch({
            type: REGISTER_COMPANY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_COMPANY_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const registerBank = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_BANK_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const { data } = await axios.post(
            '/api/v1/register/bank',userData,config);
        dispatch({
            type: REGISTER_BANK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_BANK_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const registerBranch = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_BRANCH_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const { data } = await axios.post(
            '/api/v1/addbranch',userData,config);
        dispatch({
            type: REGISTER_BRANCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_BRANCH_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const GetUser = () => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_REQUEST });
        const { data } = await axios.get('/api/v1/me');
        dispatch({
            type: GET_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_USER_FAIL,
            payload: error.response.data.message,
        });
    }
}; 
export const AddPersonal = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_PERSONAL_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const { data } = await axios.post('/api/v1/register/personal',userData,
            config);
        dispatch({
            type: REGISTER_PERSONAL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_PERSONAL_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const updatePersonal = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PERSONAL_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        const { data } = await axios.put('/api/v1/me/personal',userdata,config);
        dispatch({
            type: UPDATE_PERSONAL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PERSONAL_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const loadPersonal = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_PERSONAL_REQUEST });
        const { data } = await axios.get('/api/v1/me/personal');
        dispatch({
            type: LOAD_PERSONAL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOAD_PERSONAL_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getUser = () => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_INFO_REQUEST });
        const { data } = await axios.get('/api/v1/user');
        dispatch({
            type: GET_USER_INFO_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_USER_INFO_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getUserById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_ADMIN_USER_INFO_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch({
            type: GET_ADMIN_USER_INFO_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ADMIN_USER_INFO_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getCompanyById = (id) => async (dispatch) => {
    try {
        dispatch({ type: COMPANY_ADMIN_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/company/${id}`);
        dispatch({
            type: COMPANY_ADMIN_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COMPANY_ADMIN_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    } 
};
export const getCompanyDetails = () => async (dispatch) => {
    try {
        dispatch({ type: COMPANY_DETAILS_REQUEST });
        const { data } = await axios.get("/api/v1/company");
        dispatch({
            type: COMPANY_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COMPANY_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    } 
};
export const getBankDetails = () => async (dispatch) => {
    try {
        dispatch({ type: BANK_DETAILS_REQUEST });
        const { data } = await axios.get("/api/v1/mybank");
        dispatch({
            type: BANK_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BANK_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getMyBranchBank=()=>async(dispatch)=>{
    try {
        dispatch({ type: BRANCH_BANK_DETAILS_REQUEST });
        const { data } = await axios.get("/api/v1/branch/mybank");
        dispatch({
            type: BRANCH_BANK_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BRANCH_BANK_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
}
export const getBranchDetails = () => async (dispatch) => {
    try {
        dispatch({ type: BRANCH_DETAILS_REQUEST });
        const { data } = await axios.get("/api/v1/mybranch");
        dispatch({
            type: BRANCH_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BRANCH_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get('/api/v1/admin/users');
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users,
        });
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getAllCompanies = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_COMPANIES_REQUEST });
        const { data } = await axios.get('/api/v1/admin/companies');
        dispatch({
            type: ALL_COMPANIES_SUCCESS,
            payload: data.companies,
        });
    } catch (error) {
        dispatch({
            type: ALL_COMPANIES_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getAllUsersAgent = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_AGENT_USERS_REQUEST });
        const { data } = await axios.get('/api/v1/agent/users');
        dispatch({
            type: ALL_AGENT_USERS_SUCCESS,
            payload: data.users,
        });
    } catch (error) {
        dispatch({
            type: ALL_AGENT_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getAllAgents = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_AGENT_REQUEST });
        const { data } = await axios.get('/api/v1/admin/agents');
        dispatch({
            type: ALL_AGENT_SUCCESS,
            payload: data.agents,
        });
    } catch (error) {
        dispatch({
            type: ALL_AGENT_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getAllCompaniesAgent = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_AGENT_COMPANIES_REQUEST });
        const { data } = await axios.get('/api/v1/agent/companies');
        dispatch({
            type: ALL_AGENT_COMPANIES_SUCCESS,
            payload: data.companies,
        });
    } catch (error) {
        dispatch({
            type: ALL_AGENT_COMPANIES_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getAllBanks = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BANKS_REQUEST });
        const { data } = await axios.get('/api/v1/admin/banks');
        dispatch({
            type: ALL_BANKS_SUCCESS,
            payload: data.banks,
        });
    } catch (error) {
        dispatch({
            type: ALL_BANKS_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const activate=(id)=>async(dispatch)=>{
try{
    dispatch({type:ACTIVATE_REQUEST})
    const config = {
        headers: {
            "Content-Type": "application/json"}
    }
    const {data}=await axios.post('/api/v1/activate',id,config)
    dispatch({type:ACTIVATE_SUCCESS,
        payload:data.success})
}catch(error){
    dispatch({type:ACTIVATE_FAIL,
        payload: error.response.data.message,
    })
}
}
export const Changepassword=(userdata)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST})
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const {data}=await axios.put('/api/v1/changepass',userdata,config)
        dispatch({type:UPDATE_PASSWORD_SUCCESS,
            payload:data.success})
    }catch(error){
        dispatch({type:UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
    }
    export const Resetpassword=(user)=>async(dispatch)=>{
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            dispatch({type:RECOVER_PASSWORD_REQUEST})
            const {data}=await axios.post(`/api/v1/password/reset`,user,config)
            dispatch({type:RECOVER_PASSWORD_SUCCESS,
                payload:data.success})
        }catch(error){
            dispatch({type:RECOVER_PASSWORD_FAIL,
                payload: error.response.data.message,
            })
        }
        }
export const getBranchByBank=(bank_name)=>async(dispatch)=>{
    try{
        dispatch({type:GET_BANK_BARNCH_REQUEST})
        const config = {
            headers: {
                "Content-Type": "application/json"}
        }
        const {data}=await axios.post('/api/v1/bankbranches',bank_name,config);
       dispatch({type:GET_BANK_BARNCH_SUCCESS,
    payload:data})
    }catch(error){
        dispatch({type:GET_BANK_BARANCH_FAIL,
        payload:error.response.data.message});
    }
}
export const getMyBranches=()=>async(dispatch)=>{
    try{
        
        dispatch({type:GET_MYBANK_BARNCH_REQUEST})
        const {data}=await axios.get('/api/v1/mybranches');
       dispatch({type:GET_MYBANK_BARNCH_SUCCESS,
    payload:data})
    }catch(error){
        dispatch({type:GET_MYBANK_BARANCH_FAIL,
        payload:error.response.data.message});
    }
}
export const forgotPassword=(userdata)=>async(dispatch)=>{
    try{ 
         const config = {
        headers: {
            "Content-Type": "application/json"}
    }
     dispatch({type:FORGOT_PASSWORD_REQUEST})
     const {data}=await axios.post("/api/v1/password/forgot",userdata,config)
 
     dispatch({type:FORGOT_PASSWORD_SUCCESS,
    payload:data.success})
    }catch(err){
        dispatch({type:FORGOT_PASSWORD_FAIL,
        payload:err.response.data.message})
    }
}
export const deactivateAccount=(userData)=>async(dispatch)=>{
        const config = {
       headers: {
           "Content-Type": "application/json"}
   }
    try{
        dispatch({type:DEACTIVATE_ACCOUNT_REQUEST})
const {data}=await axios.post("/api/v1/admin/delete",userData,config);

dispatch({type:DEACTIVATE_ACCOUNT_SUCCESS,
payload:data})
    }catch(err){
        dispatch({type:DEACTIVATE_ACCOUNT_FAIL,
        payload:err.response.data.message})
    }
}
export const deactivateMyAccount=()=>async(dispatch)=>{
try{
    dispatch({type:DEACTIVATE_MY_ACCOUNT_REQUEST})
const {data}=await axios.get("/api/v1/delete");

dispatch({type:DEACTIVATE_MY_ACCOUNT_SUCCESS,
payload:data})
}catch(err){
    dispatch({type:DEACTIVATE_MY_ACCOUNT_FAIL,
    payload:err.response.data.message})
}
}
export const getAgent = () => async (dispatch) => {
    try {
        dispatch({ type: GET_AGENT_INFO_REQUEST });
        const { data } = await axios.get('/api/v1/agent');
        dispatch({
            type: GET_AGENT_INFO_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_AGENT_INFO_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getAgentDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: AGENT_DETIALS_REQUEST });
        const { data } = await axios.get(`/api/v1/agent/detail/${id}`);
        dispatch({
            type: AGENT_DETIALS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: AGENT_DETIALS_FAIL,
            payload: error.response.data.message,
        });
    }
};

