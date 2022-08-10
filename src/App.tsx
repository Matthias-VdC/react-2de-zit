import React from "react";
import { Route, Routes } from "react-router-dom";
import Comments from "./components/Comments";
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
      <Route
        path="/post/:id"
        element={
          <>
            <Header />
            <Comments />
          </>
        }
      />
    </Routes>
  );
}

export default App;
