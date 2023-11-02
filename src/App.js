import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./app/components/shared/Spinner";
import Footer from "./app/components/shared/Footer";
import AdminSidebar from "./app/components/shared/AdminSidebar";
import BankSidebar from "./app/components/shared/BankSidebar";
import UserSideBar from "./app/components/shared/UserSideBar";
import CompanySideBar from "./app/components/shared/CompanySideBar";
// import "./app/App.scss";
import "./app/App.css";
import CommonSidebar from "./app/components/shared/CommonSidebar";
import RequireAuth from "./auth/RequireAuth";
import BranchDashboard from "./app/components/dashboard/BranchDashboard";
import AgentDashboard from "./app/components/dashboard/AgentDashboard";
import AgentSidebar from "./app/components/shared/AgentSidebar";
const ResetPassword = lazy(() => import("./app/user-pages/ResetPassword"));
const ForgotPassword = lazy(() => import("./app/user-pages/ForgotPassword"));

const App = () => {
  const Navbar = lazy(() => import("./app/components/shared/Navbar"));
  const UserDashboard = lazy(() =>
    import("./app/components/dashboard/UserDashboard")
  );
  const BankDashboard = lazy(() =>
    import("./app/components/dashboard/BankDashboard")
  );
  const AdminDashboard = lazy(() =>
    import("./app/components/dashboard/AdminDashboard")
  );
  const Banks = lazy(() => import("./app/components/Admin/AdminPages/Banks"));
  const AllUsers = lazy(() =>
    import("./app/components/Admin/AdminPages/AllUsersList")
  );
  const DeactivatedUsers = lazy(() =>
    import("./app/components/Admin/AdminPages/DeactivatedUsers")
  );
  const BankInfo = lazy(() => import("./app/components/Bank/Bankinfo"));
  const BankInformations = lazy(() => import("./app/components/Bank/BankData"));
  const PersonalProfile = lazy(() =>
    import("./app/components/Profile/PersonalProfile/Profile")
  );
  const BranchProfile = lazy(() =>
    import("./app/components/Profile/BranchProfile/Profile")
  );
  const CompanyProfile = lazy(() =>
    import("./app/components/Profile/CompanyProfile/Profile")
  );
  const LoanType = lazy(() => import("./app/components/Bank/LoanTypes"));
  const AvailableBranches = lazy(() =>
    import("./app/components/Admin/AdminPages/AvailableBranches")
  );
  const BankProfile = lazy(() =>
    import("./app/components/Profile/BankProfile/Profile")
  );
  const LoanDetails = lazy(() => import("./app/components/Bank/LoanDetails"));
  const BLoanDetails = lazy(() => import("./app/components/Bank/BLoanDetails"));
  const PersonalUsers = lazy(() =>
    import("./app/components/Admin/AdminPages/PersonalUsers")
  );
  const AdminLoanType = lazy(() =>
    import("./app/components/Admin/AdminPages/AdminLoanType")
  );
  const BranchLoanType = lazy(() =>
    import("./app/components/Branch/BranchLoanTypes")
  );
  const Companies = lazy(() =>
    import("./app/components/Admin/AdminPages/companies")
  );
  const AgentUsers = lazy(() =>
  import("./app/components/Admin/AdminPages/AgentsList")
);
 const AgentCreatedUsers = lazy(()=> import("./app/components/Admin/AdminPages/AgentDetail"))
  const CollateralBuilding = lazy(() =>
    import("./app/components/User/Building")
  );
  const MyLoans = lazy(() => import("./app/components/User/pages/MyLoans"));
  const MyCollaterals = lazy(() =>
    import("./app/components/User/pages/MyCollaterals")
  );
  const Agent = lazy(() => import("./app/components/Admin/forms/Agent"));
  const MyBLoans = lazy(() => import("./app/components/User/pages/MyBLoans"));
  const MyBLoansDetails = lazy(() =>
    import("./app/components/User/pages/MyBLoansDetails")
  );
  const MyLoansDetails = lazy(() =>
    import("./app/components/User/pages/MyLoansDetails")
  );
  const HelpCenter = lazy(() =>
    import("./app/components/User/pages/HelpCenter")
  );
  const PersonalInfoRequestLoan = lazy(() =>
    import("./app/components/User/PersonalInfo")
  );
  const LoanInfoPersonalLoan = lazy(() => import("./app/components/User/Loan"));
  const EconomicInfoPersonalLoan = lazy(() =>
    import("./app/components/User/Economic")
  );
  const CompanyInfoBusinessLoan = lazy(() =>
    import("./app/components/User/BEconomic")
  );
  const LoanInfoBusinessLoan = lazy(() =>
    import("./app/components/User/BLoan")
  );
  const OTP = lazy(() => import("./app/user-pages/OTP"));
  const Notification = lazy(() =>
    import("./app/components/shared/Notification.jsx")
  );
  const PDFGenerator = lazy(() =>
    import("./app/components/Admin/AdminPages/PDFGenerator")
  );
  const AgentPersonalUsers = lazy(() =>
    import("./app/components/Admin/AgentPages/AgentPersonal")
  );
  const AgentCompanies = lazy(() =>
    import("./app/components/Admin/AgentPages/AgentCompany")
  );
  const DeactivatedBranches = lazy(() =>
  import("./app/components/Admin/AdminPages/DeactivatedBranches"));
  const BranchList = lazy(() => import("./app/components/Bank/Branchlis"));
  const CollateralCars = lazy(() => import("./app/components/User/Car"));
  const Personal = lazy(() => import("./app/components/Admin/forms/Personal"));
  const Company = lazy(() => import("./app/components/Admin/forms/Company"));
  const Bank = lazy(() => import("./app/components/Admin/forms/Bank"));
  const Branch = lazy(() => import("./app/components/Bank/Branch"));
  const Layout = lazy(() => import("./auth/Layout"));
  const Login = lazy(() => import("./app/user-pages/Login.jsx"));
  const EmailSent = lazy(() => import("./app/user-pages/EmailSent"));
  const Error404 = lazy(() => import("./app/user-pages/Error404"));
  const ChangePassword = lazy(() =>
    import("./app/user-pages/ForgetoldpasswordChangePassword.jsx")
  );
  const AuthenticatedChangePassword = lazy(() =>
    import("./app/user-pages/authenticated_changepassword_form.jsx")
  );
  const DeactivatedAgents = lazy(()=>import("./app/components/Admin/AdminPages/DeactivatedAgents"))
  const NewPassword = lazy(() => import("./app/user-pages/NewPassword.jsx"));
  const [isFullPageLayout, setIsFullPageLayout] = useState(true);
  const { login } = useSelector((state) => state.login);
  const [role, setRole] = useState();
  const loc = useLocation();
  const fullPageLayoutRoutes = [
    "/Err404",
    "/",
    "/login",
    "/user-pages/login-2",
    "/NewPassword",
    "/user-pages/register-1",
    "/user-pages/NewPassword-1",
    "/user-pages/Authenticated_changepassword-1",
    "/user-pages/register-2",
    "/user-pages/changepassword-1",
    "/user-pages/lockscreen",
    "/error-pages/error-404",
    "/error-pages/error-500",
    "/general-pages/landing-page",
    "/forgotpassword",
    "/emailsent",
    "/otp",
    "/generatepdf",
  ];
  useEffect(() => {
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (
        window.location.pathname === fullPageLayoutRoutes[i] ||
        window.location.pathname.includes("/password/reset/")
      ) {
        setIsFullPageLayout(true);
        document
          .querySelector(".page-body-wrapper")
          .classList.add("full-page-wrapper");
        break;
      } else {
        setIsFullPageLayout(false);
        document
          .querySelector(".page-body-wrapper")
          .classList.remove("full-page-wrapper");
      }
    }
  }, [loc, fullPageLayoutRoutes]);
  useEffect(() => {
    if (login && login.role) setRole(login?.role);
  }, [login]);
  let navbarComponent = !isFullPageLayout ? <Navbar /> : "";
  let sidebarComponent = <CommonSidebar />;
  if (!isFullPageLayout) {
    if (role === "admin") sidebarComponent = <AdminSidebar />;
    else if (role === "bank" || role === "branch")
      sidebarComponent = <BankSidebar />;
    else if (role === "user") sidebarComponent = <UserSideBar />;
    else if (role === "company") sidebarComponent = <CompanySideBar />;
    else if (role === "agent") sidebarComponent = <AgentSidebar />;
  }
  let footerComponent = !isFullPageLayout ? <Footer /> : "";
  return (
    <>
      {isFullPageLayout ? (
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="main-panel">
              <div className="content-wrapper">
                <Suspense fallback={<Spinner />}>
                  <Routes>
                    <Route path="/login" Component={Login} />
                    <Route path="/" Component={Login} />
                    <Route path="/Err404" Component={Error404} />
                    <Route path="/NewPassword" Component={NewPassword} />
                    <Route
                      path="/user-pages/changepassword-1"
                      Component={ChangePassword}
                    />
                    <Route
                      path="/user-pages/Authenticated_changepassword-1"
                      Component={AuthenticatedChangePassword}
                    />
                    <Route
                      path="/user-pages/NewPassword-1"
                      Component={NewPassword}
                    />
                    <Route path="/forgotpassword" Component={ForgotPassword} />
                    <Route
                      path="/password/reset/:token"
                      Component={ResetPassword}
                    />
                    <Route path="/emailsent" Component={EmailSent} />
                  
                    <Route path="/otp" Component={OTP} />
                    <Route path="/generatepdf" Component={PDFGenerator} />
                  </Routes>
                </Suspense>
              </div>
              {footerComponent}
            </div>
          </div>
        </div>
      ) : (
        <div className="container-scroller">
          <Suspense fallback={<Spinner />}>{sidebarComponent}</Suspense>
          <div className="container-fluid page-body-wrapper">
            <Suspense fallback={<Spinner />}>{navbarComponent}</Suspense>
            <div className="main-panel">
              <div className="content-wrapper" style={{ minHeight: "100vh" }}>
                <Suspense fallback={<Spinner />}>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                        <Route
                          path="/admin/dashboard"
                          Component={AdminDashboard}
                        />
                        <Route path="/admin/agentform" Component={Agent} />
                        <Route
                          path="/availableBranches"
                          Component={AvailableBranches}
                        />
                        <Route path="/admin/bankform" Component={Bank} />
                        <Route path="/admin/branchform" Component={Branch} />
                        <Route path="/admin/agentcreatedusers/:id" Component={AgentCreatedUsers} />

                        <Route
                          path="/admin/loans/:type"
                          Component={AdminLoanType}
                        />
                        <Route
                          path="/admin/loan/:loan_status"
                          Component={AdminLoanType}
                        />
                        <Route path="/companies" Component={Companies} />
                        <Route path="/personals" Component={PersonalUsers} />
                        <Route path="/banks" Component={Banks} />
                        <Route path="/agents" Component={AgentUsers} />
                        <Route path="/all" Component={AllUsers} />
                        <Route path="/trash" Component={DeactivatedUsers} />
                        <Route path="/trashagents" Component={DeactivatedAgents} />
                        <Route path="/trashbranch" Component={DeactivatedBranches} />
                      </Route>

                      <Route
                        element={
                          <RequireAuth allowedRoles={["admin", "agent"]} />
                        }
                      >
                        <Route
                          path="/admin/personalform"
                          Component={Personal}
                        />
                        <Route path="/admin/companyform" Component={Company} />
                      </Route>

                      <Route element={<RequireAuth allowedRoles={["agent"]} />}>
                        <Route
                          path="/agent/dashboard"
                          Component={AgentDashboard}
                        />
                        <Route
                          path="/agent/companies"
                          Component={AgentCompanies}
                        />
                        <Route
                          path="/agent/personals"
                          Component={AgentPersonalUsers}
                        />
                      </Route>

                      <Route
                        element={
                          <RequireAuth
                            allowedRoles={[
                              "admin",
                              "user",
                              "company",
                              "bank",
                              "branch",
                              "agent",
                            ]}
                          />
                        }
                      >
                        <Route path="/notifications" Component={Notification} />
                      </Route>
                      <Route
                        element={
                          <RequireAuth allowedRoles={["user", "company"]} />
                        }
                      >
                        <Route
                          path="/user/dashboard"
                          Component={UserDashboard}
                        />
                        <Route
                          path="/personal/request"
                          Component={PersonalInfoRequestLoan}
                        />
                        <Route
                          path="/personal/economic/:collateral"
                          Component={EconomicInfoPersonalLoan}
                        />
                        <Route
                          path="/car/:collateral/:type"
                          Component={CollateralCars}
                        />
                        <Route
                          path="/Building/:type"
                          Component={CollateralBuilding}
                        />
                        <Route
                          path="/personal/loan"
                          Component={LoanInfoPersonalLoan}
                        />
                        <Route
                          path="/mycollaterals"
                          Component={MyCollaterals}
                        />
                        <Route path="/bankinfo" Component={BankInfo} />
                      </Route>
                      <Route element={<RequireAuth allowedRoles={["user"]} />}>
                        <Route path="/myloans" Component={MyLoans} />

                        <Route
                          path="/loaninfo/:id"
                          Component={MyLoansDetails}
                        />
                        <Route
                          path="/profile/user"
                          Component={PersonalProfile}
                        />
                      </Route>
                      <Route
                        element={<RequireAuth allowedRoles={["company"]} />}
                      >
                        <Route path="/mybloans" Component={MyBLoans} />
                        <Route
                          path="/bloaninfo/:id"
                          Component={MyBLoansDetails}
                        />
                        <Route
                          path="/profile/company"
                          Component={CompanyProfile}
                        />
                        <Route
                          path="/company/economic/:collateral"
                          Component={CompanyInfoBusinessLoan}
                        />
                        <Route
                          path="/comapny/loan"
                          Component={LoanInfoBusinessLoan}
                        />
                      </Route>
                      <Route element={<RequireAuth allowedRoles={["bank"]} />}>
                        <Route
                          path="/bank/dashboard"
                          Component={BankDashboard}
                        />
                        <Route path="/profile/bank" Component={BankProfile} />
                        <Route path="/loan/:type" Component={LoanType} />
                        <Route path="/bank/branchform" Component={Branch} />
                        <Route
                          path="/loans/:loan_status"
                          Component={LoanType}
                        />
                        <Route
                          path="/bank/branchlists"
                          Component={BranchList}
                        />
                      </Route>
                      <Route
                        element={<RequireAuth allowedRoles={["branch"]} />}
                      >
                        <Route
                          path="/profile/branch"
                          Component={BranchProfile}
                        />
                        <Route
                          path="/branchloans/:loan_status"
                          Component={BranchLoanType}
                        />
                        <Route
                          path="/branchloan/:type"
                          Component={BranchLoanType}
                        />
                        <Route
                          path="/branch/dashboard"
                          Component={BranchDashboard}
                        />
                      </Route>

                      <Route
                        element={
                          <RequireAuth
                            allowedRoles={["bank", "user", "admin", "branch"]}
                          />
                        }
                      >
                        <Route
                          path="/loanprofile/:id"
                          Component={LoanDetails}
                        />
                      </Route>
                      <Route
                        element={
                          <RequireAuth
                            allowedRoles={[
                              "bank",
                              "company",
                              "admin",
                              "branch",
                            ]}
                          />
                        }
                      >
                        <Route
                          path="/bloanprofile/:id"
                          Component={BLoanDetails}
                        />
                      </Route>

                      <Route path="/help" Component={HelpCenter} />
                      <Route
                        path="/BankInformations"
                        Component={BankInformations}
                      />
                      <Route
                        path="*"
                        element={<Navigate to="/Err404" replace />}
                      />
                    </Route>
                  </Routes>
                </Suspense>
              </div>
              <Suspense fallback={<Spinner />}>{footerComponent}</Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default App;
