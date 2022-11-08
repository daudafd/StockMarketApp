import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import finnHub from "../apis/finnHub"
import {StockChart} from "../components/StockChart"
import {StockData} from "../components/StockData"

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index])
    }
  })
}

export const StockDetailPage = () => {
  const [chartData, setChartData] = useState()
  const {symbol} = useParams()
  
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date()
      const currentTime = Math.floor(date.getTime() / 1000)
      let oneDay;
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60
      }
       else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60
      }
       else {
        oneDay = currentTime - 24 * 60 * 60
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60
      const oneYear = currentTime - 365 * 24 * 60 * 60
      try {
      const responses = await Promise.all([finnHub.get("/stock/candle", {
        params: {
          symbol,
          from: oneDay,
          to: currentTime,
          resolution: 30
        }
      }), finnHub.get("/stock/candle", {
        params: {
          symbol,
          from: oneDay,
          to: currentTime,
          resolution: 60
        }
      }), finnHub.get("/stock/candle", {
        params: {
          symbol,
          from: oneDay,
          to: currentTime,
          resolution: "W"
        }
      })])

        console.log(responses)

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        })
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [symbol])
  
  return <div className="container">
    {chartData && (
    <div>
      <StockChart chartData={chartData} symbol={symbol} />
      <StockData symbol={symbol} />
    </div>
    )}
  </div>
}