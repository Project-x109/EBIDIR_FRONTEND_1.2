import {
  BRANCH_DETAILS_REQUEST,
  BRANCH_DETAILS_SUCCESS,
  BRANCH_DETAILS_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_RESET,
  CLEAR_ERRORS,
  REGISTER_COMPANY_REQUEST,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_RESET,
  REGISTER_COMPANY_FAIL,
  REGISTER_BANK_REQUEST,
  REGISTER_BANK_SUCCESS,
  REGISTER_BANK_FAIL,
  REGISTER_BANK_RESET,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  REGISTER_PERSONAL_REQUEST,
  LOAD_PERSONAL_REQUEST,
  LOAD_PERSONAL_SUCCESS,
  REGISTER_PERSONAL_SUCCESS,
  REGISTER_PERSONAL_FAIL,
  LOAD_PERSONAL_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PERSONAL_REQUEST,
  UPDATE_ECONOMIC_REQUEST,
  UPDATE_BECONOMIC_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_BECONOMIC_SUCCESS,
  UPDATE_ECONOMIC_SUCCESS,
  UPDATE_PERSONAL_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_FAIL,
  UPDATE_BECONOMIC_FAIL,
  UPDATE_PERSONAL_FAIL,
  UPDATE_ECONOMIC_FAIL,
  UPDATE_PERSONAL_RESET,
  UPDATE_ECONOMIC_RESET,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_RESET,
  UPDATE_BECONOMIC_RESET,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_DETAILS_FAIL,
  BANK_DETAILS_REQUEST,
  BANK_DETAILS_SUCCESS,
  BANK_DETAILS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  ALL_COMPANIES_REQUEST,
  ALL_COMPANIES_SUCCESS,
  ALL_COMPANIES_FAIL,
  ALL_BANKS_REQUEST,
  ALL_BANKS_SUCCESS,
  ALL_BANKS_FAIL,
  ACTIVATE_REQUEST,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
  ACTIVATE_RESET,
  GET_BANK_BARNCH_REQUEST,
  GET_BANK_BARNCH_SUCCESS,
  GET_BANK_BARANCH_FAIL,
  REGISTER_BRANCH_REQUEST,
  REGISTER_BRANCH_SUCCESS,
  REGISTER_BRANCH_FAIL,
  REGISTER_BRANCH_RESET,
  GET_MYBANK_BARNCH_REQUEST,
  GET_MYBANK_BARNCH_SUCCESS,
  GET_MYBANK_BARANCH_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_RESET,
  FORGOT_PASSWORD_FAIL,
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_FAIL,
  DEACTIVATE_ACCOUNT_REQUEST,
  DEACTIVATE_MY_ACCOUNT_REQUEST,
  DEACTIVATE_ACCOUNT_SUCCESS,
  DEACTIVATE_MY_ACCOUNT_SUCCESS,
  DEACTIVATE_ACCOUNT_FAIL,
  DEACTIVATE_MY_ACCOUNT_FAIL,
  DEACTIVATE_ACCOUNT_RESET,
  DEACTIVATE_MY_ACCOUNT_RESET,
  BRANCH_BANK_DETAILS_REQUEST,
  BRANCH_BANK_DETAILS_SUCCESS,
  BRANCH_BANK_DETAILS_FAIL,
  REGISTER_AGENT_REQUEST,
  REGISTER_AGENT_SUCCESS,
  REGISTER_AGENT_FAIL,
  REGISTER_AGENT_RESET,
  ALL_AGENT_USERS_REQUEST,
  ALL_AGENT_USERS_SUCCESS,
  ALL_AGENT_USERS_FAIL,
  ALL_AGENT_COMPANIES_REQUEST,
  ALL_AGENT_COMPANIES_SUCCESS,
  ALL_AGENT_COMPANIES_FAIL,
  GET_AGENT_INFO_REQUEST,
  GET_AGENT_INFO_SUCCESS,
  GET_AGENT_INFO_FAIL,
  ALL_AGENT_REQUEST,
  ALL_AGENT_SUCCESS,
  ALL_AGENT_FAIL,
  COMPANY_ADMIN_DETAILS_REQUEST,
  COMPANY_ADMIN_DETAILS_SUCCESS,
  COMPANY_ADMIN_DETAILS_FAIL,
  GET_ADMIN_USER_INFO_REQUEST,
  GET_ADMIN_USER_INFO_SUCCESS,
  GET_ADMIN_USER_INFO_FAIL,
  AGENT_DETIALS_REQUEST,
  AGENT_DETIALS_SUCCESS,
  AGENT_DETIALS_FAIL,
} from "../Constants/UserConstants";
export const adminUserReducer = (
  state = { newuser: {} },
  { type, payload }
) => {
  switch (type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        newuser: payload.newuser,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case REGISTER_USER_RESET:
      return {
        ...state,
        success: false,
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
export const AgentReducer = (state = { newagent: {} }, { type, payload }) => {
  switch (type) {
    case REGISTER_AGENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_AGENT_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        newagent: payload.newagent,
      };
    case REGISTER_AGENT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case REGISTER_AGENT_RESET:
      return {
        ...state,
        success: false,
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

export const UserReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case GET_USER_INFO_REQUEST:
    case COMPANY_DETAILS_REQUEST:
    case COMPANY_ADMIN_DETAILS_REQUEST:
    case GET_AGENT_INFO_REQUEST:
    case GET_ADMIN_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_INFO_SUCCESS:
    case GET_ADMIN_USER_INFO_SUCCESS:
    case GET_AGENT_INFO_SUCCESS:
      
      return {
        loading: false,
        success: payload.success,
        user: payload.user,
      };
    case COMPANY_DETAILS_SUCCESS:
    case COMPANY_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        user: payload.company,
      };
    case GET_USER_INFO_FAIL:
    case GET_ADMIN_USER_INFO_FAIL:
    case COMPANY_DETAILS_FAIL:
    case COMPANY_ADMIN_DETAILS_FAIL:
    case GET_AGENT_INFO_FAIL:
      return {
        ...state,
        loading: false,
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
export const LoanUserReducer = (state = { theUser:{} }, { type, payload }) => {
    switch (type) {
                case COMPANY_ADMIN_DETAILS_REQUEST:
                    case GET_ADMIN_USER_INFO_REQUEST:
            return {
                ...state,
                loading:true,
                };
            case GET_ADMIN_USER_INFO_SUCCESS:
            return {
                loading:false,
                success: payload.success,
                theUser: payload.theuser,
            };
                case COMPANY_ADMIN_DETAILS_SUCCESS:
                return {
                    loading:false,
                    success: payload.success,
                    theUser: payload.thecompany,
                };
            case GET_ADMIN_USER_INFO_FAIL:
            case COMPANY_ADMIN_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
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
export const CompanyReducer = (state = { company:{} }, { type, payload }) => {
    switch (type) {
            case COMPANY_DETAILS_REQUEST:
            return {
                ...state,
                loading:true,
                };
            case COMPANY_DETAILS_SUCCESS:
                return {
                    loading:false,
                    success: payload.success,
                    company: payload.company,
                };
            case COMPANY_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
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
export const adminCompanyReducer = (
  state = { newcompany: {} },
  { type, payload }
) => {
  switch (type) {
    case REGISTER_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_COMPANY_SUCCESS:
      return {
        loading: false,
        csuccess: payload.success,
        newcompany: payload.newcompany,
      };
    case REGISTER_COMPANY_FAIL:
      return {
        ...state,
        loading: false,
        cerror: payload,
      };
    case REGISTER_COMPANY_RESET:
      return {
        ...state,
        csuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        cerror: null,
      };
    default:
      return state;
  }
};
export const adminBankReducer = (
  state = { newbank: {} },
  { type, payload }
) => {
  switch (type) {
    case REGISTER_BANK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_BANK_SUCCESS:
      return {
        loading: false,
        bsuccess: payload.success,
        newbank: payload.newuser,
      };
    case REGISTER_BANK_FAIL:
      return {
        ...state,
        loading: false,
        berror: payload,
      };
    case REGISTER_BANK_RESET:
      return {
        ...state,
        bsuccess: false,
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
export const loginReducer = (state = { login: {} }, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_REQUEST:
    case GET_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_USER_SUCCESS:
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        login: payload.login,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        login: null,
        isAuthenticated: false,
      };
    case LOGIN_USER_FAIL:
    case GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        login: null,
        error: payload,
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
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
export const personalReducer = (
  state = { personal: {} },
  { type, payload }
) => {
  switch (type) {
    case REGISTER_PERSONAL_REQUEST:
    case LOAD_PERSONAL_REQUEST:
      return {
        loading: true,
      };
    case LOAD_PERSONAL_SUCCESS:
      return {
        ...state,
        loading: false,
        Success: payload.success,
        personal: payload.personal,
      };
    case REGISTER_PERSONAL_SUCCESS:
      return {
        ...state,
        loading: false,
        personalSuccess: payload.success,
        personal: payload.personal,
      };
    case REGISTER_PERSONAL_FAIL:
      return {
        ...state,
        loading: false,
        personal: null,
        personalError: payload,
      };
    case LOAD_PERSONAL_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        personal: null,
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
export const profileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_PERSONAL_REQUEST:
    case UPDATE_ECONOMIC_REQUEST:
    case UPDATE_BECONOMIC_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RECOVER_PASSWORD_REQUEST:
    case DEACTIVATE_ACCOUNT_REQUEST:
    case DEACTIVATE_MY_ACCOUNT_REQUEST:
    case ACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload,
      };
    case FORGOT_PASSWORD_SUCCESS:
    case DEACTIVATE_ACCOUNT_SUCCESS:
    case DEACTIVATE_MY_ACCOUNT_SUCCESS:
    case RECOVER_PASSWORD_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case ACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload,
      };
    case ACTIVATE_RESET:
    case FORGOT_PASSWORD_RESET:
    case UPDATE_BECONOMIC_SUCCESS:
    case DEACTIVATE_ACCOUNT_RESET:
    case DEACTIVATE_MY_ACCOUNT_RESET:
      return {
        ...state,
        loading: false,
        bisUpdated: payload,
        success: false,
        error: null,
      };
    case UPDATE_ECONOMIC_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdatedEconomic: payload,
      };
    case UPDATE_PERSONAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdatedpersonal: payload,
      };
    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case FORGOT_PASSWORD_FAIL:
    case ACTIVATE_FAIL:
    case RECOVER_PASSWORD_FAIL:
    case DEACTIVATE_ACCOUNT_FAIL:
    case DEACTIVATE_MY_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_BECONOMIC_FAIL:
      return {
        ...state,
        loading: false,
        berror: payload,
      };
    case UPDATE_PERSONAL_FAIL:
      return {
        ...state,
        loading: false,
        perror: payload,
      };
    case UPDATE_ECONOMIC_FAIL:
      return {
        ...state,
        loading: false,
        eerror: payload,
      };
    case UPDATE_PERSONAL_RESET:
      return {
        ...state,
        isUpdatedpersonal: false,
      };
    case UPDATE_ECONOMIC_RESET:
      return {
        ...state,
        isUpdatedEconomic: false,
      };
    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case UPDATE_BECONOMIC_RESET:
      return {
        ...state,
        bisUpdated: false,
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
export const bankDetailsReducer = (
  state = { mybank: {} },
  { type, payload }
) => {
  switch (type) {
    case BANK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BANK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        mybank: payload.mybank,
      };
    case BANK_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
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
export const branchBankDetailsReducer = (
  state = { mybranchbank: {} },
  { type, payload }
) => {
  switch (type) {
    case BRANCH_BANK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BRANCH_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        mybranchbank: payload.mybranchbank,
      };
    case BRANCH_BANK_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
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
export const branchDetailsReducer = (
  state = { mybranch: {} },
  { type, payload }
) => {
  switch (type) {
    case BRANCH_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BRANCH_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        mybranch: payload.mybranch,
      };
    case BRANCH_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
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

export const allUsersReducer = (state = { users: [] }, { type, payload }) => {
  switch (type) {
    case ALL_USERS_REQUEST:
    case ALL_AGENT_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
    case ALL_AGENT_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case ALL_USERS_FAIL:
    case ALL_AGENT_USERS_FAIL:
      return {
        ...state,
        loading: false,
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
export const allAgentsReducer = (state = { agents: [] }, { type, payload }) => {
  switch (type) {
    case ALL_AGENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_AGENT_SUCCESS:
      return {
        ...state,
        loading: false,
        agents: payload,
      };
    case ALL_AGENT_FAIL:
      return {
        ...state,
        loading: false,
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
export const allCompaniesReducer = (
  state = { companies: [] },
  { type, payload }
) => {
  switch (type) {
    case ALL_COMPANIES_REQUEST:
    case ALL_AGENT_COMPANIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_COMPANIES_SUCCESS:
    case ALL_AGENT_COMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: payload,
      };
    case ALL_COMPANIES_FAIL:
    case ALL_AGENT_COMPANIES_FAIL:
      return {
        ...state,
        loading: false,
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
export const allBanksReducer = (state = { banks: [] }, { type, payload }) => {
  switch (type) {
    case ALL_BANKS_REQUEST:
      return {
        ...state,
        loading: true,
        loader: true,
      };
    case ALL_BANKS_SUCCESS:
      return {
        ...state,
        loading: false,
        loader: false,
        banks: payload,
      };
    case ALL_BANKS_FAIL:
      return {
        ...state,
        loading: false,
        loader: false,
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
export const BranchReducer = (state = { newbanch: {} }, { type, payload }) => {
  switch (type) {
    case REGISTER_BRANCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_BRANCH_SUCCESS:
      return {
        ...state,
        loading: false,
        newbranch: payload.newbranch,
        success: payload.success,
      };
    case REGISTER_BRANCH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case REGISTER_BRANCH_RESET:
      return {
        ...state,
        success: false,
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
export const BankBranchesReducer = (
  state = { bankBranches: [] },
  { type, payload }
) => {
  switch (type) {
    case GET_BANK_BARNCH_REQUEST:
      return {
        ...state,
        loading: true,
        fetching: true,
      };
    case GET_BANK_BARNCH_SUCCESS:
      return {
        ...state,
        loading: false,
        fetching: false,
        bankBranches: payload.bankBranches,
      };
    case GET_BANK_BARANCH_FAIL:
      return {
        ...state,
        loading: false,
        fetching: false,
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
export const myBranchReducer = (
  state = { myBankBranches: [] },
  { type, payload }
) => {
  switch (type) {
    case GET_MYBANK_BARNCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MYBANK_BARNCH_SUCCESS:
      return {
        ...state,
        loading: false,
        myBankBranches: payload.myBankBranches,
      };
    case GET_MYBANK_BARANCH_FAIL:
      return {
        ...state,
        loading: false,
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
export const AgentDetailReducer=(state={agentDetail:{}},{type,payload})=>{
  switch(type){
    case AGENT_DETIALS_REQUEST:
      return {
        ...state,
        loading:true
      }
      case AGENT_DETIALS_SUCCESS:
       return  {
          success:true,
          loading:false,
          user:payload.users,
          comp:payload.companies,
        }
        case AGENT_DETIALS_FAIL:
          return{
            loading:false,
            error:payload
          }
          default:
            return state;
  }
}
