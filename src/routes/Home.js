import React from "react";
import axios from "axios";
import Today from "../components/Today";
import { Line } from "react-chartjs-2";
import "./../App.css";

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
          label: "Exchange Rate",
          backgroundColor: "rgba(244, 152, 31, 0.5)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: datas_usa
        }
      ]
    };

    return (
      <div className='graph'>
        <Line
          data={data_graph}
          options={{
            title: {
              display: true,
              text: "Exchange Rates Graph (CAD to USD) - from 2021.10.01",
              fontSize: 25
            },
            legend: {
              display: true,
              position: "right"
            }
          }}
        />
      </div>
    );
  };

  render_krw_graph = () => {
    const { datas_krw, dates } = this.state;

    const data_graph = {
      labels: dates,
      datasets: [
        {
          label: "Exchange Rate",
          backgroundColor: "rgba(75,192,192,0.5)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: datas_krw
        }
      ]
    };

    return (
      <div className='graph'>
        <Line
          data={data_graph}
          options={{
            title: {
              display: true,
              text: "Exchange Rates Graph (CAD to KRW) - from 2021.10.01",
              fontSize: 25
            },
            legend: {
              display: true,
              position: "right"
            }
          }}
        />
      </div>
    );
  };

  getReports = async () => {
    const api = await axios.get("https://api.exchangerate-api.com/v4/latest/CAD");

    const today = api.data.date;
    this.state.date = today;

    const today_data = api.data.rates;

    this.state.reports = today_data;

    const date = today.slice(8, 11);

    let date_count = 0;
    if (date.charAt(0) === "0") {
      date_count = parseInt(date.charAt(1));
    } else {
      date_count = parseInt(date);
    }

    const datas_usa = [];
    const datas_krw = [];
    const dates = [];

    for (var i = 1; i < date_count + 1; i++) {
      let daily_rate = await axios.get("https://v6.exchangerate-api.com/v6/baeaa176cab9d47e4f3fb8aa/history/CAD/2021/10/" + i);
      let data_usa = daily_rate.data.conversion_rates.USD;
      let data_krw = daily_rate.data.conversion_rates.KRW;
      let date = "2021-10-" + i;

      data_usa = data_usa.toFixed(4);
      data_krw = data_krw.toFixed(4);

      dates.push(date);
      datas_usa.push(data_usa);
      datas_krw.push(data_krw);
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
            <div className='powerbi_data'>
              <div>
                <h2 className='powerbi'>Download Exchange Rate Data Record (from 2020.01.01 ~ 10.28) - Power BI</h2>
              </div>

              <a className='download' href='2020_exchange_rate_1028.pbix' download>
                Click to download!
              </a>
            </div>
            <div className='graph_data'>
              <h2>Daily updated Exchange Rates Graph</h2>
            </div>
            {this.render_usd_graph()} {this.render_krw_graph()}
            <div className='sign'> Copyright© Eunjoo Na 2021 </div>
          </div>
        )}
      </section>
    );
  }
}

export default Home;
