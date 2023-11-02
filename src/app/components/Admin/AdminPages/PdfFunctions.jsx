export const countStatuses = (data) => {
  const statuses = { approved: 0, pending: 0, Closed: 0, unknown: 0, new: 0 };
  data.forEach((item) => {
    if (statuses[item?.status] !== undefined) {
      statuses[item?.status]++;
    } else {
      statuses.unknown++;
    }
  });
  return Object.values(statuses);
};
export const countCollateral = (data) => {
  const collaterals = { Car: 0, Building: 0, "Car,Building": 0 };
  data.forEach((item) => {
    if (collaterals[item?.Types_of_Collateral] !== undefined) {
      collaterals[item?.Types_of_Collateral]++;
    } else {
      collaterals.Car++;
    }
  });
  return Object.values(collaterals);
};

export const calculateLoanAmountPerBank = (data) => {
  const loanAmountPerBank = data.reduce((acc, loan) => {
    if (!acc[loan.Bank]) {
      acc[loan.Bank] = {
        loanAmount: 0,
        Car: 0,
        Building: 0,
        CarandBuilding: 0,
      };
    }

    // Check if loan.loan_amount is a string
    const loanAmount = Number(loan.loan_amount?.replace(/,/g, ""));
    acc[loan.Bank].loanAmount += loanAmount;

    if (loan.Types_of_Collateral?.includes("Car,Building" || "Car, Building")) {
      acc[loan.Bank].CarandBuilding += 1;
    } else if (loan.Types_of_Collateral?.includes("Car" || "car")) {
      acc[loan.Bank].Car += 1;
    } else if (loan.Types_of_Collateral?.includes("Building" || "building")) {
      acc[loan.Bank].Building += 1;
    }

    return acc;
  }, {});
  return loanAmountPerBank;
};

export const calculateLoanAmountPerBranch = (data) => {
  const loanAmountPerBranch = data.reduce((acc, loan) => {
    const branch = loan.branch || "Unknown";
    const bank = loan.Bank || "Unknown"; // Add th

    if (!acc[branch]) {
      acc[branch] = {
        bank: bank, // Add this line
        loanAmount: 0,
        Car: 0,
        Building: 0,
        CarandBuilding: 0,
      };
    }

    // Check if loan.loan_amount is a string
    const loanAmount = Number(loan.loan_amount?.replace(/,/g, ""));
    acc[branch].loanAmount += loanAmount;

    if (loan.Types_of_Collateral?.includes("Car,Building")) {
      acc[branch].CarandBuilding += 1;
    } else if (loan.Types_of_Collateral?.includes("Car")) {
      acc[branch].Car += 1;
    } else if (loan.Types_of_Collateral?.includes("Building")) {
      acc[branch].Building += 1;
    }

    return acc;
  }, {});
  return loanAmountPerBranch;
};
export const calculateLoanAmountPerBranchAndBank = (data) => {
  const loanAmountPerBranchAndBank = data.reduce((acc, loan) => {
    const branch = loan.branch || "Unknown";
    const bank = loan.Bank || "Unknown"; // Add this line

    if (!acc[branch]) {
      acc[branch] = {
        bank: bank, // Add this line
        loanAmount: 0,
        Pending: 0,
        Approved: 0,
        Closed: 0,
        New: 0,
        Unkown: 0,
      };
    }
    // Check if loan.loan_amount is a string
    const loanAmount = Number(loan.loan_amount?.replace(/,/g, ""));
    acc[branch].loanAmount += loanAmount;

    if (loan.status?.includes("pending" || "Pending")) {
      acc[branch].Pending += 1;
    } else if (loan.status?.includes("approved" || "Approved")) {
      acc[branch].Approved += 1;
    } else if (loan.status?.includes("Closed" || "Closed")) {
      acc[branch].Closed += 1;
    } else if (loan.status?.includes("new" || "New")) {
      acc[branch].New += 1;
    } else if (loan.status?.includes("unknow" || "Unknow")) {
      acc[branch].Unknow += 1;
    }

    return acc;
  }, {});
  return loanAmountPerBranchAndBank;
};

