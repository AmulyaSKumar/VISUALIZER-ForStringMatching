import React from "react";
import "./footer.css"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="social">
        <div className="newsletter">
          <h3>Developed by</h3>
        </div>
        <div className="developers">
          <p>
            <i className="icon">Amulya S |</i>
            <i className="icon">Ishitva Sharma |</i>
            <i className="icon">Niranjan Naik |</i>
            <i className="icon">Shambhavi Sengeri</i>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
