import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';
import {
  adminBankReducer,
  adminCompanyReducer,
  adminUserReducer,
  allBanksReducer,
  allCompaniesReducer,
  allUsersReducer,
  BankBranchesReducer,
  bankDetailsReducer,
  BranchReducer,
  CompanyReducer,
  loginReducer,
  myBranchReducer,
  personalReducer,
  profileReducer,
  UserReducer,
  branchDetailsReducer,
  branchBankDetailsReducer,
  AgentReducer,
  allAgentsReducer,
  LoanUserReducer,
  AgentDetailReducer
} from "./Reducers/UserReducer";
import {
  BankBLoansReducer,
  BankLoansReducer,
  BLoanReducer,
  bloansReducer,
  BranchBLoansReducer,
  BranchLoansReducer,
  GetStatusReducer,
  LOanDetailReducer,
  LoanReducer,
  loansReducer,
  myBLoanReducer,
  myLoanReducer,
  UpdateLoanReducer,
} from "./Reducers/LoanReducer";
import { beconomicReducer, economicReducer } from "./Reducers/EconomicReducer";
import { carReducer, myCarReducer } from "./Reducers/CarReducer";
import { buidingReducer, myBuildingReducer } from "./Reducers/BuildingReducer";
import { statusReducer } from "./Reducers/SystemReducer";
const reducer = combineReducers({
  newuser: adminUserReducer,
  newagent:AgentReducer,
  newcompany: adminCompanyReducer,
  newbank: adminBankReducer,
  login: loginReducer,
  personal: personalReducer,
  profile: profileReducer,
  loan: LoanReducer,
  economic: economicReducer,
  car: carReducer,
  building: buidingReducer,
  beconomic: beconomicReducer,
  bloan: BLoanReducer,
  myloan: myLoanReducer,
  mybloan: myBLoanReducer,
  theLoan: LOanDetailReducer,
  myBuilding: myBuildingReducer,
  mycars: myCarReducer,
  user: UserReducer,
  mybank: bankDetailsReducer,
  mybranchbank:branchBankDetailsReducer,
  users: allUsersReducer,
  agents:allAgentsReducer,
  bankLoan: BankLoansReducer,
  bankBLoan: BankBLoansReducer,
  loans: loansReducer,
  bloans: bloansReducer,
  companies: allCompaniesReducer,
  banks: allBanksReducer,
  update: UpdateLoanReducer,
  company: CompanyReducer,
  bankBranches:BankBranchesReducer,
  newbranch:BranchReducer,
  status:statusReducer,
  myBankBranches:myBranchReducer,
  mybranch:branchDetailsReducer,
  branchLoan:BranchLoansReducer,
  branchBLoan:BranchBLoansReducer,
 statusData:GetStatusReducer,
 theUser:LoanUserReducer,
 agentDetail:AgentDetailReducer
});
const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
