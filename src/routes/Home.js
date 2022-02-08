import React from "react";
import axios from "axios";
import Today from "../components/Today";
import { Line, defaults } from "react-chartjs-2";
import "./../App.css";

defaults.global.maintainAspectRatio = false;

class Home extends React.Component {
  state = {
    isLoading: true,
    reports: [],
    date: "",
    datas_usa: [],
    datas_krw: [],
    dates: []
  };

  render_usd_graph = () => {
    const { datas_usa, dates } = this.state;
    const data_graph = {
      labels: dates,
      datasets: [
        {
          label: "CAD to USD",
          backgroundColor: "rgba(244, 152, 31, 0.5)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: datas_usa,
          fill: false,
          borderColor: "green"
        }
      ]
    };
    return (
      <div class='graph-box'>
        <header>
          <p>2022 Exchange Rates Graph (CAD to USD)</p>
        </header>
        <article class='graph'>
          <Line data={data_graph} />
        </article>
      </div>
    );
  };

  render_krw_graph = () => {
    const { datas_krw, dates } = this.state;

    const data_graph = {
      labels: dates,
      datasets: [
        {
          label: "CAD to KRW",
          backgroundColor: "aliceblue",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: datas_krw,
          fill: false,
          borderColor: "purple"
        }
      ]
    };

    return (
      <div class='graph-box'>
        <header>
          <p>2022 Exchange Rates Graph (CAD to KRW)</p>
        </header>
        <article class='graph'>
          <Line data={data_graph} />
        </article>
      </div>
    );
  };

  getReports = async () => {
    const api = await axios.get("https://api.exchangerate-api.com/v4/latest/CAD");

    const today = api.data.date;
    this.state.date = today;

    const today_data = api.data.rates;

    this.state.reports = today_data;

    let day = today.slice(8, 11);

    let month = today.slice(5, 7);

    let month_count = 0;
    if (month.charAt(0) === "0") {
      month_count = parseInt(month.charAt(1));
    } else {
      month_count = parseInt(month);
    }

    let day_count = 0;
    if (day.charAt(0) === "0") {
      day_count = parseInt(day.charAt(1));
    } else {
      day_count = parseInt(day);
    }

    const datas_usa = [];
    const datas_krw = [];
    const dates = [];

    let test = await axios.get("https://freecurrencyapi.net/api/v2/historical?apikey=0cfcdd30-7999-11ec-96cb-b78b88907bed&base_currency=CAD&date_from=2022-01-01&date_to=" + today);

    let count = 31;
    for (let k = 1; k < month_count + 1; k++) {
      if (k < month_count) {
        if (k === 4 || k === 7 || k === 9 || k === 11) {
          count = 30;
        } else if (k === 2) {
          count = 28;
        } else {
          count = 31;
        }
      } else {
        count = day_count;
      }

      for (var i = 1; i <= count; i++) {
        if (k < 10) {
          month = "0" + k;
        } else {
          month = k;
        }

        if (i < 10) {
          day = "0" + i;
        } else {
          day = i;
        }

        let date = "2022-" + month + "-" + day;
        let dataTest = test.data.data[date];
        let data_usa = dataTest["USD"];
        let data_krw = dataTest["KRW"];

        data_usa = data_usa.toFixed(4);
        data_krw = data_krw.toFixed(4);

        const displayDate = month + "-" + day;
        dates.push(displayDate);
        console.log(dates.length);

        datas_usa.push(data_usa);
        datas_krw.push(data_krw);
      }
    }
    this.state.datas_usa = datas_usa;
    this.state.datas_krw = datas_krw;
    this.state.dates = dates;

    this.setState({
      isLoading: false
    });
  };

  componentDidMount() {
    this.getReports();
  }

  render() {
    const { isLoading, reports, date } = this.state;

    return (
      <section className='container'>
        {isLoading ? (
          <div className='loader'>
            <span className='loader_text'> Loading...Collecting the data </span>{" "}
          </div>
        ) : (
          <div>
            <Today today={date} krw={reports.KRW} usd={reports.USD} />
            {this.render_usd_graph()} {this.render_krw_graph()}
            <div className='powerbi_data'>
              <div>
                <p className='powerbi'>
                  Click to download the data!
                  <a className='download' href='2020 Exchange Rate(2020.01.02-10.28).pbix' download>
                    Exchange Rate Data Record (From 2020.01.02 to 2020.10.28) - Power BI (pbix, 58kb)
                  </a>
                </p>
              </div>
            </div>
            <div className='sign'> Copyright© Eunjoo Na 2022 </div>
          </div>
        )}
      </section>
    );
  }
}

export default Home;
