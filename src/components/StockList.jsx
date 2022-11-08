import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { BsFillCaretDownFill, BsFillCaretUpFill, BsFillArchiveFill } from "react-icons/bs"
import finnHub from "../apis/finnHub"
import { WatchListContext } from "../context/watchListContext"

export const StockList = () => {
  const [stock, setStock] = useState([])
  // const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"])
  // instead of the above we use the below useCotext to export our data to other component for use
  const { watchList, deleteStock } = useContext(WatchListContext)
  const navigate = useNavigate()

  const changeColor = (change) => {
    return change > 0 ? "success":"danger"
  }

  const renderIcon = (change) => {
    return change > 0 ? <BsFillCaretDownFill/> : <BsFillCaretUpFill/>
  }
  
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      const responses = []
      try {
        const responses = await Promise.all(watchList.map((stock) => {
          return finnHub.get("/quote", {
            params: {
              symbol: stock
            }
          })
        }))
                                      
        // console.log(responses)
        const data = responses.map((response) => {
          return {
            data: response.data,
              symbol: response.config.params.symbol
          }
        })
        // console.log(responses)
        if(isMounted) {
          setStock(data)
        }
      }
      catch (err) {
        
      }
    }
    fetchData()

    return () => (isMounted = false)
  }, [watchList])

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`)
  }
  
  return <div className="container">
    <table className="table hover">
      <thead style={{ color: "rgb(79,89,102)" }}>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Last</th>
          <th scope="col">Chg</th>
          <th scope="col">Chg%</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
          <th scope="col">Open</th>
          <th scope="col">Pclose</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        {stock.map((stockData) => {
          return (
            <tr style={{cursor: "pointer"}} onClick={() => handleStockSelect(stockData.symbol)}
              className="table-row" key={stockData.symbol}>
              <th scope="row">{stockData.symbol}</th>
              <td>{stockData.data.c}</td>
              <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d}{renderIcon(stockData.data.d)}</td>
              <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.dp}{renderIcon(stockData.data.d)}</td>
              <td>{stockData.data.h}</td>
              <td>{stockData.data.l}</td>
              <td>{stockData.data.o}</td>
              <td>{stockData.data.pc}</td>
              <td> <button className="btn btn-danger btn-sm ml-3 d-imline-block delete-button" onClick={(e) => {
                e.stopPropagation()
                deleteStock(stockData.symbol)
              }}><BsFillArchiveFill /></button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
}