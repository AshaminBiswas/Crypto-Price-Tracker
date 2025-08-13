import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import CoinChart from "../../components/Chart/CoinChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState({});
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(CoinContext);

  // Coin data coming from api
  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": `${import.meta.env.VITE_CP_TRACKER_CRYPTO_API_KEY}`,
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error("Error fetching coin data:", err);
    }
  };

  // Chart data coming from api
  const fetchChartData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": `${import.meta.env.VITE_CP_TRACKER_CRYPTO_API_KEY}`,
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=365&interval=daily`,
        options
      );
      const data = await response.json();
      console.log("Chart data:", data);
      setChartData(data);
    } catch (err) {
      console.error("Error fetching chart data:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (coinId) {
        setLoading(true);
        await Promise.all([fetchCoinData(), fetchChartData()]);
        setLoading(false);
      }
    };

    fetchData();
  }, [coinId, currency]);

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
        <img
          src={coinData.image?.large || coinData.image?.small}
          alt={coinData.name}
        />
        <h1 className="name">
          {coinData.name} ({coinData.symbol?.toUpperCase()})
        </h1>
      </div>

      {/* Additional coin information */}
      {coinData.market_data && (
        <div className="coin-info">
          <p>
            Current Price: {currency.symbol}
            {coinData.market_data.current_price?.[currency.name]}
          </p>
          <p>
            Market Cap: {currency.symbol}
            {coinData.market_data.market_cap?.[currency.name]?.toLocaleString()}
          </p>
          <p>
            24h Change:{" "}
            {coinData.market_data.price_change_percentage_24h?.toFixed(2)}%
          </p>
          <div>
            <h2>Description</h2>
            <p className="dcp">{coinData.description?.en}</p>
          </div>

          <div>
            <h2>Categories</h2>
            {coinData.categories?.map((i, index) => (
              <li key={index}>{i}</li>
            ))}
          </div>
        </div>
      )}

      {/* Pass chart data to CoinChart component */}
      <CoinChart
        chartData={chartData}
        coinData={coinData}
        currency={currency}
      />
    </div>
  );
};

export default Coin;
