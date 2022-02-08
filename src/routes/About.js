import React from "react";
import "./About.css";

function About() {
  return (
    <section className='container'>
      <div id='introduction'>
        <h2>About this application</h2>
        <p>
          <br />
          This web application provides the daily Exchange Rate information to the users.
        </p>
        <p>Users can check the Today's Exchange Rate (CAD to KRW, CAD to USD) easily on the screen.</p>
        <p>Also, users can get the historical data via Power BI and check the visualized Exchange Rate flow chart updated each day.</p>
        <br />
        <p>Exchange Rate will be updated after 12 pm each day.( circumstance could be changed depending on the API environmnet.)</p>
        <br />
        <p>As a Korean living in the Canada, I've spent lots of time to search Exchange Rate to transfer money from abroad.</p>
        <p>I hope this site could help people who are searching for the Exchange Rate about USD and KRW based on CAD.</p>
        <br />
        <p>
          API Source: <a href='https://exchangeratesapi.io/'>Exchange Rate API (Opens new window)</a> , <a href='https://freecurrencyapi.net/'>Free Currencyapi (Opens new window)</a>
        </p>
        <p>
          Create by :
          <a href='https://www.eunjoona.com/' target='_blank' rel='noopener noreferrer'>
            Eunjoo Na
          </a>
        </p>
      </div>
      <div className='sign'> Copyright© Eunjoo Na 2022 </div>
    </section>
  );
}

export default About;
