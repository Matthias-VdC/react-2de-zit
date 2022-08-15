import React from "react";
import { Route, Routes } from "react-router-dom";
import Comments from "./pages/Comments.page";
import Header from "./components/Header";
import Home from "./pages/Home.page";
import Subreddit from "./pages/Subreddit.page";

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
      <Route
        path="/subreddit/:id"
        element={
          <>
            <Header />
            <Subreddit />
          </>
        }
      />
    </Routes>
  );
}

export default App;
