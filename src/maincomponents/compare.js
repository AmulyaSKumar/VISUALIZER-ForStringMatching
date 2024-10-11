import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import Header from "../others/header";
import Footer from "../others/footer";
import "./statetable.css";

const NO_OF_CHARS = 256;

const getNextState = (pat, M, state, x) => {
  if (state < M && x === pat[state].charCodeAt(0)) {
    return state + 1;
  }

  let ns, i;
  for (ns = state; ns > 0; ns--) {
    if (pat[ns - 1].charCodeAt(0) === x) {
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
};

const computeTF = (pat, M) => {
  const TF = Array.from({ length: M + 1 }, () => Array(NO_OF_CHARS).fill(0));
  for (let state = 0; state <= M; state++) {
    for (let x = 0; x < NO_OF_CHARS; x++) {
      TF[state][x] = getNextState(pat, M, state, x);
    }
  }
  return TF;
};

const search = (pat, txt) => {
  const M = pat.length;
  const N = txt.length;
  const TF = computeTF(pat, M);

  let state = 0;
  const results = [];

  for (let i = 0; i < N; i++) {
    state = TF[state][txt[i].charCodeAt(0)];
    if (state === M) {
      results.push(i - M + 1);
    }
  }

  return results;
};

const Compare = () => {
  const [inputData, setInputData] = useState("");
  const [searchString, setSearchString] = useState("");
  const [results, setResults] = useState([]);
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

    const timer = setTimeout(() => {
      toast.info(
        <span>
          Check your understanding by attempting the <u>quiz</u>
        </span>,
        {
          position: "bottom-right",
          autoClose: false,
          onClick: () => navigate("/quiz"),
        }
      );
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    if (inputData && searchString) {
      const resultIndices = search(searchString.split(""), inputData.split(""));
      setResults(resultIndices);
    }
  }, [inputData, searchString]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputData(value);
    localStorage.setItem("inputData", value);
    setResults([]);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchString(value);
    localStorage.setItem("searchString", value);
    setResults([]);
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1, // Stagger children by 1 second
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="automata-container">
      <Header /><br/><br/><br/>
      <div className="full-screen">

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
        </div>


        {results.length === 0 && searchString && (
          <motion.div className="no-results-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3>Pattern Rejected</h3>
          </motion.div>
        )}

        {results.length > 0 && (
          <motion.div className="results-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3>Pattern Accepted</h3>
          </motion.div>
        )}

        {searchString && (
          <div className="search-result">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              style={{ display: 'flex', gap: '10px' }}
            >
              {inputData.split("").map((char, index) => {
                const isMatched = results.some((resultIndex) => 
                  index >= resultIndex && index < resultIndex + searchString.length
                );
                return (
                  <motion.span
                    key={index}
                    variants={childVariants}
                    style={{
                      fontSize: '1.5em',
                      color: isMatched ? "green" : "red",
                      textDecoration: isMatched ? "underline" : "none",
                      margin: '0 5px' // Add margin to increase spacing
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </motion.p>
          </div>
        )}

        <ToastContainer />
      </div><br/><br/><br/><br/><br/>
      <Footer />
    </div>
  );
};

export default Compare;
