import React, { useState, useEffect } from "react";
import "./quiz.css"; // Import your CSS file for styles
import { Link } from "react-router-dom";
import Header from "../others/header";
import Footer from "../others/footer";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);
 
  useEffect(() => {
    const quizQuestions = [
      {
        question: "Which of the following best describes a finite automaton?",
        options: [
          "A) A machine with an infinite number of states.",
          "B) A machine with a finite number of states that can change states based on input symbols.",
          "C) A Turing machine with infinite tape.",
          "D) A machine that does not require an input.",
        ],
        correctAnswer: 1,
        explanation:
          "A finite automaton is a mathematical model of computation with a finite number of states that changes states based on input symbols.",
      },
      {
        question:
          "Which of the following strings will the finite automaton accept if the pattern is 'abc'?",
        options: ["A) ab", "B) abc", "C) abcd", "D) acb"],
        correctAnswer: 1,
        explanation:
          "The finite automaton is constructed to recognize the pattern 'abc,' so it will accept the exact match.",
      },
      {
        question: "What is the initial state in a finite automaton?",
        options: [
          "A) The state where no input has been processed.",
          "B) The state where the first input symbol is processed.",
          "C) The state where the last input symbol is processed.",
          "D) The state where the automaton halts.",
        ],
        correctAnswer: 0,
        explanation:
          "The initial state is where no input has been processed and the automaton begins its computation.",
      },
      {
        question:
          "Which component of a finite automaton defines its transitions?",
        options: [
          "A) Alphabet",
          "B) States",
          "C) Transition function",
          "D) Tape",
        ],
        correctAnswer: 2,
        explanation:
          "The transition function defines how the automaton moves from one state to another based on input symbols.",
      },
      {
        question:
          "Given the pattern '101,' which of the following binary strings will the finite automaton accept?",
        options: ["A) 1001", "B) 1101", "C) 1010", "D) 0110"],
        correctAnswer: 2,
        explanation:
          "The finite automaton will accept the string that contains the exact pattern '101.'",
      },
      {
        question:
          "How many states are required for a finite automaton to recognize the pattern 'aab'?",
        options: ["A) 1", "B) 2", "C) 3", "D) 4"],
        correctAnswer: 3,
        explanation:
          "Four states are required: the initial state, two intermediate states for 'aa,' and the final accepting state for 'aab.'",
      },
      {
        question:
          "What is the purpose of the transition table in a finite automaton?",
        options: [
          "A) To store the input symbols.",
          "B) To define the set of all possible states.",
          "C) To map current states and input symbols to next states.",
          "D) To store the output symbols.",
        ],
        correctAnswer: 2,
        explanation:
          "The transition table maps each state and input symbol to the corresponding next state.",
      },
      {
        question:
          "If a finite automaton has 3 states and the input alphabet has 2 symbols, how many entries will the transition table have?",
        options: ["A) 2", "B) 3", "C) 6", "D) 9"],
        correctAnswer: 2,
        explanation:
          "The transition table will have entries for each combination of states and input symbols, i.e., 3 states * 2 symbols = 6 entries.",
      },
      {
        question:
          "Which of the following properties is NOT associated with finite automata?",
        options: [
          "A) Deterministic behavior",
          "B) Finite number of states",
          "C) Transition function",
          "D) Infinite tape",
        ],
        correctAnswer: 3,
        explanation:
          "Finite automata do not have infinite tape; that is a property of Turing machines.",
      },
      {
        question:
          "In string matching with finite automata, what role does the failure function play?",
        options: [
          "A) It directs the automaton to the initial state.",
          "B) It maps the input symbols to their ASCII values.",
          "C) It helps the automaton skip unnecessary comparisons.",
          "D) It outputs the matched substring.",
        ],
        correctAnswer: 2,
        explanation:
          "The failure function allows the automaton to skip unnecessary comparisons, optimizing the string matching process.",
      },
      {
        question:
          "Which of the following is NOT a valid application of finite automata?",
        options: [
          "A) Lexical analysis in compilers",
          "B) Pattern recognition in texts",
          "C) Image processing",
          "D) Text searching algorithms",
        ],
        correctAnswer: 2,
        explanation:
          "Finite automata are primarily used in text processing and pattern recognition, not image processing.",
      },
      {
        question: "What does DFA stand for in the context of finite automata?",
        options: [
          "A) Definite Finite Automaton",
          "B) Deterministic Finite Automaton",
          "C) Deterministic Functional Automaton",
          "D) Defined Finite Automaton",
        ],
        correctAnswer: 1,
        explanation:
          "DFA stands for Deterministic Finite Automaton, where each state has a unique transition for each input symbol.",
      },
      {
        question:
          "Which of the following is true for a Non-deterministic Finite Automaton (NFA)?",
        options: [
          "A) Each state has exactly one transition for each input symbol.",
          "B) Multiple transitions for a single input symbol are allowed.",
          "C) NFAs cannot be converted to DFAs.",
          "D) NFAs are more powerful than DFAs.",
        ],
        correctAnswer: 1,
        explanation:
          "NFAs allow multiple transitions for a single input symbol, unlike DFAs.",
      },
      {
        question:
          "How does the complexity of a DFA for string matching compare to that of an NFA?",
        options: [
          "A) DFA is more complex.",
          "B) NFA is more complex.",
          "C) Both have the same complexity.",
          "D) Complexity depends on the input alphabet.",
        ],
        correctAnswer: 1,
        explanation:
          "NFAs are generally more complex because they allow multiple transitions for a single input symbol, requiring additional computation to handle all possible transitions.",
      },
      {
        question:
          "In the context of finite automata, what does ε (epsilon) represent?",
        options: [
          "A) A state transition",
          "B) An input symbol",
          "C) The empty string",
          "D) A final state",
        ],
        correctAnswer: 2,
        explanation:
          "Epsilon (ε) represents the empty string, which is a string with no characters.",
      },
      {
        question:
          "Which of the following is true about the language accepted by a finite automaton?",
        options: [
          "A) It must be a regular language.",
          "B) It can be any language.",
          "C) It must be a context-free language.",
          "D) It must be an irregular language.",
        ],
        correctAnswer: 0,
        explanation:
          "Finite automata accept regular languages, which can be defined by regular expressions.",
      },
      {
        question:
          "What is the purpose of the accepting state in a finite automaton?",
        options: [
          "A) To indicate the automaton has halted.",
          "B) To indicate the input string has been recognized.",
          "C) To store the input symbols.",
          "D) To reset the automaton.",
        ],
        correctAnswer: 1,
        explanation:
          "The accepting state indicates that the input string has been recognized as matching the pattern defined by the automaton.",
      },
      {
        question:
          "How does the Knuth-Morris-Pratt (KMP) algorithm utilize finite automata?",
        options: [
          "A) By constructing a transition table.",
          "B) By using a stack for state transitions.",
          "C) By using a priority queue.",
          "D) By employing a graph-based search.",
        ],
        correctAnswer: 0,
        explanation:
          "The KMP algorithm constructs a transition table (or prefix function) to determine the longest prefix that is also a suffix, allowing the automaton to skip unnecessary comparisons.",
      },
      {
        question:
          "Which of the following statements is true about the subset construction method?",
        options: [
          "A) It converts a DFA to an NFA.",
          "B) It minimizes the number of states in an NFA.",
          "C) It converts an NFA to a DFA.",
          "D) It reduces the input alphabet size.",
        ],
        correctAnswer: 2,
        explanation:
          "The subset construction method converts an NFA to a DFA by creating states in the DFA that represent sets of states in the NFA.",
      },
      {
        question:
          "What is the main advantage of using a DFA over an NFA for string matching?",
        options: [
          "A) DFAs are easier to implement.",
          "B) DFAs require less memory.",
          "C) DFAs have a simpler transition function.",
          "D) DFAs provide faster and more predictable performance.",
        ],
        correctAnswer: 3,
        explanation:
          "DFAs provide faster and more predictable performance because each state has exactly one transition for each input symbol, making the matching process deterministic.",
      },
      {
        question: "Which of the following is an example of a regular language?",
        options: [
          "A) The set of all palindromes.",
          "B) The set of all strings with balanced parentheses.",
          "C) The set of all binary strings containing '101'.",
          "D) The set of all prime numbers.",
        ],
        correctAnswer: 2,
        explanation:
          "The set of all binary strings containing '101' is a regular language because it can be recognized by a finite automaton.",
      },
      {
        question: "What does the pumping lemma help to prove about a language?",
        options: [
          "A) That it is a regular language.",
          "B) That it is a context-free language.",
          "C) That it is not a regular language.",
          "D) That it is not a context-free language.",
        ],
        correctAnswer: 2,
        explanation:
          "The pumping lemma helps to prove that a language is not a regular language by demonstrating that long enough strings in the language cannot be 'pumped' (repeated in parts) and still belong to the language.",
      },
      {
        question:
          "Which of the following operations is closed under regular languages?",
        options: [
          "A) Union",
          "B) Intersection",
          "C) Complement",
          "D) All of the above",
        ],
        correctAnswer: 3,
        explanation:
          "Regular languages are closed under union, intersection, and complement operations.",
      },
      {
        question: "What is the role of the start state in a finite automaton?",
        options: [
          "A) It defines the beginning of the input string.",
          "B) It indicates the current state of the automaton.",
          "C) It serves as the initial state where the automaton starts processing the input.",
          "D) It determines the length of the input string.",
        ],
        correctAnswer: 2,
        explanation:
          "The start state serves as the initial state where the automaton starts processing the input string.",
      },
      {
        question:
          "Which of the following statements is true about the difference between DFA and NFA?",
        options: [
          "A) DFAs can have multiple transitions for a single input symbol.",
          "B) NFAs can have multiple transitions for a single input symbol.",
          "C) DFAs and NFAs have the same expressiveness.",
          "D) NFAs are less powerful than DFAs.",
        ],
        correctAnswer: 1,
        explanation:
          "NFAs can have multiple transitions for a single input symbol, allowing for non-deterministic behavior.",
      },
      {
        question:
          "What does the Myhill-Nerode theorem characterize in terms of regular languages?",
        options: [
          "A) The equivalence classes of states in a DFA.",
          "B) The number of states in a minimal DFA.",
          "C) The structure of a non-deterministic finite automaton.",
          "D) The regularity of a language.",
        ],
        correctAnswer: 1,
        explanation:
          "The Myhill-Nerode theorem characterizes the equivalence classes of states in a DFA and provides a method to minimize the number of states in a DFA.",
      },
      {
        question:
          "Which of the following types of automata can be used to recognize context-free languages?",
        options: [
          "A) Finite Automata",
          "B) Pushdown Automata",
          "C) Turing Machines",
          "D) Linear Bounded Automata",
        ],
        correctAnswer: 1,
        explanation:
          "Pushdown automata are used to recognize context-free languages because they have an additional stack to handle nested structures, unlike finite automata.",
      },
    ];
    setQuestions(quizQuestions);
  }, []);
  const quizQuestions = Array.from({ length: 40 }, (_, index) => {
    return {
      question: `Question ${index + 1}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: `Explanation for question ${index + 1}.`,
    };
  });

  // Shuffle the questions and pick 10 random ones
  const shuffledQuestions = quizQuestions.sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffledQuestions.slice(0, 10);

  const handleAnswer = (selectedOptionIndex) => {
    setSelectedOption(selectedOptionIndex);
    if (selectedOptionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < 10) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
      setSelectedOption(null);
    } else {
      // Quiz ends, show score or any summary
      setQuizEnded(true);
    }
  };

  const handleRetakeQuiz = () => {
    // Shuffle and pick new random 10 questions for retake
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, 10);

    setQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedOption(null);
    setQuizEnded(false);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (quizEnded) {
    return (
        <div>
            <Header/><br/><br/><br/><br/>
      <div className="quiz-container">
        <div className="question-container">
        <h2>Quiz Completed!</h2>
        <p>Your score is {score} out of 10.</p>
        <div>
          {score < 5 ? (
            <p>You need little practice. Do <Link to={"./info"}>read</Link> the topic again.</p>
          ) : (
            <p>Wow, great job! Keep going!</p>
          )}
        </div>
        <div className="button-container">
          <button onClick={handleRetakeQuiz}>Attempt Again</button>
        </div>
      </div></div>
      <Footer/>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  const { question, options, explanation, correctAnswer } = currentQuestionData;

  return (
    <div>
      <Header /><br/><br/><br/><br/><br/>
      <div className="quiz-container">
        <h2>Quiz</h2>

        <div className="question-container">
          <p>{question}</p>
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                style={{
                  backgroundColor:
                    selectedOption === index
                      ? index === correctAnswer
                        ? "lightgreen"
                        : "rgb(241, 91, 91)"
                      : "white",
                  color:
                    showExplanation && index === correctAnswer
                      ? "green"
                      : "black",
                  cursor: showExplanation ? "not-allowed" : "pointer",
                }}
                onClick={() => !showExplanation && handleAnswer(index)}
              >
                {option}
              </li>
            ))}
          </ul>
          {showExplanation && <div>
          <h4>Explanation:</h4>
          <p>{explanation}</p></div>}
          <div className="button-container">
            <button onClick={handleNextQuestion} disabled={!showExplanation}>
              Next Question
            </button>
          </div>
        </div>
      </div><br/><br/><br/><br/><br/>
      <Footer/>
    </div>
  );
};

export default Quiz;
