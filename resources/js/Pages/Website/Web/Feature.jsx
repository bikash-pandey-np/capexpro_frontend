import React from 'react';

const Feature = () => {
  const features = [
    { title: 'User Friendly Interface', body: 'Ensure the app is intuitive and easy to navigate. Users should be able to execute trades, view their portfolios, and access essential information without any hassle.' },
    { title: 'Real Time Market Data', body: 'Investors rely heavily on up-to-date information. Provide real-time stock quotes, charts, and market data to keep users informed.' },
    { title: 'Portfolio Management', body: 'Enable users to track their investments, view performance metrics, and manage their portfolios efficiently. Features like gain/loss tracking and asset allocation are essential.' },
    { title: 'Watchlist Customization', body: 'Allow users to create personalised watchlists with their favourite stocks. Customizable alerts for price changes or news updates can enhance this feature.' },
    { title: 'Customizable Alerts', body: 'Users should receive notifications for significant events, such as price movements, earnings reports, or news related to their holdings.' },
    { title: 'Company Financials', body: 'Provide access to company financial statements, earnings reports, and other relevant data. Investors often analyse financials before making investment decisions. ' },
  ];

  return (
    <section className="py-20 bg-gray-100" id="features">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-lg">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;

