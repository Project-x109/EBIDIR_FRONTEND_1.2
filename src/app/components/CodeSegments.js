import React, { useState } from "react";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
export const BreadComb = (title1, title2, title3) => {
  return (
    <div className="page-header">
      <h3 className="page-title">{title1}</h3>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="!#" onClick={(event) => event.preventDefault()}>
              {title2}
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title3}
          </li>
        </ol>
      </nav>
    </div>
  );
};
export const LOAN_TYPE_TABLE_COLUMN = () => [
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 80,
    flex: 0.1,
    type: "number",
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Link
            to={
              params.row.loanType === "personal"
                ? `/loanprofile/${params.row.id}`
                : `/bloanprofile/${params.row.id}`
            }
            className="text-blue-600 hover:bg-blue-200 p-1 rounded-full bg-blue-100"
          >
            <OpenInNew />
          </Link>
        </>
      );
    },
  },
  {
    field: "user",
    headerName: "Client Full Name",
    minWidth: 300,
    flex: 1,
    headerClassName: "super-app-theme--header",
    align: "left",
    headerAlign: "left",
  },
  {
    field: "Reason_for_loan",
    headerName: "Reason for the Loan",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "Loan_Payment_Period",
    headerName: "Loan Payment Period(Months)",
    minWidth: 100,
    flex: 0.2,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "loan_amount",
    headerName: "Amount Requested ETB",
    minWidth: 200,
    flex: 0.5,
    sortable: true,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "Bank",
    headerName: "Bank",
    minWidth: 200,
    flex: 0.5,
    sortable: true,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "branch",
    headerName: "Branch",
    minWidth: 200,
    flex: 0.5,
    sortable: true,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "Monthly_payment",
    headerName: "Monthly Payment ETB",
    minWidth: 200,
    flex: 0.2,
    sortable: true,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "Type_Of_Loan",
    headerName: "Type Of Loan",
    minWidth: 150,
    flex: 0.1,
    sortable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "status",
    headerName: "status",
    minWidth: 100,
    flex: 0.2,
    renderCell: (params) => {
      return (
        <>
          {params.row.status === "approved" ? (
            <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full #22c55e capitalize">
              {params.row.status}
            </span>
          ) : params.row.status === "declined" ? (
            <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-red-800 capitalize">
              {params.row.status}
            </span>
          ) : (
            <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800 capitalize">
              {params.row.status}
            </span>
          )}
        </>
      );
    },
  },
  {
    field: "Types_of_Collateral",
    headerName: "Collateral",
    minWidth: 100,
    flex: 0.1,
    sortable: true,
  },

  {
    field: "interest",
    headerName: "interest",
    minWidth: 100,
    flex: 0.1,
    sortable: true,
  },
  {
    field: "score",
    headerName: "Credit Score(500)",
    minWidth: 200,
    flex: 0.2,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "rank",
    headerName: "Rank",
    minWidth: 200,
    flex: 0.2,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "requestedOn",
    headerName: "Requested On",
    type: "date",
    minWidth: 200,
    flex: 0.2,
  },
];
export const DATA_GRID = (row, columuns, handleClick) => {
  const [pageSize, setPageSize] = useState(10);
  return (
    <DataGrid
      rows={row}
      columns={columuns}
      components={{
        Toolbar: GridToolbar,
      }}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 20, 50, 100]}
      pagination
      rowHeight={80}
      checkboxSelection
      disableSelectIconOnClick
      onRowClick={(params) => {
        handleClick(params.id);
      }}
      initialState={{
        sorting: {
          sortModel: [{ field: "score", sort: "desc" }],
        },
      }}
      sx={{
        boxShadow: 1,
        border: 1,
        borderColor: "#e2e7ea",
        color: "#343434",
        background: "white",
        fontWeight: "Normal",
        fontSize: "1em",
        fontFamily: "serif",
        colorScheme: "white",
      }}
    />
  );
};
export const DATA_TABLE_OPTIONS = (maxheight) => {
  const options = {
    responsive: "standard",
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    downloadBtn: true,
    tableBodyMaxHeight: "",
    maxheight,
    onTableChange: () => {},
  };
  return options;
};
