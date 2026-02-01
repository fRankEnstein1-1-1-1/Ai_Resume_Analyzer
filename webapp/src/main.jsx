import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import  AuthProvider  from "./context/AuthContext";
import { UploadProvider } from "./context/UploadContext";
import { ResultProvider } from "./context/ResultContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UploadProvider>
      <ResultProvider>
        <App />
      </ResultProvider>
    </UploadProvider>
  </AuthProvider>
);
