import Chart from "react-apexcharts"
import {useState} from "react"

export const StockChart = ({chartData, symbol}) => {
  const [dateFormat, setDateFormat] = useState("24h")
  const {day, week, year} = chartData

  
  const determineTimeFormat = () => {
    switch(dateFormat) {
      case "24h":
        return day
        case "7d":
        return week
        case "1yr":
        return year
    }
  }

  const color = determineTimeFormat()
  [determineTimeFormat().length - 1].y - determineTimeFormat()[0].y > 0 ? "#26C281" : "#ed3419"
  
  const options = {
    colors:[color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontsize: "24px"
      }
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300
      }
    },
    xavis: {
      type: "datetime",
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM"
      }
    }
  }
  
  const series = [{
    name: symbol,
    data: determineTimeFormat()
  }]
0
  const renderButtonSelect = (button) => {
    const classes = "btn m-1 "
    if (button === dateFormat) {
      return classes + "btn-primary"
    }
    else {
      return classes + "btn-outline-primary"
    }
  }

  return <div classsname="mt-5 p-4 shadow-sm bg-white">
    <Chart options={options} series={series} type="area" width="100%" />
    <div>
      <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>24h</button>
      <button className={renderButtonSelect("7d")} onClick={() => setDateFormat("7d")}>7d</button>
      <button className={renderButtonSelect("1yr")} onClick={() => setDateFormat("1yr")}>1yr</button>
    </div>
  </div> 
}