import React from "react";
import "./About.css";

function About() {
  return (
    <section className='container'>
      <div id='introduction'>
        <h2>About the application</h2>
        <p>This web application has been made to provide the daily Exchange Rate information to the users.</p>
        <p>Users can check the Today's Exchange Rate (CAD to KRW, CAD to USD) easily on the screen.</p>
        <p>Also, users can get the historical data via Power BI timely and see the visualized Exchange Rate flow graph updated each day.</p>
        <br />
        <p>Exchange Rate will be updated after 12 pm each day.( updating circumstance could be changed depending on the API Source)</p>
        <br />
        <p>As an South Korean international student study in Canada, I spend lots of time to search Exchange Rate information to transfer money from abroad.</p>
        <p>I hope this site provides some help to someone likes me.</p>
        <br />
        <p>
          API Source: <a href='https://exchangeratesapi.io/'>Exchange Rate API</a>
        </p>
        <p>
          Create by :
          <a href='https://dev-eunjoo.github.io/' target='_blank' rel='noopener noreferrer'>
            Eunjoo Na
          </a>
        </p>
      </div>
    </section>
  );
}

export default About;
