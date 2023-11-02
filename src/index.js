import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider } from "./auth/AuthProvider";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="">
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
