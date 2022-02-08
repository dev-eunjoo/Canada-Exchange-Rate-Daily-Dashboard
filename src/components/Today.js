import React from "react";
import PropTypes from "prop-types";
import "../App.css";

function Today({ krw, usd, today }) {
  return (
    <div>
      <div className='today'>
        <div>
          <h1 className='today_title'> {today} </h1>
        </div>
        <div>
          <h1 className='today_title'>
            CAD to <span style={{ color: "white" }}>KRW</span>
          </h1>
          <img src='/korea.png' alt='Korea flag' />
          <h1 className='today_title'>{krw.toFixed(2)} KRW</h1>
          <h2>for 1.00 CAD</h2>
        </div>
        <div>
          <h1 className='today_title'>
            CAD to <span style={{ color: "white" }}>USD</span>
          </h1>
          <img src='/usa.png' alt='United State of America flag' />
          <h1 className='today_title'>{usd.toFixed(2)} USD</h1>
          <h2>for 1.00 CAD</h2>
        </div>
      </div>
    </div>
  );
}

Today.propTypes = {
  today: PropTypes.string.isRequired,
  usd: PropTypes.number.isRequired,
  krw: PropTypes.number.isRequired
};

export default Today;
