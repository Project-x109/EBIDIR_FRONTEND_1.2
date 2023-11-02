import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../../assets/images/backgroundremovedlogo.jpg";
import "./generatepdf.css";
import moment from "moment";

const LoanDetailGenerator = ({
  data,
  DocumentTitle,
  buildingDetails,
  carDetails,
  type,
  className,
  userDetail,
}) => {
  if (!data) {
    return null;
  }

  const {
    loan_amount,
    Reason_for_loan,
    Loan_Payment_Period,
    status,
    Job_Status,
    Type_Of_Loan,
    Bank,
    Branch,
    Types_of_Collateral,
    Monthly_payment,
    rank,
    interest,
    score,
    createdAt,
  } = data;

  const {
    Location,
    Total_Area,
    Year_of_Construction,
    Distance_from_Main_Road,
    Type_of_Building,
    Purpose_of_the_Building,
    blueprintId,
    Construction_Status,
    Collateral_Coverage_Ratio: BuildingCollateral_Coverage_Ratio,
    utility,
    blueprint,
  } = buildingDetails || {};

  const {
    Type_of_Vehicle,
    Brand_of_Vehicle,
    Model_of_Vehicle,
    Plate_Number,
    Mileage,
    Number_of_Cylinders,
    Horsepower,
    Country_of_Manufacture,
    Transportation_Capacity,
    Year_of_Manufacture,
    Transmission,
    Collateral_Coverage_Ratio,
    carImage,
  } = carDetails || {};

  const {
    email,
    gender,
    name,
    phoneNo,
    profile,
    role,
    cemail,
    sector,
    cname,
    cphoneNo,
    logo: clogo,
    role: companyRole,
    General_Manager,
    legal_status,
  } = userDetail || {};

  const isCarCollateral = Types_of_Collateral === "Car";
  const isBuildingCollateral = Types_of_Collateral === "Building";
  const isCarBuildingCollateral = Types_of_Collateral === "Car,Building";

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableProps = {
      startY: 50,
      styles: {
        head: { fillColor: "#36a2eb" },
        body: { textColor: "#343434" },
      },
    };

    // Reusable function to add watermark, header, footer, and logo
    const addPDFElements = (doc, data) => {
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
    };

    const getContent = () => {
      const content = [
        {
          label: "Loan Amount",
          value: Number(loan_amount).toLocaleString() + " ETB",
        },
        { label: "Reason for Loan", value: Reason_for_loan },
        {
          label: "Loan Payment Period",
          value: Loan_Payment_Period + " Months",
        },
        { label: "Status", value: status },
        { label: "Type of Loan", value: Type_Of_Loan },
        { label: "Bank", value: Bank },
        { label: "Branch", value: Branch },
        { label: "Types of Collateral", value: Types_of_Collateral },
        {
          label: "Monthly Payment",
          value: Number(Monthly_payment).toLocaleString() + " ETB",
        },
        { label: "Rank", value: rank },
        { label: "Interest", value: interest * 100 + " %" },
        type === "personal"
          ? { label: "Job Status", value: Job_Status }
          : { label: "", value: "" },
        { label: "Score", value: score },
        {
          label: "Created At",
          value: moment(createdAt).utc().format("DD-MM-YYYY"),
        },
      ];

      const contentCar = [
        { label: "Type of Vehicle", value: Type_of_Vehicle },
        { label: "Brand of Vehicle", value: Brand_of_Vehicle },
        { label: "Model of Vehicle", value: Model_of_Vehicle },
        { label: "Plate Number", value: Plate_Number },
        {
          label: "Mileage",
          value: Number(Mileage).toLocaleString() + " Killo Meteres",
        },
        { label: "Number of Cylinders", value: Number_of_Cylinders },
        { label: "Horsepower", value: Horsepower + " hp" },
        { label: "Country of Manufacture", value: Country_of_Manufacture },
        { label: "Transportation Capacity", value: Transportation_Capacity },
        { label: "Year of Manufacture", value: Year_of_Manufacture },
        { label: "Transmission Type", value: Transmission },
        { label: "Interest", value: interest * 100 + " %" },
        {
          label: "Collateral Coverage Ratio",
          value: Collateral_Coverage_Ratio,
        },
      ];

      const contentBuilding = [
        { label: "Location", value: Location },
        { label: "Total Area", value: Total_Area },
        { label: "Year of Construction", value: Year_of_Construction },
        { label: "Type of Building", value: Type_of_Building },
        {
          label: "Distance from Main Road",
          value: Number(Distance_from_Main_Road).toLocaleString() + " Meteres",
        },
        { label: "Blueprint ID", value: blueprintId },
        { label: "Purpose of the Building", value: Purpose_of_the_Building },
        {
          label: "Building Collateral Coverage Ratio",
          value: BuildingCollateral_Coverage_Ratio,
        },
        {
          label: "Construction Status",
          value: [
            Construction_Status?.Electro_Mechanical_Lifts === 1
              ? "Electro Mechanicl Lift"
              : "No Electro Mechnical Lift",
            Construction_Status?.Sub_Structure === 1
              ? "Sub Structure"
              : "No Sub Structure",
            Construction_Status?.Partially === 1
              ? "Partially Completed"
              : "Not Partially Completed",
            Construction_Status?.Super_Structure === 1
              ? "Super Structure"
              : "Super Structure",
            Construction_Status?.Fully === 1
              ? "Fully Completed"
              : "Not Fully Completed",
          ].join(", "),
        },
        {
          label: "Utilities",
          value: [
            utility?.electricity === 1
              ? "Electricity"
              : "Electricity Unavailable",
            utility?.water === 1 ? "Water" : "Water Unavailable",
            utility?.internet === 1 ? "Internet" : "Internet Unavailable",
            utility?.gas === 1 ? "Gas" : "Gas Unavailable",
          ].join(", "),
        },
      ];

      return { content, contentCar, contentBuilding };
    };

    const addContentTable = (doc, tableName, content) => {
      doc.addPage();
      doc.autoTable({
        head: [[tableName, "Value"]],
        body: content.map(({ label, value }) => [label, value]),
        ...tableProps,
        didDrawPage: (data) => addPDFElements(doc, data),
      });
    };

    addContentTable(doc, "Loan Data", getContent().content);

    if (isCarCollateral && carDetails) {
      if (role === "user" && userDetail) {
        const user = [
          { label: "Full Name", value: name },
          { label: "Email", value: email },
          { label: "Phone Number", value: phoneNo },
          { label: "Gender", value: gender },
        ];
        addContentTable(doc, "User Data", user);
        doc.addPage();
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text("User Image", 20, 20);
        doc.addImage(
          profile?.url ? profile?.url : logo,
          "JPG",
          50,
          30,
          100,
          70
        );
      } else {
        const company = [
          { label: "Company Name", value: cname },
          { label: "Email", value: cemail },
          { label: "Phone Number", value: cphoneNo },
          { label: "Sector", value: sector },
          { label: "Manager", value: General_Manager },
          { label: "Legal Status", value: legal_status },
        ];
        addContentTable(doc, "Company Data", company);
        doc.addPage();
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text("Company Logo", 20, 20);
        doc.addImage(clogo?.url ? clogo?.url : logo, "JPG", 50, 30, 100, 70);
      }

      addContentTable(doc, "Vehicle Data", getContent().contentCar);
      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text("Collateral Image", 20, 20);
      doc.addImage(
        carImage[0]?.url ? carImage[0]?.url : logo,
        "JPG",
        50,
        30,
        100,
        70
      );
    }

    if (isBuildingCollateral && buildingDetails) {
      if (role === "user" && userDetail) {
        const user = [
          { label: "Full Name", value: name },
          { label: "Email", value: email },
          { label: "Phone Number", value: phoneNo },
          { label: "Gender", value: gender },
        ];
        addContentTable(doc, "User Data", user);
        doc.addPage();
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text("User Image", 20, 20);
        doc.addImage(
          profile?.url ? profile?.url : logo,
          "JPG",
          50,
          30,
          100,
          70
        );
      } else {
        const company = [
          { label: "Company Name", value: cname },
          { label: "Email", value: cemail },
          { label: "Phone Number", value: cphoneNo },
          { label: "Sector", value: sector },
          { label: "Manager", value: General_Manager },
          { label: "Legal Status", value: legal_status },
        ];
        addContentTable(doc, "Company Data", company);
        doc.addPage();
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text("Company Logo", 20, 20);
        doc.addImage(clogo?.url ? clogo?.url : logo, "JPG", 50, 30, 100, 70);
      }

      addContentTable(doc, "Building Data", getContent().contentBuilding);
      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text("Collateral Image", 20, 20);
      doc.addImage(blueprint[0]?.url, "JPG", 50, 30, 100, 70);
    }

    if (isCarBuildingCollateral && carDetails && buildingDetails) {
      if (role === "user" && userDetail) {
        const user = [
          { label: "Full Name", value: name },
          { label: "Email", value: email },
          { label: "Phone Number", value: phoneNo },
          { label: "Gender", value: gender },
        ];
        addContentTable(doc, "User Data", user);
        doc.addPage();
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text("User Image", 20, 20);
        doc.addImage(
          profile?.url ? profile?.url : logo,
          "JPG",
          50,
          30,
          100,
          70
        );
      } else {
        const company = [
          { label: "Company Name", value: cname },
          { label: "Email", value: cemail },
          { label: "Phone Number", value: cphoneNo },
          { label: "Sector", value: sector },
          { label: "Manager", value: General_Manager },
          { label: "Legal Status", value: legal_status },
        ];
        addContentTable(doc, "Company Data", company);
        doc.addPage();
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text("Company Logo", 20, 20);
        doc.addImage(clogo?.url ? clogo?.url : logo, "JPG", 50, 30, 100, 70);
      }

      addContentTable(doc, "Building Data", getContent().contentBuilding);
      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text("Collateral Image", 20, 20);
      doc.addImage(blueprint[0]?.url, "JPG", 50, 30, 100, 70);

      addContentTable(doc, "Vehicle Data", getContent().contentCar);
      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text("Collateral Image", 20, 20);
      doc.addImage(carImage[0]?.url, "JPG", 50, 30, 100, 70);
    }

    doc.save(`${DocumentTitle}.pdf`);
  };

  return (
    <div className={className} style={{ marginTop: "4%" }}>
      <button className="generate" onClick={generatePDF}>
        Generate PDF
      </button>
    </div>
  );
};

export default LoanDetailGenerator;
