import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../../assets/images/backgroundremovedlogo.png";
import "./generatepdf.css";
import {
  countStatuses,
  countCollateral,
  calculateCollateralReport,
  calculateCollateralReportByBank,
  calculateLoanAmountPerBank,
  calculateLoanAmountPerBranch,
  calculateLoanAmountPerBranchAndBank,
  calculateLoanAmountandStatusPerBank,
  calculateLoanTypeReport,
  calculateLoanTypeReportByBank,
  countRoles,
  drawBarChart,
  createTable,
} from "./PdfFunctions";

const PDFGenerator = ({ header, data, DocumentTitle,className }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set font styles
    doc.setFont("helvetica", "normal");

    const tableData = data.map((item) => {
      const { id, image, Scanned, createdAt, logo, branch_code, ...rest } =
        item;
      return Object.values(rest);
    });
    // Add content to the PDF
    doc.autoTable({
      head: [header],
      body: tableData,
      margin: { top: 40, bottom: 40 }, // Add top and bottom margins
      styles: {
        head: { fillColor: "#36a2eb" }, // Make the header cells blue
        body: { textColor: "#343434" }, // Make the body cells #343434
      },
      columnStyles: {
        name: { font: "times", fontStyle: "bold" }, // Use a different font for the name column
        email: { textColor: "#ff6384" }, // Use a different color for the email column
      },
      cellPadding: 5, // Add some padding to each cell

      didDrawPage: (data) => {
        // Add watermark
        doc.setFontSize(60);
        doc.setTextColor(200);
        doc.setFont("helvetica", "italic");
        doc.text("Confidential", 80, 140, null, 45); // 45 degree angle

        // Add header
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text(DocumentTitle, data.settings.margin.left, 20);

        // Add footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(
          "Page " + doc.internal.getNumberOfPages(),
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );

        // Add logo
        doc.addImage(logo, "JPG", 130, 0, 60, 30);
        doc.clip(); // Apply clipping path
        doc.setDrawColor(0, 0, 0, 0); // Set stroke color to transparent
        doc.setFillColor(0, 0, 0, 0); // Set fill color to transparent
        doc.circle(170, 10, 20, "S"); // Draw a circle as the clipping path
        doc.addImage(logo, "JPG", 130, 0, 60, 30); // Add the image again within the clipping path
        doc.clip("evenodd"); // Remove the clipping path

        // Add horizontal line
        doc.setDrawColor(200);
        doc.setLineWidth(0.5);
        doc.line(
          data.settings.margin.left,
          45,
          doc.internal.pageSize.width - data.settings.margin.right,
          45
        );
      },
    });

    doc.addPage();
    const formatCurrency = (amount) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

    const calculateData = (data, keys, loanAmount) =>
      keys.map((key) => {
        const { bank = key, loanAmount: amount, ...rest } = loanAmount[key];
        return [key, bank, formatCurrency(amount), ...Object.values(rest)];
      });

    const loanStatusData = countStatuses(data);
    const collateralCount = countCollateral(data);
    const userRoleData = countRoles(data);
    const loanAmountPerBank = calculateLoanAmountPerBank(data);
    const loanAmountPerBranch = calculateLoanAmountPerBranch(data);
    const loanAmountandStatusPerBank =
      calculateLoanAmountandStatusPerBank(data);
    const loanTypeReport = calculateLoanTypeReport(data);
    const loanTypeReportByBank = calculateLoanTypeReportByBank(data);
    const loanCollateralReport = calculateCollateralReport(data);
    const loanCollateralReportByBank = calculateCollateralReportByBank(data);
    const loanAmountPerBranchAndBank =
      calculateLoanAmountPerBranchAndBank(data);

    const tableContent = calculateData(
      data,
      Object.keys(loanAmountPerBank),
      loanAmountPerBank
    );
    const tableContentBranch = calculateData(
      data,
      Object.keys(loanAmountPerBranch),
      loanAmountPerBranch
    );
    const tableContentBranchAndBank = calculateData(
      data,
      Object.keys(loanAmountPerBranchAndBank),
      loanAmountPerBranchAndBank
    );
    const tableContentStatus = calculateData(
      data,
      Object.keys(loanAmountandStatusPerBank),
      loanAmountandStatusPerBank
    );
    if (DocumentTitle === "All Loan Records") {
      // Draw the bar chart for loan statuses
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text("Loan Status Bar Chart", 15, 20);
      drawBarChart(
        doc,
        loanStatusData,
        ["Approved", "Pending", "Closed", "Unknown", "New"],
        15,
        35
      );
      doc.addPage();
      // Draw the bar chart for Collaterals
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text("Collateral Status Bar Chart", 15, 20);
      drawBarChart(
        doc,
        collateralCount,
        ["Car", "Building", "Car,Building"],
        15,
        35
      );
      doc.addPage();

      createTable(
        doc,
        40,
        [
          [
            "Bank Key",
            "Bank",
            "Total Loan Amount",
            "Car",
            "Building",
            "Car and Building",
          ],
        ],
        tableContent,
        "Total Loan Amount Per Bank with Collateral",
        logo
      );

      doc.addPage();

      createTable(
        doc,
        40,
        [
          [
            "Branch",
            "Bank",
            "Total Loan Amount",
            "Car",
            "Building",
            "Car and Building",
          ],
        ],
        tableContentBranch,
        "Collateral & Loan Amount Per Branch",
        logo
      );

      doc.addPage();
      createTable(
        doc,
        40,
        [
          [
            "Branch",
            "Bank",
            "Total Loan Amount",
            "Approved",
            "Pending",
            "Closed",
            "Unknown",
            "New",
          ],
        ],
        tableContentBranchAndBank,
        "Loan Amount & Status Per Branch",
        logo
      );

      doc.addPage();
      createTable(
        doc,
        40,
        [
          [
            "Bank Key",
            "Bank",
            "Total Loan Amount",
            "Approved",
            "Pending",
            "Closed",
            "Unknown",
            "New",
          ],
        ],
        tableContentStatus,
        "Total Loan Amount Per Bank",
        logo
      );

      createTable(
        doc,
        40,
        [["Loan Type", "Total Amount", "Average Interest Rate"]],
        loanTypeReport,
        "Loan Type Report",
        logo
      );

      doc.addPage();
      createTable(
        doc,
        40,
        [["Bank", "Loan Type", "Total Amount", "Average Interest Rate"]],
        loanTypeReportByBank,
        "Loan Type Report By Bank",
        logo
      );

      doc.addPage();
      createTable(
        doc,
        40,
        [["Collateral Type", "Total Amount"]],
        loanCollateralReport,
        "Collateral Report",
        logo
      );

      doc.addPage();
      createTable(
        doc,
        40,
        [["Bank", "Collateral Type", "Total Amount"]],
        loanCollateralReportByBank,
        "Collateral Type By Bank",
        logo
      );

      doc.addPage();
    } else if (DocumentTitle === "Personal Loan Records") {
      // Draw the bar chart for loan statuses

      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text("Personal Loan Status Bar Chart", 15, 20);

      drawBarChart(
        doc,
        loanStatusData,
        ["Approved", "Pending", "Closed", "Unknown", "New"],
        15,
        35
      );

      doc.addPage();
      // Draw the bar chart for Collaterals
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text("Collateral Status Bar Chart", 15, 20);
      drawBarChart(
        doc,
        collateralCount,
        ["Car", "Building", "Car,Building"],
        15,
        35
      );
      doc.addPage();
      createTable(
        doc,
        40,
        [
          [
            "Bank Key",
            "Bank",
            "Total Loan Amount",
            "Car",
            "Building",
            "Car and Building",
          ],
        ],
        tableContent,
        "Total Personal  Loan Amount Per Bank with Collateral",
        logo
      );

      doc.addPage();

      createTable(
        doc,
        40,
        [
          [
            "Bank Key",
            "Bank",
            "Total Loan Amount",
            "Approved",
            "Pending",
            "Closed",
            "Unknown",
            "New",
          ],
        ],
        tableContentStatus,
        "Total Personal Loan Amount Per Bank and their Status",
        logo
      );

      doc.addPage();

      createTable(
        doc,
        40,
        [
          [
            "Branch",
            "Bank",
            "Total Loan Amount",
            "Car",
            "Building",
            "Car and Building",
          ],
        ],
        tableContentBranch,
        "Collateral & Loan Amount Per Branch",
        logo
      );

      doc.addPage();

      createTable(
        doc,
        40,
        [
          [
            "Branch",
            "Bank",
            "Total Loan Amount",
            "Approved",
            "Pending",
            "Closed",
            "Unknown",
            "New",
          ],
        ],
        tableContentBranchAndBank,
        "Loan Amount & Status Per Branch",
        logo
      );

      doc.addPage();
      createTable(
        doc,
        40,
        [["Loan Type", "Total Amount", "Average Interest Rate"]],
        loanTypeReport,
        "Loan Type Report",
        logo
      );

      doc.addPage();

      createTable(
        doc,
        40,
        [["Collateral Type", "Total Amount"]],
        loanCollateralReport,
        "Collateral Report",
        logo
      );

      doc.addPage();
      createTable(
        doc,
        40,
        [["Bank", "Collateral Type", "Total Amount"]],
        loanCollateralReportByBank,
        "Collateral Type By Bank",
        logo
      );

      doc.addPage();
    } else if (DocumentTitle === "Business Loan Records") {
      // Draw the bar chart for loan statuses
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text("Business Loan Status Bar Chart", 15, 20);

      drawBarChart(
        doc,
        loanStatusData,
        ["Approved", "Pending", "Closed", "Unknown", "New"],
        15,
        35
      );

      doc.addPage();
      // Draw the bar chart for Collaterals
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text("Collateral Status Bar Chart", 15, 20);
      drawBarChart(
        doc,
        collateralCount,
        ["Car", "Building", "Car,Building"],
        15,
        35
      );

      doc.addPage();
      createTable(
        doc,
        40,
        [
          [
            "Bank Key",
            "Bank",
            "Total Loan Amount",
            "Car",
            "Building",
            "Car and Building",
          ],
        ],
        tableContent,
        "Total Business  Loan Amount Per Bank with Collateral",
        logo
      );

      doc.addPage();

      createTable(
        doc,
        40,
        [
          [
            "Bank Key",
            "Bank",
            "Total Loan Amount",
            "Approved",
            "Pending",
            "Closed",
            "Unknown",
            "New",
          ],
        ],
        tableContentStatus,
        "Total Business Loan Amount Per Bank and their Status",
        logo
      );

      doc.addPage();

      createTable(
        doc,
        40,
        [
          [
            "Branch",
            "Bank",
            "Total Loan Amount",
            "Car",
            "Building",
            "Car and Building",
          ],
        ],
        tableContentBranch,
        "Collateral & Loan Amount Per Branch",
        logo
      );

      doc.addPage();

      createTable(
        doc,
        40,
        [
          [
            "Branch",
            "Bank",
            "Total Loan Amount",
            "Approved",
            "Pending",
            "Closed",
            "Unknown",
            "New",
          ],
        ],
        tableContentBranchAndBank,
        "Loan Amount & Status Per Branch",
        logo
      );

      doc.addPage();
      createTable(
        doc,
        40,
        [["Loan Type", "Total Amount", "Average Interest Rate"]],
        loanTypeReport,
        "Loan Type Report",
        logo
      );

      doc.addPage();

      createTable(
        doc,
        40,
        [["Collateral Type", "Total Amount"]],
        loanCollateralReport,
        "Collateral Report",
        logo
      );

      doc.addPage();
      createTable(
        doc,
        40,
        [["Bank", "Collateral Type", "Total Amount"]],
        loanCollateralReportByBank,
        "Collateral Type By Bank",
        logo
      );

      doc.addPage();
    } else if (DocumentTitle === "All Users List") {
      // Add header for the second chart
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text("User Role Bar Chart", 15, 20);

      // Draw the bar chart for user roles
      drawBarChart(
        doc,
        userRoleData,
        ["User", "Admin", "Bank", "Company"],
        15,
        35
      );

      doc.addPage();
    }
    // Save the PDF
    doc.save("myPDF.pdf");
  };

  return (
    <div className={className} style={{ paddingTop: "4%" }}>
      <button className="generate" onClick={generatePDF}>
        Generate PDF
      </button>
    </div>
  );
};

export default PDFGenerator;
