## Running React on Repl.it

[React](https://reactjs.org/) is a popular JavaScript library for building user interfaces.

[Vite](https://vitejs.dev/) is a blazing fast frontend build tool that includes features like Hot Module Reloading (HMR), optimized builds, and TypeScript support out of the box.

Using the two in conjunction is one of the fastest ways to build a web app.

### Getting Started
- Hit run
- Edit [App.jsx](#src/App.jsx) and watch it live update!

By default, Replit runs the `dev` script, but you can configure it by changing the `run` field in the [configuration file](#.replit). Here are the vite docs for [serving production websites](https://vitejs.dev/guide/build.html)

### Typescript

Just rename any file from `.jsx` to `.tsx`. You can also try our [TypeScript Template](https://replit.com/@replit/React-TypeScript)


### Steps!
1. copy bootstrap CDN from Bootstrap website and place after title in index.html page
2. get FinnHub API documentation Key
3. install react-route-dom
4. create pages folder inside src folder
5. create stockdetailspage and overview page in pages folder and put the     default as:
    export const StockDetailPage = () => {
        return <div>StockDetailPage</div>
      } 
7. import BrowserRouter, Routes amd Route from react-router-dom in a         app.jsx
8. import the components into the StockOverviewPage:
     import {AutoComplete} from "../components/AutoComplete"
     import {StockList} from "../components/StockList"
9. render both components in the StockOverviewPage:
    <AutoComplete/>
    <StockList/>
11. Create folder api, create file finnHub
12. install axios to fetch data from API using useEffect Hook
    #FinnHub:
    import axios from "axios"
    
    export default axios.create({
    baseURL: "https://finnhub.io/api/v1"
    })
    
    #StockList:
    import useState and useEffect from react and fetch data from api
    
14. Use promise.all to fetch multiple api:
    useEffect(() => {
     const fetchData = async () => {
      try {
        const response = await finnHub.get("/quote", {
          params: {
            symbol: "AMZN"
          }
        })
        console.log(response)
      }
      catch (err) {
        
      }
    }
    fetchData()
  }, [])

****************************************************
import {useState, useEffect} from "react"
import finnHub from "../apis/finnHub"

export const StockList = () => {
  const [stock, setStock] = useState([])
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"])

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
                                      
        console.log(responses)
        if(isMounted) {
          setStock(responses)
        }
      }
      catch (err) {
        
      }
    }
    fetchData()
  }, [dependency])
  
  return <div>StockList</div>
}

***************************************************************

