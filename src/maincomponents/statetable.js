import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../others/header";
import "./statetable.css"; // Example for custom CSS file
import Footer from "../others/footer";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles

// Helper function to get unique characters from input string
const getUniqueCharacters = (input) => {
  return [...new Set(input.split(""))].sort();
};


// Function to compute the next state in the automaton
function getNextState(pat, M, state, x) {
  if (state < M && x === pat[state]) {
    return state + 1;
  }

  let ns;
  for (ns = state; ns > 0; ns--) {
    if (pat[ns - 1] === x) {
      let i;
      for (i = 0; i < ns - 1; i++) {
        if (pat[i] !== pat[state - ns + 1 + i]) {
          break;
        }
      }
      if (i === ns - 1) {
        return ns;
      }
    }
  }

  return 0;
}

// Function to compute the transition function table
function computeTF(pat, M, uniqueChars) {
  const TF = new Array(M + 1).fill().map(() => {
    const obj = {};
    uniqueChars.forEach((char) => (obj[char] = 0));
    return obj;
  });

  for (let state = 0; state <= M; ++state) {
    uniqueChars.forEach((char) => {
      TF[state][char] = getNextState(pat, M, state, char);
    });
  }

  return TF;
}

const TransitionTable = ({ transitions, uniqueChars }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>State</th>
          {uniqueChars.map((char, index) => (
            <th key={index}>{char}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <AnimatePresence>
          {transitions.map((row, state) => (
            <motion.tr
              key={state}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <td>{state}</td>
              {uniqueChars.map((char, index) => (
                <td key={`${state}-${index}`}>{row[char]}</td>
              ))}
            </motion.tr>
          ))}
        </AnimatePresence>
      </tbody>
    </table>
  );
};

const AutomataComponent = () => {
  const [inputData, setInputData] = useState("");
  const [searchString, setSearchString] = useState("");
  const [TFTable, setTFTable] = useState([]);
  const [uniqueChars, setUniqueChars] = useState([]);
  const [showTable, setShowTable] = useState(false);
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

    // Show toast after 4 seconds
    const timer = setTimeout(() => {
      toast.info(
        <span>Check your understanding by attempting the <u>quiz</u></span>,
        {
          autoClose: false,
          onClick: () => navigate("/quiz"), // Navigate on toast click
        }
      );
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  useEffect(() => {
    if (searchString) {
      const uniqueCharacters = getUniqueCharacters(searchString);
      setUniqueChars(uniqueCharacters);
      const M = searchString.length;
      const TF = computeTF(searchString, M, uniqueCharacters);
      setTFTable(TF);
      setShowTable(true);
    }
  }, [searchString]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputData(value);
    localStorage.setItem("inputData", value);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchString(value);
    localStorage.setItem("searchString", value);
    setShowTable(false);
  };

  const navigateToComparison = () => {
    navigate("/home/statediagram"); // Navigate to comparison page
  };

  return (
    <div className="automata-container">
      <Header /><br/><br/><br/>
      <div className="full-screen">
        <h2 style={{ textAlign: "center" }}>Transition Table</h2>

        <div className="input-container">
          <div className="ic">
            <label>Text:</label><br /><br />
            <input
              type="text"
              id="patternInput"
              value={inputData}
              onChange={handleInputChange}
            />
          </div>
          <div className="ic">
            <label>Pattern:</label><br /><br />
            <input
              type="text"
              id="searchInput"
              value={searchString}
              onChange={handleSearchChange}
            />
          </div>
          <button className="next-button" onClick={navigateToComparison}>
            Next
          </button>
        </div>

        {showTable && (
          <div className="table-container">
            <TransitionTable transitions={TFTable} uniqueChars={uniqueChars} />
          </div>
        )}
        
        <ToastContainer /> {/* Add ToastContainer here */}
      </div><br/><br/><br/><br/><br/>
      <Footer />
    </div>
  );
};

export default AutomataComponent;
