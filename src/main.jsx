import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ContextProvider } from "./context/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
