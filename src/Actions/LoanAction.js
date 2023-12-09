import axios from "axios";
import {
  AMORTIZE_BLOAN_FAIL,
  AMORTIZE_BLOAN_REQUEST,
  AMORTIZE_BLOAN_SUCCESS,
  AMORTIZE_LOAN_FAIL,
  AMORTIZE_LOAN_REQUEST,
  AMORTIZE_LOAN_SUCCESS,
  BANK_BLOAN_FAIL,
  BANK_BLOAN_REQUEST,
  BANK_BLOAN_SUCCESS,
  BANK_LOAN_FAIL,
  BANK_LOAN_REQUEST,
  BANK_LOAN_SUCCESS,
  BLOAN_DETAILS_FAIL,
  BLOAN_DETAILS_REQUEST,
  BLOAN_DETAILS_SUCCESS,
  BRANCH_BLOAN_FAIL,
  BRANCH_BLOAN_REQUEST,
  BRANCH_BLOAN_SUCCESS,
  BRANCH_LOAN_FAIL,
  BRANCH_LOAN_REQUEST,
  BRANCH_LOAN_SUCCESS,
  GETALL_BLOANS_FAIL,
  GETALL_BLOANS_REQUEST,
  GETALL_BLOANS_SUCCESS,
  GETALL_LOANS_FAIL,
  GETALL_LOANS_REQUEST,
  GETALL_LOANS_SUCCESS,
  GET_STATUS_FAIL,
  GET_STATUS_REQUEST,
  GET_STATUS_SUCCESS,
  LOAD_BLOAN_FAIL,
  LOAD_BLOAN_REQUEST,
  LOAD_BLOAN_SUCCESS,
  LOAD_LOAN_FAIL,
  LOAD_LOAN_REQUEST,
  LOAD_LOAN_SUCCESS,
  LOAN_DETAILS_FAIL,
  LOAN_DETAILS_REQUEST,
  LOAN_DETAILS_SUCCESS,
  REGISTER_BLOAN_FAIL,
  REGISTER_BLOAN_REQUEST,
  REGISTER_BLOAN_SUCCESS,
  REGISTER_LOAN_FAIL,
  REGISTER_LOAN_REQUEST,
  REGISTER_LOAN_SUCCESS,
  UPDATE_BLOAN_FAIL,
  UPDATE_BLOAN_REQUEST,
  UPDATE_BLOAN_SUCCESS,
  UPDATE_LOAN_FAIL,
  UPDATE_LOAN_REQUEST,
  UPDATE_LOAN_SUCCESS,
} from "../Constants/LoanConstants";
axios.defaults.baseURL = 'https://ebidirbackend.onrender.com';
export const addLoan = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_LOAN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/loan/add", userData, config);
    dispatch({
      type: REGISTER_LOAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_LOAN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const addBLoan = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_BLOAN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/bloan/add", userData, config);
    dispatch({
      type: REGISTER_BLOAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_BLOAN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getLoan = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_LOAN_REQUEST });
    const { data } = await axios.get("/api/v1/myloan");
    dispatch({
      type: LOAD_LOAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_LOAN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getBLoan = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_BLOAN_REQUEST });
    const { data } = await axios.get("/api/v1/mybloan");
    dispatch({
      type: LOAD_BLOAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_BLOAN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getLoanDetails = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: LOAN_DETAILS_REQUEST });
    const { data } = await axios.post("/api/v1/theloan", id, config);
    dispatch({
      type: LOAN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAN_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getBLoanDetails = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: BLOAN_DETAILS_REQUEST });
    const { data } = await axios.post("/api/v1/thebloan", id, config);
    dispatch({
      type: BLOAN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOAN_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateLoan = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LOAN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/loan/update", userData, config);
    dispatch({
      type: UPDATE_LOAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LOAN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateAmortizeLoan = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AMORTIZE_LOAN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/loan/amortize",
      userData,
      config
    );
    dispatch({
      type: AMORTIZE_LOAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AMORTIZE_LOAN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateAmortizeBLoan = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AMORTIZE_BLOAN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/bloan/amortize",
      userData,
      config
    );
    dispatch({
      type: AMORTIZE_BLOAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AMORTIZE_BLOAN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateBLoan = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BLOAN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/bloan/update", userData, config);
    dispatch({
      type: UPDATE_BLOAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BLOAN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getBankLoans = () => async (dispatch) => {
  try {
    dispatch({ type: BANK_LOAN_REQUEST });
    const { data } = await axios.get("/api/v1/loanbybank");
    dispatch({
      type: BANK_LOAN_SUCCESS,
      payload: data.bankLoan,
    });
  } catch (error) {
    dispatch({
      type: BANK_LOAN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getBankBLoans = () => async (dispatch) => {
  try {
    dispatch({ type: BANK_BLOAN_REQUEST });
    const { data } = await axios.get("/api/v1/bloanbybank");
    dispatch({
      type: BANK_BLOAN_SUCCESS,
      payload: data.bankBLoan,
    });
  } catch (error) {
    dispatch({
      type: BANK_BLOAN_FAIL,
      payload: error.response.data?.message,
    });
  }
};
export const getBranchLoans = () => async (dispatch) => {
  try {
    dispatch({ type: BRANCH_LOAN_REQUEST });
    const { data } = await axios.get("/api/v1/loanbybranch");
    dispatch({
      type: BRANCH_LOAN_SUCCESS,
      payload: data.branchLoan,
  
    });
  } catch (error) {
    dispatch({
      type: BRANCH_LOAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getBranchBLoans = () => async (dispatch) => {
  try {
    dispatch({ type: BRANCH_BLOAN_REQUEST });
    const { data } = await axios.get("/api/v1/bloanbybranch");
    dispatch({
      type: BRANCH_BLOAN_SUCCESS,
      payload: data.branchBLoan,
    });
  } catch (error) {
    dispatch({
      type: BRANCH_BLOAN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getAllLoans = () => async (dispatch) => {
  try {
    dispatch({ type: GETALL_LOANS_REQUEST });
    const { data } = await axios.get("/api/v1/admin/loans");
    dispatch({
      type: GETALL_LOANS_SUCCESS,
      payload: data.loans,
    });
  } catch (error) {
    dispatch({
      type: GETALL_LOANS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getAllBLoans = () => async (dispatch) => {
  try {
    dispatch({ type: GETALL_BLOANS_REQUEST });
    const { data } = await axios.get("/api/v1/bloans");
    dispatch({
      type: GETALL_BLOANS_SUCCESS,
      payload: data.bloans,
    });
  } catch (error) {
    dispatch({
      type: GETALL_BLOANS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const GetStatus=()=>async(dispatch)=>{
  try{
    dispatch({type:GET_STATUS_REQUEST})
     const {data}=await axios.get("/api/v1/statusreport");
     dispatch({type:GET_STATUS_SUCCESS,
    payload:data.statusData
  })
  }catch(error){
    dispatch({type:GET_STATUS_FAIL,
    payload:error.response.data.message
  })
  }
}
