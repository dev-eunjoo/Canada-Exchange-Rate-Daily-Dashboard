import React from "react";
import "./About.css";

function About() {
  return (
    <section className='container'>
      <div>
        <h2>
          This web application has been made to provide the daily Exchange Rate
          information to the users.
        </h2>
        <br />
        <h2>
          Users can check the Today's Exchange Rate (CAD to KRW, CAD to USD) easily on the
          screen.
        </h2>
        <h2>
          Also, users can get the historical data via Power BI timely and see the visualized Exchange Rate flow graph updating every day.
        </h2>
        <br />
        <h2>
          Exchange Rate will be updated after 12 pm every day based on API Source.
        </h2>
        <br />
        <h2>
          As an South Korean international student study in Canada, I spend lots of time to search Exchange Rate information to transfer money from abroad.  
        </h2>
        <br />
        <h2>
            I hope this site provides some help to someone likes me.
        </h2>
        <br />
        <h2>
          Create by :
          <a
            href='https://dev-eunjoo.github.io/'
            target='_blank'
            rel='noopener noreferrer'>
            Eunjoo Na{" "}
          </a>
        </h2>
      </div>
    </section>
  );
}

export default About;
