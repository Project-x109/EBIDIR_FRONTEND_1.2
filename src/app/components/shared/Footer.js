import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import "./footer.css";
class Footer extends Component {
  render() {
    return (
      <>
        <footer>
          <div class="footer-content">
            <div class="footer-section about">
              <div class="logo">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 213 316"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M74.0566 43.497L49.4793 56.6282C34.0104 85.7695 22.3393 118.033 19.9095 145.264H31.1515C31.1515 130.306 43.277 118.181 58.2346 118.181C73.1921 118.181 85.3176 130.306 85.3176 145.264H190.46C190.223 148.292 190.046 155.438 189.929 160.186L189.928 160.209C189.897 161.449 189.871 162.525 189.848 163.319H0.0593382C0.231512 157.272 0.659133 151.253 1.33831 145.264C5.36395 109.765 18.2273 75.3335 39.1178 42.5265C41.6431 38.5606 44.2858 34.6185 47.0443 30.7011C47.704 29.7666 48.3686 28.8342 49.0368 27.9038H66.6309H82.7397C84.0858 25.6579 88.6055 18.4951 90.0261 16.2641C92.5514 12.2982 95.1941 8.35612 97.9526 4.43872C98.6123 3.50427 99.2769 2.57181 99.9451 1.6414H117.539H212.405C188.872 34.6995 158.327 100.946 158.327 132.889H137.022C138.477 104.569 159.099 57.9986 175.973 27.9038L163.284 17.2347H123.07L100.969 27.9038H161.497C138.482 60.2344 122.249 96.0218 119.337 130.491C119.209 131.29 119.086 132.089 118.966 132.889H97.6615C97.7906 132.089 97.9239 131.29 98.0614 130.491C102.2 106.45 110.162 82.7487 122.019 59.911C122.589 58.8147 123.167 57.7205 123.754 56.6282L111.964 43.497H74.0566ZM21.0366 195.074C24.5265 227.538 34.764 259.776 51.5758 290.527H148.223C129.624 259.484 124.959 235.781 120.288 202.713H141.505C141.505 228.154 156.215 268.503 174.678 299.555C177.798 304.803 181.113 310.003 184.622 315.148H165.306H46.9494C16.6762 270.754 0.836592 222.32 0 173.988H188.726V192.864H20.8095C20.8817 193.601 20.9574 194.338 21.0366 195.074ZM99.2692 311.865C104.255 311.865 108.297 307.824 108.297 302.838C108.297 297.852 104.255 293.81 99.2692 293.81C94.2834 293.81 90.2415 297.852 90.2415 302.838C90.2415 307.824 94.2834 311.865 99.2692 311.865Z"
                    fill="#293759"
                  />
                </svg>
              </div>
              <h2>e-BIDIR</h2>
            </div>

            <div class="separator"></div>

            <div class="footer-section links">
              <h3 className="header3main">About Us</h3>
              <p className="mobile">
                Powered by Elite Fintech Solutions P.L.C <br />© Copyright
                e-BIDIR.com. All Rights Reserved
              </p>
            </div>

            <div class="separator"></div>

            <div class="footer-section">
              <div class="footer-section links">
                <h3 className="header3main">Support</h3>
              </div>
            </div>
            <div class="footer-icons iconslink">
              <ul>
                <li>
                  <svg
                    className="icon"
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="#222"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 0H2C0.9 0 0.00500012 0.9 0.00500012 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z"
                      fill="#555"
                    />
                  </svg>
                  <a href="mailto:support@e-bidir.com">support@e-bidir.com</a>
                </li>
                <li>
                  <svg
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#222"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.76 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
                      fill="#999999"
                    />
                  </svg>
                  <a href="mailto:support@e-bidir.com">0712763618</a>
                </li>
              </ul>
            </div>
          </div>

          {/* <div class="footer-bottom">&copy; Company Name</div> */}
        </footer>
      </>
    );
  }
}

export default Footer;