export const calculateLoanAmountandStatusPerBank = (data) => {
  const loanAmountandStatusPerBank = data.reduce((acc, loan) => {
    if (!acc[loan.Bank]) {
      acc[loan.Bank] = {
        loanAmount: 0,
        Pending: 0,
        Approved: 0,
        Closed: 0,
        New: 0,
        Unkown: 0,
      };
    }

    // Check if loan.loan_amount is a string
    const loanAmount = Number(loan.loan_amount?.replace(/,/g, ""));
    acc[loan.Bank].loanAmount += loanAmount;

    if (loan.status?.includes("pending" || "Pending")) {
      acc[loan.Bank].Pending += 1;
    } else if (loan.status?.includes("approved" || "Approved")) {
      acc[loan.Bank].Approved += 1;
    } else if (loan.status?.includes("Closed" || "Closed")) {
      acc[loan.Bank].Closed += 1;
    } else if (loan.status?.includes("new" || "New")) {
      acc[loan.Bank].New += 1;
    } else if (loan.status?.includes("unknow" || "Unknow")) {
      acc[loan.Bank].Unknow += 1;
    }

    return acc;
  }, {});
  return loanAmountandStatusPerBank;
};

export const countRoles = (data) => {
  const roles = { user: 0, admin: 0, bank: 0, company: 0 };
  data.forEach((item) => {
    if (roles[item?.role] !== undefined) {
      roles[item?.role]++;
    } else {
      roles.company++; // Assuming that 'company' is the default role
    }
  });
  return Object.values(roles);
};

export const drawBarChart = (doc, dataValues, labels, chartX, chartY) => {
  const chartHeight = 100;
  const chartWidth = 50;
  const barWidth = 10;
  const spacing = 15; // Add spacing between bars

  // Define colors for each bar
  const colors = [
    { r: 255, g: 0, b: 0 }, // Red
    { r: 0, g: 255, b: 255 }, // Cyan
    { r: 255, g: 255, b: 0 }, // Yellow
    { r: 255, g: 0, b: 255 }, // Magenta
    { r: 0, g: 128, b: 0 }, // Green
  ];

  // Draw y-axis
  doc.setLineWidth(1);
  doc.line(chartX, chartY, chartX, chartY + chartHeight);

  // Draw x-axis
  doc.line(
    chartX,
    chartY + chartHeight,
    chartX + chartWidth * 2.5,
    chartY + chartHeight
  );

  // Clean dataValues
  const cleanedDataValues = dataValues.map((value) => {
    if (typeof value === "string") {
      // Remove commas and check if the result is a valid number
      const cleanedValue = value.replace(/,/g, "");
      if (!isNaN(cleanedValue)) {
        return Number(cleanedValue);
      } else {
        return 0; // Return a default value if the string can't be converted to a number
      }
    }
    return value;
  });

  cleanedDataValues.forEach((value, index) => {
    const logValue = Math.log10(value + 1);
    const logMaxValue = Math.log10(Math.max(...cleanedDataValues) + 1);

    let barHeight;
    if (logMaxValue !== 0) {
      barHeight = (logValue / logMaxValue) * chartHeight;
    } else {
      barHeight = 0; // Set to default value or skip drawing the bar
    }

    const color = colors[index] || { r: 0, g: 0, b: 0, a: 1 };

    doc.setFillColor(color.r, color.g, color.b, color.a);

    doc.rect(
      chartX + 5 + index * (barWidth + spacing),
      chartY + chartHeight - barHeight,
      barWidth,
      barHeight,
      "F"
    );

    // Add labels
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(
      labels[index],
      chartX + index * (barWidth + spacing),
      chartY + chartHeight + spacing
    );

    // Display data values above each bar
    doc.text(
      value.toString(),
      chartX + 5 + index * (barWidth + spacing),
      chartY + chartHeight - barHeight - 5
    );
  });
};

export const calculateLoanTypeReport = (data) => {
  // Get unique loan types from data
  const loanTypes = [...new Set(data.map((loan) => loan.Type_Of_Loan))];

  const report = loanTypes.map((Type_Of_Loan) => {
    const loansOfType = data.filter(
      (loan) => loan.Type_Of_Loan === Type_Of_Loan
    );
    const totalAmount = loansOfType.reduce(
      (sum, loan) => sum + Number(loan.loan_amount?.replace(/,/g, "")),
      0
    );
    const averageInterestRate =
      loansOfType?.reduce((sum, loan) => sum + loan.interest, 0) /
      loansOfType.length;
    return [
      Type_Of_Loan,
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalAmount),
      averageInterestRate,
    ];
  });

  return report;
};

