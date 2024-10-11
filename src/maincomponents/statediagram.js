import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../others/header";
import Footer from "../others/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles
import "./statediagram.css"; // Example for custom CSS file

// Helper function to get unique characters from input string
const getUniqueCharacters = (input) => {
  return [...new Set(input.split(""))].sort();
};

// Function to compute the next state in the automaton
function getNextState(pat, M, state, x) {
  console.log(`Getting next state for state: ${state}, char: ${x}`);
  if (state < M && x === pat[state]) {
    console.log(`Match found, transitioning to state: ${state + 1}`);
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
        console.log(`Partial match found, transitioning to state: ${ns}`);
        return ns;
      }
    }
  }

  console.log(`No match found, transitioning to state: 0`);
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
      const nextState = getNextState(pat, M, state, char);
      // Only set the transition if it's not state 0
      TF[state][char] = nextState === 0 ? null : nextState;
      console.log(`TF[${state}][${char}] = ${TF[state][char]}`);
    });
  }

  return TF;
}

const Circle = ({ number, isFinal, x, y }) => (
  <motion.g
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <circle cx={x} cy={y} r="25" stroke="#000" strokeWidth="2" fill="#fff" />
    {isFinal && (
      <circle cx={x} cy={y} r="20" stroke="#000" strokeWidth="2" fill="none" />
    )}
    <text x={x} y={y + 5} textAnchor="middle" fontSize="16" fill="#000">
      {number}
    </text>
  </motion.g>
);


// Arrow Component with animation
const Arrow = ({ startX, startY, endX, endY, label, index }) => {
  const arrowLength = 25; // Radius of the circle

  // Calculate the angle of the arrow
  const angle = Math.atan2(endY - startY, endX - startX);

  // Determine if the arrow is forward or backward
  const isForward = endX > startX;

  // Adjust the start coordinates based on direction (top or bottom)
  const startOffsetY = index % 2 === 0 ? -arrowLength : arrowLength;
  const adjustedStartX = isForward ? startX + arrowLength * Math.cos(angle) : startX;
  const adjustedStartY = isForward ? startY + arrowLength * Math.sin(angle) : startY + startOffsetY;

  // Adjust the end coordinates based on direction (top or bottom)
  const endOffsetY = index % 2 === 0 ? -arrowLength : arrowLength;
  const adjustedEndX = isForward ? endX - arrowLength * Math.cos(angle) : endX;
  const adjustedEndY = isForward ? endY - arrowLength * Math.sin(angle) : endY + endOffsetY;

  // Determine control point for curve (top or bottom)
  const controlPointY = isForward
    ? (startY + endY) / 2
    : index % 2 === 0
    ? (startY + endY) / 2 - 50
    : (startY + endY) / 2 + 50;

  // Set arrowhead size based on the direction (larger for forward)
  const arrowSize = isForward ? 8 : 5;

  return (
    <motion.g
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 1, pathLength: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.path
        d={
          isForward
            ? // Straight line for forward transitions
              `M${adjustedStartX},${adjustedStartY} L${adjustedEndX},${adjustedEndY}`
            : // Curved line for reverse transitions, curving toward top or bottom
              `M${adjustedStartX},${adjustedStartY} Q${(adjustedStartX + adjustedEndX) / 2},${controlPointY} ${adjustedEndX},${adjustedEndY}`
        }
        stroke="#000"
        strokeWidth="2"
        strokeDasharray="none" // Ensure the line is solid
        fill="none"
      />
      <motion.polygon
        points={`
          ${adjustedEndX},${adjustedEndY}
          ${adjustedEndX - arrowSize * Math.cos(angle - Math.PI / 6)},${adjustedEndY - arrowSize * Math.sin(angle - Math.PI / 6)}
          ${adjustedEndX - arrowSize * Math.cos(angle + Math.PI / 6)},${adjustedEndY - arrowSize * Math.sin(angle + Math.PI / 6)}
        `}
        fill="#000"
      />
      {label && (
        <motion.text
          x={(adjustedStartX + adjustedEndX) / 2}
          y={controlPointY + (isForward ? -10 : index % 2 === 0 ? -25 : 25)}
          textAnchor="middle"
          fontSize="16"
          fill="#000"
        >
          {label}
        </motion.text>
      )}
    </motion.g>
  );
};


const Diagram = () => {
  const [inputData, setInputData] = useState("");
  const [searchString, setSearchString] = useState("");
  const [TFTable, setTFTable] = useState([]);
  const [uniqueChars, setUniqueChars] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [states, setStates] = useState([]);
  const [transitions, setTransitions] = useState([]);
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
        <span>
          Check your understanding by attempting the <u>quiz</u>
        </span>,
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

      // State diagram creation
      const updatedStates = Array.from({ length: M + 1 }, (_, i) => ({
        id: i,
        number: i,
        isFinal: i === M,
        x: i * 150 + 50, // Increased spacing between states
        y: 100,
      }));

      const updatedTransitions = [];
      const addedTransitions = new Set();

      for (let state = 0; state <= M; ++state) {
        uniqueCharacters.forEach((char) => {
          const nextState = TF[state][char];
          if (nextState !== null && state !== nextState) {
            // Filter out state 0
            const key = `${state}-${nextState}-${char}`;
            if (!addedTransitions.has(key)) {
              updatedTransitions.push({
                startX: updatedStates[state].x,
                startY: updatedStates[state].y,
                endX: updatedStates[nextState].x,
                endY: updatedStates[nextState].y,
                label: char,
              });
              addedTransitions.add(key);
            }
          }
        });
      }

      setStates(updatedStates);
      setTransitions(updatedTransitions);
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
    navigate("/comparison"); // Navigate to comparison page
  };

  return (
    <div className="automata-container">
      <Header />
      <br />
      <br />
      <br />
      <div className="full-screen">
        <h2 style={{ textAlign: "center" }}>
          State Diagram
        </h2>

        <div className="input-container">
          <div className="ic">
            <label>Text:</label>
            <br />
            <br />
            <input
              type="text"
              id="patternInput"
              value={inputData}
              onChange={handleInputChange}
            />
          </div>
          <div className="ic">
            <label>Pattern:</label>
            <br />
            <br />
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
          <div>
            <div style={{ width: "100%", overflowX: "scroll" }}>
              <svg width={states.length * 150 + 100} height="500">
                {states.map((state) => (
                  <Circle
                    key={state.id}
                    number={state.number}
                    isFinal={state.isFinal}
                    x={state.x}
                    y={state.y}
                  />
                ))}
                {transitions.map((transition, index) => (
                  <Arrow
                    key={index}
                    startX={transition.startX}
                    startY={transition.startY}
                    endX={transition.endX}
                    endY={transition.endY}
                    label={transition.label}
                    index={index} // Pass the index here
                  />
                ))}
              </svg>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Diagram;
