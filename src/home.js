import React, { useState, useEffect } from "react";
import Footer from "./others/footer";
import Header from "./others/header";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file

function Home() {
  const [inputData, setInputData] = useState("");
  const [searchString, setSearchString] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedInputData = localStorage.getItem("inputData");
    const storedSearchString = localStorage.getItem("searchString");
    if (storedInputData) {
      setInputData(storedInputData);
    }
    if (storedSearchString) {
      setSearchString(storedSearchString);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("inputData", inputData);
  }, [inputData]);

  useEffect(() => {
    localStorage.setItem("searchString", searchString);
  }, [searchString]);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleAnimateClick = () => {
    if (inputData.trim() === "" || searchString.trim() === "") {
      setError("Both fields are required.");
      return;
    }
    setError("");
    navigate('/home/statetable');
  };

  return (
    <div>
      <Header /><br/><br/>
      <div className="container">
        <div className="box">
          <label>Enter String</label>
          <input
            type="text"
            value={inputData}
            onChange={handleInputChange}
            className="input"
            required
          /><br/>
          <label>Enter Search String</label>
          <input
            type="text"
            value={searchString}
            onChange={handleSearchChange}
            className="input"
            required
          />
          {error && <p className="error">{error}</p>}
          <button onClick={handleAnimateClick} className="button">Animate</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export { Home };