export const calculateLoanTypeReportByBank = (data) => {
  // Get unique loan types and banks from data
  const loanTypes = [...new Set(data.map((loan) => loan.Type_Of_Loan))];
  const banks = [...new Set(data.map((loan) => loan.Bank))];

  const report = [];

  banks.forEach((Bank) => {
    loanTypes.forEach((Type_Of_Loan) => {
      const loansOfTypeAndBank = data.filter(
        (loan) => loan.Type_Of_Loan === Type_Of_Loan && loan.Bank === Bank
      );
      if (loansOfTypeAndBank.length > 0) {
        const totalAmount = loansOfTypeAndBank.reduce(
          (sum, loan) => sum + Number(loan.loan_amount?.replace(/,/g, "")),
          0
        );
        const averageInterestRate =
          loansOfTypeAndBank.reduce((sum, loan) => sum + loan.interest, 0) /
          loansOfTypeAndBank.length;
        report.push([
          Bank,
          Type_Of_Loan,
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(totalAmount),
          averageInterestRate,
        ]);
      }
    });
  });
  return report;
};

export const calculateCollateralReport = (data) => {
  const loanTypes = [...new Set(data.map((loan) => loan.Types_of_Collateral))];

  const report = [];

  loanTypes.forEach((Types_of_Collateral) => {
    const loansOfType = data.filter(
      (loan) => loan.Types_of_Collateral === Types_of_Collateral
    );
    if (loansOfType.length > 0) {
      const totalAmount = loansOfType?.reduce(
        (sum, loan) => sum + Number(loan.loan_amount?.replace(/,/g, "")),
        0
      );
      report.push([
        Types_of_Collateral,
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(totalAmount),
      ]);
    }
  });

  return report;
};

export const calculateCollateralReportByBank = (data) => {
  const loanTypes = [...new Set(data.map((loan) => loan.Types_of_Collateral))];
  const banks = [...new Set(data.map((loan) => loan.Bank))];

  const report = [];

  banks.forEach((Bank) => {
    loanTypes.forEach((Types_of_Collateral) => {
      const loansOfTypeAndBank = data.filter(
        (loan) =>
          loan.Types_of_Collateral === Types_of_Collateral && loan.Bank === Bank
      );
      if (loansOfTypeAndBank.length > 0) {
        const totalAmount = loansOfTypeAndBank?.reduce(
          (sum, loan) => sum + Number(loan.loan_amount?.replace(/,/g, "")),
          0
        );
        report.push([
          Bank,
          Types_of_Collateral,
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(totalAmount),
        ]);
      }
    });
  });

  return report;
};

export const addPageDetails = (doc, data, title, logo) => {
  // Add watermark
  doc.setFontSize(60);
  doc.setTextColor(200);
  doc.setFont("helvetica", "italic");
  doc.text("Confidential", 80, 140, null, 45); // 45 degree angle

  // Add header
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text(title, 15, 20);

  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text(
    "Page " + doc.internal.getNumberOfPages(),
    data.settings.margin.left,
    doc.internal.pageSize.height - 10
  );

  // Add logo
  doc.addImage(logo, "JPG", 130, 0, 60, 40);
  doc.clip(); // Apply clipping path
  doc.setDrawColor(0, 0, 0, 0); // Set stroke color to transparent
  doc.setFillColor(0, 0, 0, 0); // Set fill color to transparent
  doc.circle(170, 10, 20, "S"); // Draw a circle as the clipping path
  doc.addImage(logo, "JPG", 130, 0, 60, 40); // Add the image again within the clipping path
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

export const createTable = (doc, startY, head, body, title, logo) => {
  doc.autoTable({
    startY,
    head,
    body,
    margin: { top: 40, bottom: 40 }, // Add top and bottom margins
    styles: {
      head: { fillColor: "#36a2eb" }, // Make the header cells blue
      body: { textColor: "#343434" }, // Make the body cells #343434
    },
    columnStyles: {
      name: { font: "times", fontStyle: "bold" }, // Use a different font for the name column
      email: { textColor: "#ff6384" }, // Use a different color for the email column
    },
    cellPadding: 5,
    didDrawPage: (data) => addPageDetails(doc, data, title, logo),
  });
};
