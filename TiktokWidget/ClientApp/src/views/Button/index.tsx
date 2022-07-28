import ReactDOM from "react-dom/client";
import ButtonOption from "./Button";
import React from "react";

const newDiv = document.createElement("div");
newDiv.id = "orichi-button";
document.body.appendChild(newDiv);

const root = ReactDOM.createRoot(
  document.getElementById("orichi-button") as HTMLElement
);

root.render(<ButtonOption />);
