import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    et: { translation: require("./lang/et.json") },
    en: { translation: require("./lang/en.json") },
  },
  lng: "et",
  returnEmptyString: false,
  supportedLngs: ["et", "en"],
  keySeparator: false,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
