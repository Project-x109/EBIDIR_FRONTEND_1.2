import React from "react";
import { MDBCol, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import "./helpcenter.css";
const HelpCenter = () => {
  return (
    <div style={{ textTransform: "capitalize", height: "100%" }}>
      <h2>Help Center</h2>
      <div className="page-header">
        <h3 className="page-title">{/* {'DO NOT REMOVE IT '} */}</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Help
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              FAQ
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <section>
                <MDBTypography
                  tag="h3"
                  className="text-center pb-2 text-primary fw-bold"
                >
                  FAQ
                </MDBTypography>
                <p className="text-center mb-5">
                  Find the answers for the most frequently asked questions below
                </p>

                <div className="row1 row">
                  <div class="card1">
                    <div class="content1">
                      <p class="heading1">What is the purpose?</p>
                      <p class="para1">
                        The application is designed to assess creditworthiness
                        and determine loan eligibility based on various
                        financial factors and credit history.
                      </p>
                      <button class="btn1">Read more</button>
                    </div>
                  </div>

                  <div class="card1">
                    <div class="content1">
                      <p class="heading1">How Does it Work?</p>
                      <p class="para1">
                        The application analyzes an individual's credit history,
                        income, employment status, and other relevant financial
                        data to generate a credit score.
                      </p>
                      <button class="btn1">Read more</button>
                    </div>
                  </div>

                  <div class="card1">
                    <div class="content1">
                      <p class="heading1">simple question?</p>
                      <p class="para1">
                        Currently, we only offer monthly subscription. You can
                        upgrade or cancel your monthly account at any time with
                        no further obligation.
                      </p>
                      <button class="btn1">Read more</button>
                    </div>
                  </div>

                  <div class="card1">
                    <div class="content1">
                      <p class="heading1">Is it automated or manual?</p>
                      <p class="para1">
                        The credit scoring process is fully automated, ensuring
                        consistency and efficiency in evaluating
                        creditworthiness.
                      </p>
                      <button class="btn1">Read more</button>
                    </div>
                  </div>

                  <div class="card1">
                    <div class="content1">
                      <p class="heading1">How can I check my credit score?</p>
                      <p class="para1">
                        Registered users can log in to their accounts to view
                        their credit scores and credit reports.
                      </p>
                      <button class="btn1">Read more</button>
                    </div>
                  </div>

                  <div class="card1">
                    <div class="content1">
                      <p class="heading1">Is the application secure?</p>
                      <p class="para1">
                        Yes, the application follows strict security measures to
                        protect user data and complies with all relevant data
                        protection regulations.
                      </p>
                      <button class="btn1">Read more</button>
                    </div>
                  </div>
                </div>

                {/*   <div className="row1 row">
                  <div class="card1">
                    <div class="content1">
                      <p class="heading1">simple question?</p>
                      <p class="para1">
                        Currently, we only offer monthly subscription. You can
                        upgrade or cancel your monthly account at any time with
                        no further obligation.
                      </p>
                      <button class="btn1">Read more</button>
                    </div>
                  </div>

                  <div class="card1">
                    <div class="content1">
                      <p class="heading1">simple question?</p>
                      <p class="para1">
                        Currently, we only offer monthly subscription. You can
                        upgrade or cancel your monthly account at any time with
                        no further obligation.
                      </p>
                      <button class="btn1">Read more</button>
                    </div>
                  </div>

                  <div class="card1">
                    <div class="content1">
                      <p class="heading1">simple question?</p>
                      <p class="para1">
                        Currently, we only offer monthly subscription. You can
                        upgrade or cancel your monthly account at any time with
                        no further obligation.
                      </p>
                      <button class="btn1">Read more</button>
                    </div>
                  </div>
                </div> */}
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-12 grid-margin">
          <div style={{ maxheight: "70vh" }} className="card">
            <div className="card-body">
              <MDBTypography
                tag="h3"
                className="text-center pb-2 text-primary fw-bold"
              >
                Contact Us
              </MDBTypography>

              <section style={{ paddingLeft: "10%" }}>
                <MDBRow>
                  <MDBCol lg="6" md="5" className="text-left h-50 ">
                    <form class="form">
                      <div class="flex">
                        <label>
                          <input
                            required
                            placeholder=""
                            type="text"
                            class="input"
                          />
                          <span>
                            first name<span className="text-danger">*</span>
                          </span>
                        </label>

                        <label>
                          <input
                            required
                            placeholder=""
                            type="text"
                            class="input"
                          />
                          <span>
                            last name<span className="text-danger">*</span>
                          </span>
                        </label>
                      </div>

                      <label>
                        <input
                          required
                          placeholder=""
                          type="email"
                          class="input"
                        />
                        <span>
                          email<span className="text-danger">*</span>
                        </span>
                      </label>

                      <label>
                        <input
                          required
                          type="tel"
                          placeholder=""
                          class="input"
                        />
                        <span>
                          contact number<span className="text-danger">*</span>
                        </span>
                      </label>
                      <label>
                        <textarea
                          required
                          rows="3"
                          placeholder=""
                          class="input01"
                        ></textarea>
                        <span>
                          message<span className="text-danger">*</span>
                        </span>
                      </label>

                      <button class="fancy" href="#">
                        <span class="top-key"></span>
                        <span class="text">submit</span>
                        <span class="bottom-key-1"></span>
                        <span class="bottom-key-2"></span>
                      </button>
                    </form>
                  </MDBCol>
                </MDBRow>
              </section>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default HelpCenter;
