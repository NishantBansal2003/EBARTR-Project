import axios from "axios";
import MessageSection from "./Components/Message/messageRender";
import LoginSignup from "./Components/LoginSignup/loginSignupRender";
import Form from "./Components/sellapp/sellapp";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cardsdata from "./Components/cards/RenderCards";
import ItemDetailsPage from "./Components/Itemdetails/Itemdetails";
import { UserContext } from "./Components/Message/UserContext";
// import logo from "./logo.svg";
// import Footer from "./Components/footer/Render Code/RenderFooter";
import Header from "./Components/Header/Render Code/RenderHeader";
// import ProductSection from "./Components/ProductSection/Render code/RenderProduct";
let isLoggedIn = window.localStorage.getItem("loggedIn");
function App() {
  axios.defaults.baseURL = "http://localhost:4040";
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Cardsdata />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route exact path="/message" element={<MessageSection />} />
          <Route path="/sell" element={<Form />} />

          <Route
            exact
            path="/card/:collection/:itemId"
            element={<ItemDetailsPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
