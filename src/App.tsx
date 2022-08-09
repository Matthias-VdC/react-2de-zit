import React from "react";
import { Link, Route, Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home.page";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Home />
          </>
        }
      />
      <Route path="/test" element={<p>TESTING</p>} />
    </Routes>
  );
}

export default App;