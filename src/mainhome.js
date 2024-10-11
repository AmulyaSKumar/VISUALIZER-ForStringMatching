import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './mainhome.css';  // Make sure to import the CSS file

const Mainhome = () => {
  const navigate = useNavigate();
  
  return (
    <div className='parent'>
    <div id="startpopup" className="bigbox" onClick={()=>navigate('./home')}>
      <p className="pop1"></p>
      <p className="pop2">
        WELCOME
        <br />
        TO THE WORLD OF STRINGS
      </p>
      <p className="pop3"></p>
      <br />
      <svg id="popupanim" width="600px" height="230px" viewBox="0 0 600 230">
        <motion.path
          id="pa1"
          strokeWidth="2px"
          stroke="#000000"
          d="M10,35L245,35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.polygon
          id="po1"
          initial={{ points: "245,27 245,27 245,43 245,43 245,27" }}
          animate={{ points: "245,27 270,35 270,35 245,43 245,27" }}
          transition={{ delay: 1, duration: 0.2 }}
        />
        <motion.path
          id="cp11"
          strokeWidth="2px"
          stroke="#000000"
          fill="none"
          d="M270,35 A30 30 0 0 0 330 35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 2 }}
        />
        <motion.path
          id="cp12"
          strokeWidth="2px"
          stroke="#000000"
          fill="none"
          d="M270,35 A30 30 0 1 1 330 35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 2 }}
        />
        <motion.text
          id="t1"
          fontSize="30"
          textAnchor="middle"
          x="300"
          y="45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          1
        </motion.text>
        <motion.path
          id="pa2"
          strokeWidth="2px"
          stroke="#000000"
          fill="none"
          d="M330,35 L550,35 A40 40 0 0 1 550 115 L355,115"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2, duration: 2 }}
        />
        <motion.polygon
          id="po2"
          initial={{ points: "355,107 355,107 355,123 355,123 355,107" }}
          animate={{ points: "355,107 330,115 330,115 355,123 355,107" }}
          transition={{ delay: 3, duration: 0.2 }}
        />
        <motion.path
          id="cp21"
          strokeWidth="2px"
          stroke="#000000"
          fill="none"
          d="M330,115 A30 30 0 0 0 270 115"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3.2, duration: 2 }}
        />
        <motion.path
          id="cp22"
          strokeWidth="2px"
          stroke="#000000"
          fill="none"
          d="M330,115 A30 30 0 1 1 270 115"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3.2, duration: 2 }}
        />
        <motion.text
          id="t2"
          fontSize="30"
          textAnchor="middle"
          x="300"
          y="125"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 0.5 }}
        >
          2
        </motion.text>
        <motion.path
          id="pa3"
          strokeWidth="2px"
          stroke="#000000"
          fill="none"
          d="M270,115 L50,115 A40 40 0 0 0 50 195 L175,195"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 4, duration: 2 }}
        />
        <motion.polygon
          id="po3"
          initial={{ points: "175,203 175,203 175,187 175,187 175,203" }}
          animate={{ points: "175,203 200,195 200,195 175,187 175,203" }}
          transition={{ delay: 6,duration: 0.2 }}
        />
        <motion.path
          id="cp31"
          strokeWidth="2px"
          stroke="#000000"
          fill="none"
          d="M200,195 A30 30 0 0 1 230 165 L370,165 A30 30 0 0 1 400 195"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 6.2, duration: 2 }}
        />
        <motion.path
          id="cp32"
          strokeWidth="2px"
          stroke="#000000"
          fill="none"
          d="M200,195 A30 30 0 0 0 230 225 L370,225 A30 30 0 0 0 400 195"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 6.2, duration: 2 }}
        />
        <motion.text
          id="t3"
          fontSize="25"
          textAnchor="middle"
          x="300"
          y="205"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6.4, duration: 0.5 }}
          onClick={() => navigate("./home")}
          fill="#840c84"
        >
          Explore!
        </motion.text>
        <motion.rect
          id="startrect"
          strokeWidth="2px"
          fill="rgba(0,0,0,0)"
          x="200"
          y="165"
          width="200px"
          height="60px"
          rx="30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8.4, duration: 0.5 }}
        />
      </svg>
      <br /><br /><br />
      <p className="pop4">Developed by:</p>
      <p>Amulya , Ishitva Sharma , Niranjan Naik , Shambhavi Sengeri</p>
      <p>ISE, RVCE</p>
    </div></div>
  );
};

export default Mainhome;
