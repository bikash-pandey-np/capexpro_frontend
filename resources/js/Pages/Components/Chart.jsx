import React, { useEffect, useRef, memo } from 'react';

function Chart({ symbol, type }) {
  const container = useRef();

  useEffect(() => {
    // Clear previous chart (if any)
    container.current.innerHTML = '';

    // Create new script element for TradingView widget
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": type === 'stock' ? "NASDAQ:" + symbol : "BINANCE:" + symbol,
        "interval": "1",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "hide_top_toolbar": false,
        "hide_legend": true,
        "allow_symbol_change": false,
        "save_image": false,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
    });
    
    // Append the script to the container
    container.current.appendChild(script);

    // Cleanup function to remove the script when component unmounts or symbol changes
    return () => {
      container.current.innerHTML = '';
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

export default memo(Chart);
