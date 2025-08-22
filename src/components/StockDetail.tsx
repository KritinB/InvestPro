import React from 'react';
import { X, TrendingUp, TrendingDown, DollarSign, BarChart3, AlertTriangle, Star, Building, Users } from 'lucide-react';
import { Stock } from './StockList';

interface StockDetailProps {
  stock: Stock;
  onClose: () => void;
}

const StockDetail: React.FC<StockDetailProps> = ({ stock, onClose }) => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Strong Buy': return 'from-green-500 to-green-600 text-white';
      case 'Buy': return 'from-green-400 to-green-500 text-white';
      case 'Hold': return 'from-yellow-400 to-yellow-500 text-white';
      case 'Sell': return 'from-red-400 to-red-500 text-white';
      case 'Strong Sell': return 'from-red-500 to-red-600 text-white';
      default: return 'from-gray-400 to-gray-500 text-white';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getInvestmentAdvice = (stock: Stock) => {
    const advice = [];
    
    if (stock.recommendation === 'Strong Buy' || stock.recommendation === 'Buy') {
      advice.push(`Strong fundamentals support a ${stock.suggestedInvestment.toLocaleString()} investment.`);
      advice.push(`Current price of $${stock.price.toFixed(2)} presents a good entry point.`);
    } else if (stock.recommendation === 'Hold') {
      advice.push(`Consider maintaining current position with ${stock.suggestedInvestment.toLocaleString()} allocation.`);
      advice.push('Monitor for better entry opportunities.');
    } else {
      advice.push('Current market conditions suggest caution.');
      advice.push(`Reduced allocation of ${stock.suggestedInvestment.toLocaleString()} recommended.`);
    }

    if (stock.riskLevel === 'High') {
      advice.push('High volatility requires careful position sizing.');
    } else if (stock.riskLevel === 'Low') {
      advice.push('Low risk profile suitable for conservative portfolios.');
    }

    return advice;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{stock.symbol}</h2>
              <p className="text-gray-600">{stock.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Price and Change */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Current Price</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">${stock.price.toFixed(2)}</div>
              <div className={`flex items-center gap-1 mt-2 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-medium">
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Market Cap</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stock.marketCap}</div>
              <div className="text-sm text-gray-600 mt-2">Volume: {stock.volume}</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">Analyst Rating</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stock.analystRating}/5.0</div>
              <div className="text-sm text-gray-600 mt-2">Sector: {stock.sector}</div>
            </div>
          </div>

          {/* Recommendation */}
          <div className={`bg-gradient-to-r ${getRecommendationColor(stock.recommendation)} rounded-2xl p-8`}>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Investment Recommendation</h3>
              <div className="text-4xl font-bold mb-4">{stock.recommendation}</div>
              <div className="flex items-center justify-center gap-6 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Suggested: ${stock.suggestedInvestment.toLocaleString()}
                </div>
                <div className={`px-3 py-1 rounded-full ${getRiskColor(stock.riskLevel)} text-xs font-medium`}>
                  {stock.riskLevel === 'High' && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                  {stock.riskLevel} Risk
                </div>
              </div>
            </div>
          </div>

          {/* Investment Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Investment Advice
              </h4>
              <ul className="space-y-3">
                {getInvestmentAdvice(stock).map((advice, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Key Metrics
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Risk Level</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(stock.riskLevel)}`}>
                    {stock.riskLevel}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Analyst Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{stock.analystRating}/5.0</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Daily Volume</span>
                  <span className="font-medium">{stock.volume}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sector</span>
                  <span className="font-medium">{stock.sector}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm font-medium">
                📊 This platform provides investment advice and analysis only. 
                Please consult with your broker or financial advisor to execute trades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;