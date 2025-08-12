import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(coinData);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-WQjpvRPRGgnPAFPXimqKXy9g",
      },
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coinId) {
      fetchCoinData();
    }
  }, [coinId, currency]); // Added coinId to dependencies

  if (loading) {
  return (
    <div className="coin loading">
      Loading
      <div className="loading-spinner"></div>
    </div>
  );
}

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image?.large || coinData.image?.small} alt={coinData.name} />
        <h1 className="name">
          {coinData.name} ({coinData.symbol?.toUpperCase()})
        </h1>
      </div>
      
      {/* Additional coin information */}
      {coinData.market_data && (
        <div className="coin-info">
          <p>Current Price: {currency.symbol}{coinData.market_data.current_price?.[currency.name]}</p>
          <p>Market Cap: {currency.symbol}{coinData.market_data.market_cap?.[currency.name]?.toLocaleString()}</p>
          <p>24h Change: {coinData.market_data.price_change_percentage_24h?.toFixed(2)}%</p>
          <div>
            <h2>Description</h2>
            <p className="dcp">{coinData.description.en}</p>
          </div>

          <div>
            <h2>Categories</h2>
            {coinData.categories.map((i, index)=><li key={index}>{i}</li>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Coin;