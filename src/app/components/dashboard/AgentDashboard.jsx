import React, { useEffect, useState } from "react";
import {
  getAllAgents,
  getAllCompaniesAgent,
  getAllUsersAgent,
} from "../../../Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { bankBG } from "../../Dataset/DataCollections";
import "./dashboard.css";
import { Doughnut } from "react-chartjs-2";
import { reverse } from "../../Dataset/Functions";
const AgentDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);
  const { companies } = useSelector((state) => state.companies);
  const { agents } = useSelector((state) => state.agents);

  useEffect(() => {
    dispatch(getAllCompaniesAgent());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllUsersAgent());
    dispatch(getAllAgents());
  }, [dispatch]);
  let [name, setname] = useState();
  useEffect(() => {
    if (user) {
      if (user && user.role === "user") setname(user.name);
      else if (user && user.role === "company") setname(user.cname);
    }
  }, [user]);

  let UsersData = [];
  users &&
    users.map((item) => {
      UsersData.push({
        name: item.name,
        profile: item.profile?.url,
        phone: item.phoneNo,
        email:item?.email,
        date: item.createdAt,
        type: 1,
      });
    });
  companies &&
    companies.map((item) => {
      UsersData.push({
        name: item.cname,
        profile: item?.logo?.url,
        phone: item.cphoneNo,
        email:item?.email,
        date: item.createdAt,
        type: 2,
      });
    });
  let dailyData = [];
  let monthlyData = [];
  // create empty array
  UsersData.map((user) => {
    dailyData[user.date.split("T")[0]] = {};
    monthlyData[user.date.slice(0, 7)] = {};
  });
  // make it two dimensional array
  UsersData.map((user) => {
    dailyData[user.date.split("T")[0]][user.type] = 0;
    dailyData[user.date.split("T")[0]][0] = 0;
    monthlyData[user.date.slice(0, 7)][user.type] = 0;
    monthlyData[user.date.slice(0, 7)][0] = 0;
  });
  // count frequency of occurance
  UsersData.map((user) => {
    dailyData[user.date.split("T")[0]][user.type]++;
    dailyData[user.date.split("T")[0]][0]++;
    monthlyData[user.date.slice(0, 7)][user.type]++;
    monthlyData[user.date.slice(0, 7)][0]++;
  });
  // reverse to make it recent to old
  dailyData = reverse(dailyData);
  monthlyData = reverse(monthlyData);
  UsersData = UsersData.sort(
    (objA, objB) => Number(new Date(objB.date)) - Number(new Date(objA.date))
  );
  document.getElementById("accounts").innerHTML =
    users?.length + companies?.length;

  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  // Calculate the index of the first and last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = UsersData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(UsersData.length / itemsPerPage);

  // Calculate the range of page numbers to display
  const range = {
    start: Math.max(1, currentPage - 2),
    end: Math.min(currentPage + 2, totalPages),
  };

  // Function to handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle previous page navigation
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Function to handle next page navigation
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const itemsPerPage1 = 5; // Number of items to display per page
  const [currentPage1, setCurrentPage1] = useState(1); // Current page number

  // Calculate the index of the first and last item to be displayed on the current page
  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = Object.keys(dailyData)
    .slice(indexOfFirstItem1, indexOfLastItem1)
    .map((user) => ({
      date: user,
      personal: dailyData[user][1] || 0,
      business: dailyData[user][2] || 0,
      total: dailyData[user][0],
    }));

  // Calculate the total number of pages
  const totalPages1 = Math.ceil(Object.keys(dailyData).length / itemsPerPage1);

  // Function to handle page navigation
  const handlePageChange1 = (pageNumber) => {
    setCurrentPage1(pageNumber);
  };

  const itemsPerPage2 = 5; // Number of items to display per page
  const [currentPage2, setCurrentPage2] = useState(1); // Current page number

  // Calculate the index of the first and last item to be displayed on the current page
  const indexOfLastItem2 = currentPage2 * itemsPerPage2;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
  const currentItems2 = Object.keys(monthlyData)
    .slice(indexOfFirstItem2, indexOfLastItem2)
    .map((user) => ({
      date: user,
      personal: monthlyData[user][1] || 0,
      business: monthlyData[user][2] || 0,
      total: monthlyData[user][0],
    }));

  // Calculate the total number of pages
  const totalPages2 = Math.ceil(
    Object.keys(monthlyData).length / itemsPerPage2
  );

  // Function to handle page navigation
  const handlePageChange2 = (pageNumber) => {
    setCurrentPage2(pageNumber);
  };

  return (
    <div>
      {/* {loading && <BackdropLoader/>} */}

      <div className="row">
        <div className="col-md-4 grid-margin stretch-card">
          <div className="card admincards">
            <div className="card-body">
              <h4 id="header4" className="card-title">
                Account Type Summary
              </h4>
              <div className="aligner-wrapper">
                <Doughnut
                  data={{
                    labels: ["Personal", "Business", "Branch"],
                    datasets: [
                      {
                        data: [users?.length, companies?.length, 0],
                        backgroundColor: [
                          "#00d25b",
                          "#ffab00",
                          "#FF1111",
                          "#ee111c",
                        ],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    segmentShowStroke: false,
                    cutoutPercentage: 70,
                    elements: {
                      arc: {
                        borderWidth: 0,
                      },
                    },
                    legend: {
                      display: false,
                    },
                    tooltips: {
                      enabled: true,
                    },
                  }}
                />
                <div className="absolute center-content">
                  <h5
                    style={{ color: "#343434" }}
                    className="font-weight-normal  text-center mb-2 "
                  >
                    {users?.length + companies?.length}
                  </h5>
                  <p className="text-small text-muted text-center mb-0">
                    Total
                  </p>
                </div>
              </div>

              <div className="admincard red d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-right text-xl-left">
                  <h6 id="cardheader" className="mb-1 tip">
                    Personal Account
                  </h6>
                  <p id="cardcontent" className="text-muted mb-0 second-text">
                    Account for personal loan
                  </p>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 id="cardvalue" className="font-weight-bold mb-0">
                    {users?.length}
                  </h6>
                </div>
              </div>

              <div className="admincard blue d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-right text-xl-left">
                  <h6 id="cardheader" className="mb-1 tip">
                    Bussiness Account
                  </h6>
                  <p id="cardcontent" className="text-muted mb-0 second-text">
                    Account for comapny
                  </p>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 id="cardvalue" className="font-weight-bold mb-0">
                    {companies?.length}
                  </h6>
                </div>
              </div>

              <div className="admincard green d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-left text-xl-left">
                  <h6 id="cardheader" className="mb-1 tip">
                    Branch
                  </h6>
                  <p id="cardcontent" className="text-muted mb-0 second-text">
                    Branch account Created by Agent
                  </p>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 id="cardvalue" className="font-weight-bold mb-0">
                    {0}
                  </h6>
                </div>
              </div>

              <div
                style={{ backgroundColor: "#e4e9ec" }}
                className="admincard yellow d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
              >
                <div className="text-md-left text-xl-left">
                  <h6 id="cardheader" className="mb-1 tip">
                    Total
                  </h6>
                  <p id="cardcontent" className="text-muted mb-0 second-text">
                    Total of all accounts
                  </p>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 id="cardvalue" className="font-weight-bold mb-0">
                    {users?.length + companies?.length}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 id="header4" className="card-title">
                Recently created Accounts
              </h4>
              <div className="table-responsive">
                <table className="table header">
                  {/* Table header */}
                  <thead>
                    <tr>
                      <th id="tabletitle">Full Name</th>
                      <th id="tabletitle">Phone Number</th>
                      <th id="tabletitle">Email</th>
                      <th id="tabletitle">Created At</th>
                    </tr>
                  </thead>

                  {/* Table body */}
                  <tbody>
                    {currentItems.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="d-flex">
                            <img src={user.profile} alt="face" />
                            <span id="value" className="pl-2 image_value">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td id="value">{user.phone}</td>
                        <td id="value">{user.email}</td>
                        <td id="value">{user.date?.split("T")[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from(
                    { length: range.end - range.start + 1 },
                    (_, index) => (
                      <li
                        key={range.start + index}
                        className={`page-item ${
                          currentPage === range.start + index ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(range.start + index)}
                        >
                          {range.start + index}
                        </button>
                      </li>
                    )
                  )}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 id="header4" className="card-title">
                Daily Activities
              </h4>
              <div className="table-responsive">
                <table className="table header">
                  {/* Table header */}
                  <thead>
                    <tr>
                      <th id="tabletitle">Date</th>
                      <th id="tabletitle">Personal</th>
                      <th id="tabletitle">Business</th>
                      <th id="tabletitle">Total</th>
                    </tr>
                  </thead>

                  {/* Table body */}
                  <tbody>
                    {currentItems1.map((item, index) => (
                      <tr key={index}>
                        <td id="value">
                          {item.date.split("-").reverse().join("-")}
                        </td>
                        <td id="value">{item.personal}</td>
                        <td id="value">{item.business}</td>
                        <td id="value">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage1 === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange1(currentPage1 - 1)}
                      disabled={currentPage1 === 1}
                    >
                      Previous
                    </button>
                  </li>
                  <li
                    className={`page-item ${
                      currentPage1 === totalPages1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange1(currentPage1 + 1)}
                      disabled={currentPage1 === totalPages1}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 id="header4" className="card-title">
                Monthly Activities
              </h4>
              <div className="table-responsive">
                <table className="table header">
                  {/* Table header */}
                  <thead>
                    <tr>
                      <th id="tabletitle">Date</th>
                      <th id="tabletitle">Personal</th>
                      <th id="tabletitle">Business</th>
                      <th id="tabletitle">Total</th>
                    </tr>
                  </thead>

                  {/* Table body */}
                  <tbody>
                    {currentItems2.map((item, index) => (
                      <tr key={index}>
                        <td id="value">
                          {item.date.split("-").reverse().join("-")}
                        </td>
                        <td id="value">{item.personal}</td>
                        <td id="value">{item.business}</td>
                        <td id="value">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage2 === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange2(currentPage2 - 1)}
                      disabled={currentPage2 === 1}
                    >
                      Previous
                    </button>
                  </li>
                  <li
                    className={`page-item ${
                      currentPage2 === totalPages2 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange2(currentPage2 + 1)}
                      disabled={currentPage2 === totalPages2}
                    >
                      Next
                    </button>
                  </li>
                </ul>

        
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
