import { AMORTIZE_BLOAN_FAIL, AMORTIZE_BLOAN_REQUEST, AMORTIZE_BLOAN_SUCCESS, AMORTIZE_LOAN_FAIL, AMORTIZE_LOAN_REQUEST, AMORTIZE_LOAN_SUCCESS, BANK_BLOAN_FAIL, BANK_BLOAN_REQUEST, BANK_BLOAN_SUCCESS, BANK_LOAN_FAIL, BANK_LOAN_REQUEST, BANK_LOAN_SUCCESS, BLOAN_DETAILS_FAIL, BLOAN_DETAILS_REQUEST, BLOAN_DETAILS_SUCCESS, BRANCH_BLOAN_FAIL, BRANCH_BLOAN_REQUEST, BRANCH_BLOAN_SUCCESS, BRANCH_LOAN_FAIL, BRANCH_LOAN_REQUEST, BRANCH_LOAN_SUCCESS, GETALL_BLOANS_FAIL, GETALL_BLOANS_REQUEST, GETALL_BLOANS_SUCCESS, GETALL_LOANS_FAIL, GETALL_LOANS_REQUEST, GETALL_LOANS_SUCCESS, GET_STATUS_FAIL, GET_STATUS_REQUEST, GET_STATUS_SUCCESS, LOAD_BLOAN_FAIL, LOAD_BLOAN_REQUEST, LOAD_BLOAN_SUCCESS, LOAD_LOAN_FAIL, LOAD_LOAN_REQUEST, LOAD_LOAN_SUCCESS, LOAN_DETAILS_FAIL, LOAN_DETAILS_REQUEST, LOAN_DETAILS_SUCCESS, REGISTER_BLOAN_FAIL, REGISTER_BLOAN_REQUEST, REGISTER_BLOAN_REST, REGISTER_BLOAN_SUCCESS, REGISTER_LOAN_FAIL, REGISTER_LOAN_REQUEST, REGISTER_LOAN_RESET, REGISTER_LOAN_SUCCESS, UPDATE_BLOAN_FAIL, UPDATE_BLOAN_REQUEST, UPDATE_BLOAN_RESET, UPDATE_BLOAN_SUCCESS, UPDATE_LOAN_FAIL, UPDATE_LOAN_REQUEST, UPDATE_LOAN_RESET, UPDATE_LOAN_SUCCESS } from "../Constants/LoanConstants";
import { CLEAR_ERRORS } from "../Constants/UserConstants";
export const LoanReducer = (state = { loan: {} }, { type, payload }) => {
    switch (type) {
      case REGISTER_LOAN_REQUEST:
        return {
          loading: true,
        };
      case REGISTER_LOAN_SUCCESS:
        return {
          ...state,
          loading: false,
          LoanSuccess: payload.success,
          loan: payload.loan,
        };
      case REGISTER_LOAN_FAIL:
        return {
          ...state,
          loading: false,
          loan: null,
          LoanError: payload,
        };
        case REGISTER_LOAN_RESET:
          return {
            ...state,
            loading: false,
            LoanSuccess:null
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
  export const BLoanReducer = (state = { bloan: {} }, { type, payload }) => {
    switch (type) {
      case REGISTER_BLOAN_REQUEST:
        return {
          loading: true,
        };
      case REGISTER_BLOAN_SUCCESS:
        return {
          ...state,
          loading: false,
          LoanSuccess: payload.success,
          loan: payload.loan,
        };
      case REGISTER_BLOAN_FAIL:
        return {
          ...state,
          loading: false,
          loan: null,
          LoanError: payload,
        };
        case REGISTER_BLOAN_REST:
          return{
            ...state,
            LoanSuccess: null,
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
  export const myLoanReducer = (state = { myloan: {} }, { type, payload }) => {
    switch (type) {
      case LOAD_LOAN_REQUEST:
        return {
          loading: true,
        };
      case LOAD_LOAN_SUCCESS:
        return {
          ...state,
          loading: false,
          success: payload.success,
          myloan: payload.myloan,
        };
      case LOAD_LOAN_FAIL:
        return {
          ...state,
          loading: false,
          loan: null,
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
  export const myBLoanReducer = (state = { mybloan: {} }, { type, payload }) => {
    switch (type) {
      case LOAD_BLOAN_REQUEST:
        return {
          loading: true,
        };
      case LOAD_BLOAN_SUCCESS:
        return {
          ...state,
          loading: false,
          success: payload.success,
          mybloan: payload.mybloan,
        };
      case LOAD_BLOAN_FAIL:
        return {
          ...state,
          loading: false,
          loan: null,
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
  export const LOanDetailReducer = (state = { theLoan: {} }, { type, payload }) => {
    switch (type) {
      case LOAN_DETAILS_REQUEST:
        case BLOAN_DETAILS_REQUEST:
        return {
          loading: true,
        };
      case LOAN_DETAILS_SUCCESS:
        case BLOAN_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          success: payload.success,
          theLoan: payload.theLoan,
        };
      case LOAN_DETAILS_FAIL:
        case BLOAN_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          loan: null,
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
  export const BankLoansReducer = (state = { bankLoan: [] }, { type, payload }) => {
    switch (type) {
      case BANK_LOAN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case BANK_LOAN_SUCCESS:
        return {
          ...state,
          loading: false,
          bankLoan: payload,
        };
      case BANK_LOAN_FAIL:
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
  export const BankBLoansReducer = (state = { bankBLoan: [] }, { type, payload }) => {
    switch (type) {
      case BANK_BLOAN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case BANK_BLOAN_SUCCESS:
        return {
          ...state,
          loading: false,
          bankBLoan: payload,
        };
      case BANK_BLOAN_FAIL:
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
  export const loansReducer = (state = { loans: [] }, { type, payload }) => {
    switch (type) {
        case GETALL_LOANS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GETALL_LOANS_SUCCESS:
            return {
                ...state,
                loading: false,
                loans: payload,
            };
        case GETALL_LOANS_FAIL:
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
export const bloansReducer = (state = { bloans: [] }, { type, payload }) => {
  switch (type) {
      case GETALL_BLOANS_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case GETALL_BLOANS_SUCCESS:
          return {
              ...state,
              loading: false,
              bloans: payload,
          };
      case GETALL_BLOANS_FAIL:
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
export const UpdateLoanReducer=(state={},{type,payload})=>{
switch(type){
  case AMORTIZE_BLOAN_REQUEST:
    case AMORTIZE_LOAN_REQUEST:
      case UPDATE_LOAN_REQUEST:
        case UPDATE_BLOAN_REQUEST:
    return {
        ...state,
        loading: true,
    };
    case AMORTIZE_BLOAN_SUCCESS:
      case AMORTIZE_LOAN_SUCCESS:
        case UPDATE_LOAN_SUCCESS:
          case UPDATE_BLOAN_SUCCESS:
            return{
              ...state,
              loading: false,
              success: payload.success,
            }
            case AMORTIZE_BLOAN_FAIL:
              case AMORTIZE_LOAN_FAIL:
                case UPDATE_LOAN_FAIL:
                  case UPDATE_BLOAN_FAIL:
                    return{
                      ...state,
                      loading: false,
                      error: payload,
                    }
                    case CLEAR_ERRORS:
                      return {
                          ...state,
                          error: null,
                      };
                      case UPDATE_BLOAN_RESET:
                        return{
                          ...state,
                          success: null,
                        }
                        case UPDATE_LOAN_RESET:
                          return{
                            ...state,
                            success: null,
                          }
                  default:
                      return state;
}
}
export const BranchLoansReducer = (state = { branchLoan: [] }, { type, payload }) => {
  switch (type) {
    case BRANCH_LOAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BRANCH_LOAN_SUCCESS:
      return {
        ...state,
        loading: false,
        branchLoan: payload,
      };
    case BRANCH_LOAN_FAIL:
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
export const BranchBLoansReducer = (state = { branchBLoan: [] }, { type, payload }) => {
  switch (type) {
    case BRANCH_BLOAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BRANCH_BLOAN_SUCCESS:
      return {
        ...state,
        loading: false,
        branchBLoan: payload,
      };
    case BRANCH_BLOAN_FAIL:
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
export const GetStatusReducer = (state = { statusData: [] }, { type, payload }) => {
  switch (type) {
    case GET_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
      case GET_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        statusData: payload,
      };
      case GET_STATUS_FAIL:
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
