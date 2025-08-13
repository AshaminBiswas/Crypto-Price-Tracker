import React, { useMemo } from 'react';
import { Chart } from 'react-google-charts';
import './CoinChart.css';

const CoinChart = ({ chartData, coinData, currency }) => {
  
  
  const priceChartData = useMemo(() => {
    if (!chartData || !chartData.prices) return null;
    
    const data = [['Date', `Price (${currency.symbol})`]];
    chartData.prices.forEach(([timestamp, price]) => {
      data.push([new Date(timestamp), price]);
    });
    return data;
  }, [chartData, currency]);

  
  const marketCapData = useMemo(() => {
    if (!chartData || !chartData.market_caps) return null;
    
    const data = [['Date', `Market Cap (${currency.symbol})`]];
    chartData.market_caps.forEach(([timestamp, marketCap]) => {
      data.push([new Date(timestamp), marketCap]);
    });
    return data;
  }, [chartData, currency]);

  
  const volumeData = useMemo(() => {
    if (!chartData || !chartData.total_volumes) return null;
    
    const data = [['Date', `Volume (${currency.symbol})`]];
    chartData.total_volumes.forEach(([timestamp, volume]) => {
      data.push([new Date(timestamp), volume]);
    });
    return data;
  }, [chartData, currency]);

  
  const combinedData = useMemo(() => {
    if (!chartData || !chartData.prices || !chartData.total_volumes) return null;
    
    const data = [['Date', `Price (${currency.symbol})`, 'Volume (Millions)']];
    chartData.prices.forEach(([timestamp, price], index) => {
      const volume = chartData.total_volumes[index] 
        ? chartData.total_volumes[index][1] / 1000000 
        : 0;
      data.push([new Date(timestamp), price, volume]);
    });
    return data;
  }, [chartData, currency]);

  // Chart options
  const priceOptions = {
    title: `${coinData.name || 'Cryptocurrency'} Price Chart`,
    hAxis: {
      title: 'Date',
    },
    vAxis: {
      title: `Price (${currency.symbol})`,
      format: currency.symbol === '$' ? 'currency' : 'decimal'
    },
    legend: { position: 'none' },
    curveType: 'function',
    explorer: {
      actions: ['dragToZoom', 'rightClickToReset'],
      axis: 'horizontal',
      keepInBounds: true
    }
  };

  const marketCapOptions = {
    title: `${coinData.name || 'Cryptocurrency'} Market Cap`,
    hAxis: {
      title: 'Date',
    },
    vAxis: {
      title: `Market Cap (${currency.symbol})`,
      format: 'short'
    },
    legend: { position: 'none' },
    curveType: 'function',
    explorer: {
      actions: ['dragToZoom', 'rightClickToReset'],
      axis: 'horizontal',
      keepInBounds: true
    }
  };

  const volumeOptions = {
    title: `${coinData.name || 'Cryptocurrency'} Trading Volume`,
    hAxis: {
      title: 'Date',
    },
    vAxis: {
      title: `Volume (${currency.symbol})`,
      format: 'short'
    },
    legend: { position: 'none' }
  };

  const combinedOptions = {
    title: `${coinData.name || 'Cryptocurrency'} Price vs Volume`,
    hAxis: {
      title: 'Date',
    },
    vAxes: {
      0: {
        title: `Price (${currency.symbol})`,
        format: currency.symbol === '$' ? 'currency' : 'decimal'
      },
      1: {
        title: 'Volume (Millions)',
        format: 'short'
      }
    },
    series: {
      0: { 
        type: 'line',
        targetAxisIndex: 0
      },
      1: { 
        type: 'columns',
        targetAxisIndex: 1
      }
    },
    legend: {
      position: 'top',
      alignment: 'center'
    }
  };

  if (!chartData) {
    return (
      <div className="charts-loading">
        <p>Loading chart data...</p>
      </div>
    );
  }

  return (
    <div className="coin-charts">
      <h2>Market Data Charts</h2>
      
      <div className="charts-container">
        {/* Price Chart */}
        <div className="chart-section">
          {priceChartData ? (
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={priceChartData}
              options={priceOptions}
            />
          ) : (
            <div className="chart-error">Price data not available</div>
          )}
        </div>

        {/* Market Cap Chart */}
        <div className="chart-section">
          {marketCapData ? (
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={marketCapData}
              options={marketCapOptions}
            />
          ) : (
            <div className="chart-error">Market cap data not available</div>
          )}
        </div>

        {/* Volume Chart */}
        <div className="chart-section">
          {volumeData ? (
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={volumeData}
              options={volumeOptions}
            />
          ) : (
            <div className="chart-error">Volume data not available</div>
          )}
        </div>

        {/* Combined Chart */}
        <div className="chart-section">
          {combinedData ? (
            <Chart
              chartType="ComboChart"
              width="100%"
              height="500px"
              data={combinedData}
              options={combinedOptions}
            />
          ) : (
            <div className="chart-error">Combined data not available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinChart;