import {AutoComplete} from "../components/AutoComplete"
import {StockList} from "../components/StockList"
import dfdx2 from "../images/dfdx2.png"

export const StockOverviewPage = () => {
  return <div className="container">
    <div className="text-center">
      <img className="mx-auto logo" src={dfdx2} />
    </div>
     <AutoComplete/>
    <StockList/>
  </div>
}