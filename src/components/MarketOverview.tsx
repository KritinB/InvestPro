import React from 'react';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Activity, Globe } from 'lucide-react';
import { stockApi } from '../services/stockApi';

const MarketOverview: React.FC = () => {
  const [indices, setIndices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    { label: 'Market Cap', value: '$45.2T', icon: DollarSign, color: 'text-blue-600' },
    { label: 'Daily Volume', value: '$892B', icon: Activity, color: 'text-green-600' },
    { label: 'Active Stocks', value: '4,567', icon: BarChart3, color: 'text-purple-600' },
    { label: 'Global Markets', value: '24/7', icon: Globe, color: 'text-indigo-600' },
  ];

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const marketIndices = await stockApi.getMarketIndices();
        setIndices(marketIndices);
      } catch (error) {
        console.error('Error fetching market data:', error);
        // Fallback to mock data if API fails
        const mockIndices = await stockApi.getMarketIndices();
        setIndices(mockIndices);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    
    // Refresh every 2 minutes
    const interval = setInterval(fetchMarketData, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        Live Market Overview
        {loading && (
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        )}
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Market Indices */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Major Indices</h3>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
            {indices.map((index, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-900">{index.name}</h4>
                  <p className="text-2xl font-bold text-gray-900">{index.value}</p>
                </div>
                <div className={`text-right ${index.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  <div className="flex items-center gap-1 justify-end">
                    {index.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="font-medium">{index.change}</span>
                  </div>
                  <p className="text-sm">{index.changePercent}</p>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>

        {/* Market Stats */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">Market Sentiment</h4>
            <p className="text-sm text-gray-700">
              Real-time market data shows {indices.length > 0 && indices.filter(i => i.isPositive).length > indices.length / 2 ? 'positive' : 'mixed'} sentiment. 
              Technology stocks continue to drive market movements with AI and cloud computing leading innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;