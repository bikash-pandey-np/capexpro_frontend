import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout';
import { useDarkMode } from '../Components/DarkModeProvider';
import Chart from '../Components/Chart';

const Trade = ({source, type}) => {
    const { darkMode } = useDarkMode();
    const [selectedPair, setSelectedPair] = useState(source ? source : 'BTCUSDT');
    const defaultStock = 'META';
    console.log('souce', source);
    const [selectedType, setSelectedType] = useState(type ? type : 'crypto');

    const handlePairChange = (e) => {
        source = 'e.target.value'
        setSelectedPair(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);

        if(e.target.value === 'stock')
            {

                setSelectedPair(defaultStock);
            }
            else{
                setSelectedPair('BTCUSDT')
            }

        console.log(selectedPair);
    };

    return (
        <Layout>
            <div className="container mx-auto">
                <div className={`p-3 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <h2 className="large font-semibold">Trade
                
                
                </h2>
                <select className="p-2 border rounded extra_small" value={selectedType} onChange={handleTypeChange}>
                    <option value="crypto">Crypto</option>
                    <option value="stock">Stock</option>
                </select>
                <select className="p-2 border rounded extra_small" value={selectedPair} onChange={handlePairChange}>
                    {selectedType === 'crypto' && <option value="BTCUSDT">BTCUSDT</option>}
                    {selectedType === 'crypto' && <option value="ETHUSDT">ETHUSDT</option>}
                    {selectedType === 'crypto' && <option value="AAVEUSDT">AAVEUSDT</option>}
                    {selectedType === 'crypto' && <option value="LINKUSDT">LINKUSDT</option>}
                    {selectedType === 'crypto' && <option value="ADAUSDT">ADAUSDT</option>}
                    {selectedType === 'crypto' && <option value="XRPUSDT">XRPUSDT</option>}
                    {selectedType === 'crypto' && <option value="DASHUSDT">DASHUSDT</option>}
                    {selectedType === 'crypto' && <option value="LTCUSDT">LTCUSDT</option>}

                    {selectedType === 'stock' && <option value="META">META</option>}
                    {selectedType === 'stock' && <option value="TSLA">TESLA</option>}
                    {selectedType === 'stock' && <option value="GOOG">GOOGLE</option>}
                    {selectedType === 'stock' && <option value="AAPL">APPLE</option>}
                    {selectedType === 'stock' && <option value="NVDA">NVIDIA</option>}
                    {selectedType === 'stock' && <option value="AMZN">AMAZON</option>}
                    {selectedType === 'stock' && <option value="NFLX">NETFLIX</option>}
                    {selectedType === 'stock' && <option value="ADBE">ADOBE</option>}
                </select>
              
                </div>
                <div style={{ height: '65vh' }}>
                <Chart symbol={selectedPair} type={selectedType} />
            </div>

            <div className="flex justify-center mt-4 mb-12">
                <a href={route(selectedType === 'crypto' ? 'frontend.trade-by-symbol_crypto' : 'frontend.trade-by-symbol', { symbol: selectedPair, type: 'long' })} className="bg-green-500 text-white py-2 px-4 rounded-l w-1/2">Long</a>
                <a href={route(selectedType === 'crypto' ? 'frontend.trade-by-symbol_crypto' : 'frontend.trade-by-symbol', { symbol: selectedPair, type: 'short' })} className="bg-red-500 text-white py-2 px-4 rounded-r w-1/2">Short</a>
            </div>
             
            </div>
        </Layout>
    );
};

export default Trade;
