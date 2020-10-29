import React from "react";
import axios from "axios";
import Today from "../components/Today";
import { Line } from "react-chartjs-2";
import "./../App.css";


class Home extends React.Component {
  state = {
    isLoading: true,
    reports: [],
    reports_usa: [],
    reports_krw: [],
    date: "",
  };

  render_usd_graph = () => {
    const { reports_usa} = this.state;
    const datas = [];

    let keys = Object.keys(reports_usa);
    keys = Array.from(keys);
    keys.sort();

    for (var i = 0; i < keys.length; i++) {
        let data = reports_usa[keys[i]].USD;
        data = data.toFixed(4);
        datas.push(data);
      }

    const data_graph = {
      labels: keys,
      datasets: [
        {
          label: "Exchange Rate",
          backgroundColor: "rgba(244, 152, 31, 0.5)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: datas
        }
      ]
    };

    return (
        <div className="graph">
        <Line
          data={data_graph}
          options={{
            title: {
              display: true,
              text: "Exchange Rates Graph (CAD to USD) - from 2020.06.01",
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
    const { reports_krw}  = this.state;
    const datas = [];

    let keys = Object.keys(reports_krw);
    keys = Array.from(keys);
    keys.sort();

    for (var i = 0; i < keys.length; i++) {
        let data = reports_krw[keys[i]].KRW;
        data = data.toFixed(2);
        datas.push(data);
      }

    const data_graph = {
      labels: keys,
      datasets: [
        {
          label: "Exchange Rate",
          backgroundColor: "rgba(75,192,192,0.5)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: datas
        }
      ]
    };

    return (
        <div className="graph">
        <Line
          data={data_graph}
          options={{
            title: {
              display: true,
              text: "Exchange Rates Graph (CAD to KRW) - from 2020.06.01",
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

    const api = await axios.get(
        "https://api.exchangeratesapi.io/latest?base=CAD"
      );
    
    const today = api.data.date;
    this.state.date = today;

    const today_data = api.data.rates;
    this.state.reports = today_data;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();


    const today_in_api = [year, month, day].join("-");
    const api_usa = ["https://api.exchangeratesapi.io/history?start_at=2020-06-01&end_at=",today_in_api, "&base=CAD&symbols=USD"].join("");

    const today_usa = await axios.get(
        api_usa
      );

    const usa_data = today_usa.data.rates;
    this.state.reports_usa = usa_data;

    const api_krw = ["https://api.exchangeratesapi.io/history?start_at=2020-06-01&end_at=",today_in_api, "&base=CAD&symbols=KRW"].join("");

    const today_krw = await axios.get(
        api_krw
      );

    const krw_data = today_krw.data.rates;
    this.state.reports_krw = krw_data;

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
            <Today
              today= {date}
              krw={reports.KRW}
              usd={reports.USD}
            />

            <div className="powerbi_data">
                <div>
                <h2 className="powerbi">Download Exchange Rate Data Record (from 2020.01.01 ~ 10.28) - Power BI</h2>
                </div>


            <a className="download" href="2020_exchange_rate_1028.pbix" download>Click to download!</a>
            </div>
            <div className="graph_data">
                <h2>Daily updated Exchange Rates Graph</h2>
            </div>
            {this.render_usd_graph()} {this.render_krw_graph()}
            
            <div className='sign'> Copyright© Eunjoo Na 2020 </div>
          </div>
        )}
      </section>
    );
  }
}

export default Home;
