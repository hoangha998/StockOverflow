import React, { Component } from 'react';
import './App.css';
import Plot from 'react-plotly.js';


class App extends Component {

  render() {

      const self = this;

      let color = "green";
      if (parseFloat(this.state.stockYData[this.state.endIndex-1]) > parseFloat(this.state.stockYData[0])) {
        color = "red";
        console.log("rand");
      }

      //earnings
      let earningsA = {reportedEPS: 'None'};
      let earningsQ = [];
      for (let i in this.state.earningsA) {
        if (this.state.earningsA[i].fiscalDateEnding == this.state.earningAselect) {
          earningsA = this.state.earningsA[i];
          break;
        }
      }
      for (let i in this.state.earningsQ) {
        if (this.state.earningsQ[i].fiscalDateEnding == this.state.earningQselect) {
          let data = this.state.earningsQ[i];
          earningsQ = [
            {name:'Reported Date', data: data.reportedDate},
            {name:'Reported EPS', data: data.reportedEPS},
            {name:'Estimated EPS', data: data.estimatedEPS},
            {name:'Surprise', data: data.surprise},
            {name:'Surprise Percentage', data: data.surprisePercentage}
          ];
          break;
        }
      }

      //cash flow
      let cashflow = [];
      for (let i in this.state.cashflow) {
        if (this.state.cashflow[i].fiscalDateEnding == this.state.cashflowSelect) {
          let data = this.state.cashflow[i];
          cashflow = [
            {name:'Reported Currency', data: data.reportedCurrency},
            {name:'Net Income', data: data.netIncome},
            {name:'Operating Cashflow', data: data.operatingCashflow},
            {name:'Payments For OperatingActivities', data: data.paymentsForOperatingActivities},
            {name:'Depreciation Depletion And Amortization', data: data.depreciationDepletionAndAmortization},
            {name:'Capital Expenditures', data: data.capitalExpenditures},
            {name:'Change In Inventory', data: data.changeInInventory},
            {name:'Profit Loss', data: data.profitLoss},
            {name:'Cashflow From Investment', data: data.cashflowFromInvestment},
            {name:'Cashflow From Financing', data: data.cashflowFromFinancing},
            {name:'Proceeds From Short term Debt', data: data.proceedsFromRepaymentsOfShortTermDebt},
            {name:'Dividend Payout', data: data.dividendPayout},
            {name:'Dividend Payout CommonStock', data: data.dividendPayoutCommonStock},
            {name:'Proceeds From Repurchase Of Equity', data: data.proceedsFromRepurchaseOfEquity},
            {name:'Change In Cash And Cash Equivalents', data: data.changeInCashAndCashEquivalents}
          ];
          break;
        }
      }

      //income statement
      let income = [];
      for (let i in this.state.income) {
        if (this.state.income[i].fiscalDateEnding == this.state.incomeSelect) {
          let data = this.state.income[i];
          income = [
            {name:'Reported Currency', data: data.reportedCurrency},
            {name:'Gross Profit', data: data.grossProfit},
            {name:'Total Revenue', data: data.totalRevenue},
            {name:'Cost Of Revenue', data: data.costOfRevenue},
            {name:'Goods & Services Sold', data: data.costofGoodsAndServicesSold},
            {name:'Operating Income', data: data.operatingIncome},
            {name:'R&D', data: data.researchAndDevelopment},
            {name:'Operating Expenses', data: data.operatingExpenses},
            {name:'Net Investment Income', data: data.investmentIncomeNet},
            {name:'Net Interest Income', data: data.netInterestIncome},
            {name:'Interest Income', data: data.interestIncome},
            {name:'Interest Expense', data: data.interestExpense},
            {name:'Other Non-operating Income', data: data.otherNonOperatingIncome},
            {name:'Depreciation', data: data.depreciation},
            {name:'Income Before Tax', data: data.incomeBeforeTax},
            {name:'Income Tax Expense', data: data.incomeTaxExpense},
            {name:'Comprehensive Income Net Of Tax', data: data.comprehensiveIncomeNetOfTax}
          ];
          break;
        }
      }

      return (
        <div> 
            <header>
              <nav> 
                <img src="logo.png"/>

                  <form id="ticker-form" onSubmit={this.changeTicker}>
                    <label> Stock Symbol  &nbsp;
                      <input type="text" name="ticker"/>
                      <button type="submit" name="submit"> Submit </button>
                    </label>
                  </form>

                  <span>
                    <a href="#chart-area"> Chart </a>
                    <a href="#overview"> Overview </a>
                    <a href="#details"> Reports </a>
                    <a href="#news-section" className="last-child"> News </a>
                  </span>
              </nav> 
            </header> 

            <section className="container">
              <div id="chart-section-header">
                <h2> Stock Chart </h2>
              </div>
              <div id="chart-area"> 
                <div id="above-chart">
                  <span id="range-adjust">
                    <button className="inactive" onClick={function() {self.setRangeMonth(1);}}> 1M </button>
                    <button className="inactive" onClick={function() {self.setRangeMonth(2);}}> 2M </button>
                    <button className="inactive" onClick={function() {self.setRangeMonth(3);}}> 3M </button>
                    <button className="active" onClick={function() {self.setRangeMonth(4);}}> 4M </button>
                  </span>

                  
                </div>
                
                <div id="chart">
                  <Plot
                      data={[
                        {
                          x: this.state.stockXData.slice(0,this.state.endIndex).reverse(),
                          y: this.state.stockYData.slice(0,this.state.endIndex).reverse(),
                          type: 'scatter',
                          mode: 'lines',
                          marker: {color: color},
                        }
                      ]}
                      layout={ {width: 1000, height: 450, title: `${this.state.name} stock price last ${this.state.range} months`} }
                  />
                </div>

              </div>

            </section>


            <section className="container" id="overview">
              
              <div id="company-info">
                <h2>Company Overview</h2>
                <div id="description">
                  <h3> {this.state.name} </h3>
                  <p>
                    {this.state.description}
                  </p>
                  <ul>
                    {this.state.basics.map((basic) =>
                       <li> 
                          <strong>{basic.name}:</strong> {basic.data}
                        </li>
                      )}

                  </ul>
                </div>

                <div id="more-info">
                  <div className="col1">
                    {this.state.numericInfo1.map((info) =>
                      <div className="num-info">
                        <strong> {info.name} </strong> <span>{info.data}</span>
                      </div>
                    )}
                  </div>

                  <div className="col2">
                    {this.state.numericInfo2.map((info) =>
                      <div className="num-info">
                        <strong> {info.name} </strong> <span>{info.data}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
              

            </section>

            <section className="container"> 
              <div id="details">
                <h2>Company Reports</h2>

                <div className="earnings"> 
                  <h3> Earnings </h3>
                  <div className="dcol1">
                    <h4> Annually </h4>
                    <label className="range-select"> Fiscal Date Ending
                      <select name="range1" id="earningsRangeA" className="dropdown" onChange={this.changeEarningsA}> 
                        {this.state.earningsA.map((report) =>
                        <option value={report.fiscalDateEnding}> {report.fiscalDateEnding} </option>
                        )}
                      </select> 
                    </label>

                    <div className="num-info">
                      <strong> Reported EPS </strong> <span> {earningsA.reportedEPS} </span>
                    </div>
                  </div>

                  <div className="dcol2">
                    <h4> Quaterly </h4>
                    <label className="range-select"> Fiscal Date Ending
                      <select name="range2" id="range2" className="dropdown" onChange={this.changeEarningsQ}> 
                        {this.state.earningsQ.map((report) =>
                          <option value={report.fiscalDateEnding}> {report.fiscalDateEnding} </option>
                        )}
                      </select> 
                    </label>

                    {earningsQ.map((report) =>
                      <div className="num-info">
                        <strong> {report.name} </strong> <span> {report.data} </span>
                      </div>
                      )}
                  </div>
                </div>

                <div className="row2">

                  <div className="dcol1">
                    <h3> Cash Flow </h3>
                    <label className="range-select"> Fiscal Date Ending 
                      <select name="range1" id="range1" className="dropdown" onChange={this.changeCashflow}> 
                        {this.state.cashflow.map((report) =>
                          <option value={report.fiscalDateEnding}> {report.fiscalDateEnding} </option>
                        )}
                      </select> 
                    </label>

                    {cashflow.map((report) =>
                      <div className="num-info">
                        <strong> {report.name} </strong> <span> {report.data} </span>
                      </div>
                    )}
                  </div>

                  <div className="dcol2">
                    <h3> Income Statement </h3>
                     <label className="range-select"> Fiscal Date Ending 
                      <select name="range1" id="range1" className="dropdown" onChange={this.changeIncomeStatement}> 
                        {this.state.income.map((report) =>
                          <option value={report.fiscalDateEnding}> {report.fiscalDateEnding} </option>
                        )}
                      </select> 
                    </label>
                    {income.map((report) =>
                      <div className="num-info">
                        <strong> {report.name} </strong> <span> {report.data} </span>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </section>



            <section className="container" id="news-section"> 
              <div id="news">
                <h2> News </h2>
                {this.state.news.map((article) =>
                  <div className="news-ele" onClick={function(){window.open(article.url)}}>
                    <img src={article.urlToImage} />
                    <div>
                      <p className="news-timestamp"> {article.source.name} - {new Date(article.publishedAt).toDateString()} </p>
                      <p className="news-title"> {article.title} </p>
                      <p className="news-description"> {article.description}.. </p>
                    </div>
                </div>
                )}
              </div>
            </section>

        </div>

      );
  }

  constructor(props) {
    super(props);
    this.state = {
      stockXData: [1,2,3,4,5],
      stockYData: [1,2,3,4,5],
      endIndex: 0,

      ticker: "TLRY",
      name: "Tilray",
      APIkey: 'MYK5M86CMOZ6XX86',
      newsAPIkey: '666e35cbf8744288a39d6658230222eb',

      description: null,
      basics: [],
      numericInfo1: [],
      numericInfo2: [],

      earningsA: [],
      earningsQ: [],
      earningAselect: null,
      earningQselect: null,

      cashflow: [],
      cashflowSelect: null,

      income: [],
      incomeSelect: null,

      news: []
    };

    this.changeTicker = this.changeTicker.bind(this);
    this.changeEarningsA = this.changeEarningsA.bind(this);
    this.changeEarningsQ = this.changeEarningsQ.bind(this);
    this.changeCashflow = this.changeCashflow.bind(this);
    this.changeIncomeStatement = this.changeIncomeStatement.bind(this);
    this.setRangeMonth = this.setRangeMonth.bind(this);

  }

  fetchStockData(ticker) {
    const self = this;
    let APIcall = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${self.state.APIkey}`;
    // let APIcall = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=60min&slice=year1month1&apikey=${APIkey}`;

    let Xvals = [];
    let Yvals = [];

    fetch(APIcall)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          if (data['Meta Data'] === undefined) {
            alert("Invalid symbol entered.\nOr you are changing symbols/refreshing the page too fast.\nThe free version of this API has a cap frequency of 5 requests per minute\nPLease wait about 15 seconds and try again.");
          }
          else {
            let timeSeries = data['Time Series (Daily)'];
            for (let key in timeSeries){
              Xvals.push(key);
              Yvals.push(timeSeries[key]['1. open']);
            }

            self.setState({
              stockXData: Xvals,
              stockYData: Yvals,
              ticker: ticker,
              endIndex: 92,
              range: 4
            });
          }
        }
      );
  }

  fetchCompanyOverview(ticker) {
     const self = this;
      let OverviewCall = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${self.state.APIkey}`;

      fetch(OverviewCall) 
        .then(
          function(response) {
            return response.json();
          }
        )
        .then( 
          function(data) {
            if (data['Symbol'] != undefined) {
              self.setState({
                description: data['Description'],
                name: data['Name'],
                basics: [
                  {name: "Industry", data: data['Industry']},
                  {name: "Asset Type", data: data['AssetType']}, 
                  {name: "Sector", data: data['Sector']}, 
                  {name: "Employee", data: data['FullTimeEmployees']}, 
                  {name: "Exchange", data: data['Exchange']},
                  ],
                numericInfo1: [
                  {name: "52 Week High", data: data['52WeekHigh']},
                  {name: "52 Week Low", data: data['52WeekLow']}, 
                  {name: "50 Day Moving Avg", data: data['50DayMovingAverage']}, 
                  {name: "200 Day Moving Avg", data: data['200DayMovingAverage']}, 
                  {name: "Dividen Yield", data: data['DividendYield']}, 
                  {name: "Market Cap", data: data['MarketCapitalization']},
                  {name: "Shares Float", data: data['SharesFloat']},
                  {name: "Shares Outstanding", data: data['SharesOutstanding']}, 
                  {name: "Shares Short", data: data['SharesShort']},
                  {name: "Short Ratio", data: data['ShortRatio']}, 
                  {name: "Gross Profit TTM", data: data['GrossProfitTTM']},

                ],
                numericInfo2: [
                  {name: "Beta", data: data['Beta']},
                  {name: "EPS", data: data['EPS']}, 
                  {name: "EBITDA", data: data['EBITDA']},
                  {name: "Revenue TTM", data: data['RevenueTTM']},
                  {name: "RevenuePer Share TTM", data: data['RevenuePerShareTTM']},  
                  {name: "EV To EBITDA", data: data['EVToEBITDA']},
                  {name: "EV To Revenue: ", data: data['EVToRevenue']}, 
                  {name: "PEGRatio", data: data['PEGRatio']},
                  {name: "PERatio", data: data['PERatio']}, 
                  {name: "Forward PE", data: data['ForwardPE']},
                  {name: "Profit Margin:", data: data['ProfitMargin']},
                ]
              });
            }
            
          }
        );
  }

  fetchEarnings(ticker) {
    const self = this;
    let EarningCall = `https://www.alphavantage.co/query?function=EARNINGS&symbol=${ticker}&apikey=${self.state.APIkey}`;

    fetch(EarningCall) 
      .then(
        function(response) {
          return response.json();
        }
      )
      .then( 
        function(data) {
          if (data['symbol'] != undefined) {
            self.setState({
              earningsA: data["annualEarnings"],
              earningsQ: data["quarterlyEarnings"],
              earningAselect: data["annualEarnings"][0]["fiscalDateEnding"],
              earningQselect: data["quarterlyEarnings"][0]["fiscalDateEnding"],
            });
          }
        }
      );
  }

  fetchCashFlow(ticker) {
    const self = this;
    let CashFlowCall = `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${ticker}&apikey=${self.state.APIkey}`;

    fetch(CashFlowCall) 
      .then(
        function(response) {
          return response.json();
        }
      )
      .then( 
        function(data) {
          if (data['symbol'] != undefined) {
            self.setState({
              cashflow: data["quarterlyReports"],
              cashflowSelect: data["quarterlyReports"][0]["fiscalDateEnding"]
            });
          }
        }
      );
  }

  fetchIncomeStatement(ticker) {
    const self = this;
    let IncomeCall = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${self.state.APIkey}`;

    fetch(IncomeCall) 
      .then(
        function(response) {
          return response.json();
        }
      )
      .then( 
        function(data) {
          if (data['symbol'] != undefined) {
            self.setState({
              income: data["quarterlyReports"],
              incomeSelect: data["quarterlyReports"][0]["fiscalDateEnding"]
            });
          }
        }
      );
  }


  componentDidMount() {
     this.fetchStockData(this.state.ticker);
     this.fetchCompanyOverview(this.state.ticker);
     this.fetchEarnings(this.state.ticker);
     this.fetchCashFlow(this.state.ticker);
     this.fetchIncomeStatement(this.state.ticker);
     this.fetchNews(this.state.ticker);
  }

  changeTicker(event) {
    event.preventDefault();
    const self = this;
    let inputField = event.target.elements.namedItem("ticker");
    let newTicker = inputField.value;
    self.fetchStockData(newTicker);
    self.fetchCompanyOverview(newTicker);
    self.fetchEarnings(newTicker);
    self.fetchNews(newTicker);
    self.setRangeMonth(4);
  }

  changeEarningsA(event) {
    const self = this;
    let option = event.target.value;
    self.setState({
      earningAselect: option
    });
  }

  changeEarningsQ(event) {
    const self = this;
    let option = event.target.value;
    self.setState({
      earningQselect: option
    });
  }

  changeCashflow(event) {
    const self = this;
    let option = event.target.value;
    self.setState({
      cashflowSelect: option
    });
  }

  changeIncomeStatement(event) {
    const self = this;
    let option = event.target.value;
    self.setState({
      incomeSelect: option
    });
  }

  setRangeMonth(range) {
    this.setState({
      endIndex: 23*range,
      range: range
    });
    let buttons = document.getElementById("range-adjust").children;
    for (let i=0; i<4; i++) {
      buttons[i].classList.remove("active");
      buttons[i].classList.add("inactive");
    }
    buttons[range-1].classList.remove("inactive");
    buttons[range-1].classList.add("active");

  }


  fetchNews(ticker) {
    let self = this;
    let NewsCall = `https://newsapi.org/v2/everything?language=en&sortBy=relevancy&q=${ticker}&apiKey=666e35cbf8744288a39d6658230222eb`;
    fetch(NewsCall) 
      .then(
        function(response) {
          return response.json();
        }
      )
      .then( 
        function(data) {
          self.setState({
            news: data.articles.slice(0,5)
          })
        }
      );
  }

}



export default App;
