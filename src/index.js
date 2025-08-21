import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Get the root DOM element
const rootElement = document.getElementById("root");

// Create a root using React 18's createRoot API
const root = createRoot(rootElement);

// Render the App component inside React's StrictMode
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
