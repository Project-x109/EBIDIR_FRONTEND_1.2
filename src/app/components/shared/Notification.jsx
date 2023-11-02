import React, { useEffect, useState } from "react";
import "./Navbar.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReactPaginate from "react-paginate";
const Notification = () => {
  const [pageCount, setPageCount] = useState(10);

  const [data, setData] = useState([
    { id: 1, name: "John", date: "25-02-2023" },
    { id: 2, name: "Jane", date: "25-02-2023" },
    { id: 3, name: "Bob", date: "25-02-2023" },
    { id: 4, name: "Alice", date: "25-02-2023" },
    { id: 5, name: "Mike", date: "25-02-2023" },
    { id: 6, name: "Sara", date: "25-02-2023" },
    { id: 7, name: "Tom", date: "25-02-2023" },
    { id: 8, name: "Kate", date: "25-02-2023" },
    { id: 9, name: "David", date: "25-02-2023" },
    { id: 10, name: "Linda", date: "25-02-2023" },
    { id: 11, name: "Peter", date: "25-02-2023" },
    { id: 12, name: "Mary", date: "25-02-2023" },
    { id: 13, name: "Jack", date: "25-02-2023" },
    { id: 14, name: "Lucy", date: "25-02-2023" },
    { id: 15, name: "Mark", date: "21-01-2023" },
    { id: 16, name: "Emily", date: "25-02-2023" },
    { id: 17, name: "Oliver", date: "25-02-2023" },
    { id: 18, name: "Sophie", date: "25-02-2023" },
    { id: 19, name: "Harry", date: "25-02-2023" },
    { id: 20, name: "Mia", date: "25-02-2023" },
  ]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    setPageCount(selected);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageCount(0);
    event.preventDefault();
  };

  const displayData = () => {
    const start = pageCount * 5;
    const end = start + 5;
    return data
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(start, end)
      .map((item) => (
        <div key={item.id} class="results">
          <div class="results-list">
            <div class="entry">
              <div class="icon">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#171718"
                    d="M13 2H13.2727C16.5339 2 18.1645 2 19.2969 2.79784C19.6214 3.02643 19.9094 3.29752 20.1523 3.60289C21 4.66867 21 6.20336 21 9.27273V11.8182C21 14.7814 21 16.2629 20.5311 17.4462C19.7772 19.3486 18.1829 20.8491 16.1616 21.5586C14.9044 22 13.3302 22 10.1818 22C8.38275 22 7.48322 22 6.76478 21.7478C5.60979 21.3424 4.69875 20.4849 4.26796 19.3979C4 18.7217 4 17.8751 4 16.1818V12"
                  ></path>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#171718"
                    d="M21 12C21 13.8409 19.5076 15.3333 17.6667 15.3333C17.0009 15.3333 16.216 15.2167 15.5686 15.3901C14.9935 15.5442 14.5442 15.9935 14.3901 16.5686C14.2167 17.216 14.3333 18.0009 14.3333 18.6667C14.3333 20.5076 12.8409 22 11 22"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#171718"
                    d="M11 6L3 6M7 2V10"
                  ></path>
                </svg>
              </div>
              <div class="desc">
                <label>You have received A message from {item.name}</label>

                <div class="values">
                  <span>{item.name}</span>
                  <span class="date">{item.date}</span>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className="classrow">
    
      <div class="cardNotification">
        <div class="search-container">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              stroke="#171718"
              d="M17.5 17.5L22 22"
            ></path>
            <path
              stroke-linejoin="round"
              stroke-width="2"
              stroke="#171718"
              d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
            ></path>
          </svg>
          <input
            onChange={handleSearch}
            placeholder="Search for a quick action"
            type="search"
            value={searchTerm}
          />
        </div>

        <div class="categories">
          <button type="button">Note</button>
          <button type="button">File</button>
          <button type="button">Email</button>
          <button type="button">Others</button>
        </div>
        <div class="results">
          <p class="label">Best Results</p>
        </div>

        <div>{displayData()}</div>

        <div class="cardNotification-footer">
          <div class="action">
            <ReactPaginate
              previousLabel={
                <button type="button">
                  <img
                    className="size"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtEl
                        EQVR4nO3SMWoCQRSA4e8ElmKrYClYSCwFO++QO3gH7yAewMbcQWxs7LQQLEXSKEKCGNKuKCuI7DayIwr7wytmmg9mHnl5r1YRE6xCInWsEcUTpDb+bpAgUAvHOyRzqIn/BCSK77+xwBgj9NFDF5/o4AMVFNKQMnYpyKMzTILmGSMR9knQNAC0TYJK2GQMDdL+qYZD6GW41sBP6PW+XfPfZ0Dnqlg+AxK/8xdml1Ne3lt1AhOuiaIsSOFFAAAAAElFTkSuQmCC"
                  ></img>
                </button>
              }
              nextLabel={
                <button type="button">
                  <img
                    className="size"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzUlEQVR4nO3SIUuDQQDH4QdMNkEwiJgFw8Q1tegHWFy3mlftxnVXti9gErtFwTIGppkmyJhlU5cMNwZvGvcik/cGg/cH/3bHE+4oK1vHenjAdmooZBugugoo4Atnq4ACprj469Im9lDJDtdxhWs00cE9nvGGcQSa7xvHeUg759J/94H9GPRZMBTwEoNGCaCnGH
                      RbMPKO3Ri0gR0c4BQ1XKKBG7Rwh0e8YojfHGT+zY8UXFjYD86LRiwgE5xIVMjWx6GEdbO320qJlJVZuhnjI4nHMaSD9wAAAABJRU5ErkJggg=="
                  ></img>
                </button>
              }
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(
                data
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length / 2
              )}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            ></ReactPaginate>
          </div>
        </div>
      </div>

      <div className="columnadjuster di-none">
        <div class="cardAd">
          <div class="cardAdicon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  stroke="#ffffff"
                  d="M20 14V17.5C20 20.5577 16 20.5 12 20.5C8 20.5 4 20.5577 4 17.5V14M12 15L12 3M12 15L8 11M12 15L16 11"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div class="cardAdcontent">
            <span class="cardAdtitle">Good news E-bidr users!</span>
            <div class="cardAddesc">
              This software is now available for download.
            </div>
            <div class="cardAdactions">
              <div>
                <a href="#" class="cardAddownload">
                  Try it free
                </a>
              </div>
              <div>
                <a href="#" class="cardAdnotnow">
                  Not now
                </a>
              </div>
            </div>
          </div>
          <button type="button" class="cardAdclose">
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div class="cardA1">
          <div class="cardA1header">
            <span class="cardA1title">Beginner</span>
            <span class="cardA1price">Free</span>
          </div>
          <p class="cardA1desc">Etiam ac convallis enim, eget euismod dolor.</p>
          <ul class="cardA1lists">
            <li class="cardA1list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Aenean quis</span>
            </li>
            <li class="cardA1list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Morbi semper</span>
            </li>
            <li class="cardA1list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Tristique enim nec</span>
            </li>
          </ul>
          <button type="button" class="cardA1action">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
