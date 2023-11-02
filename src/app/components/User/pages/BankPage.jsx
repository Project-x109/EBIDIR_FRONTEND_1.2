import { CacheProvider, ThemeProvider } from "@emotion/react";
import React from "react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { bankData } from "../../../Dataset/DataCollections";
import MUIDataTable from "mui-datatables";
import { darkTheme, muiCache } from "../Admin/forms/errorConstants";
const BankPage = () => {
  const clicked = (params) => {};
  const options = {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    onRowClick: (rowData) => clicked(rowData),

    onTableChange: (action, state) => {},
  };
  const data = [];
  bankData.forEach((item) => {
    data.unshift({
      Name: item.name,
      Interest: item.interest,
      Website: item.website,
      Established: item.year,
    });
  });
  const columns = [
    {
      name: "Name",
      options: { filterOptions: { fullWidth: true } },
    },
    "Interest",
    {
      name: "Website",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <a href={value}>{value}</a>;
        },
      },
    },
    "Established",
  ];

  return (
    <div style={{textTransform:"capitalize"}}>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={createTheme()}>
          <h2>Banks</h2>
          <div className="page-header">
            <h3 className="page-title">{/* {'DO NOT REMOVE IT '} */}</h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="!#" onClick={(event) => event.preventDefault()}>
                    Banks
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Bank Information
                </li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h1>All Banks </h1>
                </div>
              </div>
            </div>
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <MUIDataTable
                    title={"Banks"}
                    data={data}
                    columns={columns}
                    options={options}
                  />
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
};
export default BankPage;
