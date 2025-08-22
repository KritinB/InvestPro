interface AlphaVantageQuote {
  '01. symbol': string;
  '02. open': string;
  '03. high': string;
  '04. low': string;
  '05. price': string;
  '06. volume': string;
  '07. latest trading day': string;
  '08. previous close': string;
  '09. change': string;
  '10. change percent': string;
}

interface AlphaVantageOverview {
  Symbol: string;
  Name: string;
  MarketCapitalization: string;
  PERatio: string;
  DividendYield: string;
  EPS: string;
  Beta: string;
  Sector: string;
  Industry: string;
  Description: string;
}

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
  beta: number;
  peRatio: string;
  eps: string;
}

class StockApiService {
  private readonly API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo';
  private readonly BASE_URL = 'https://www.alphavantage.co/query';

  // Popular stocks to track
  private readonly STOCK_SYMBOLS = [
    'AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 
    'NVDA', 'JPM', 'JNJ', 'V', 'WMT'
  ];

  // Mock data for when API fails or demo key is used
  private readonly MOCK_STOCKS: StockData[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 175.43,
      change: 2.15,
      changePercent: 1.24,
      volume: '45.2M',
      marketCap: '2.8T',
      sector: 'Technology',
      beta: 1.2,
      peRatio: '28.5',
      eps: '6.15'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 142.56,
      change: -1.23,
      changePercent: -0.85,
      volume: '28.7M',
      marketCap: '1.8T',
      sector: 'Technology',
      beta: 1.1,
      peRatio: '25.3',
      eps: '5.61'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 378.85,
      change: 4.67,
      changePercent: 1.25,
      volume: '32.1M',
      marketCap: '2.8T',
      sector: 'Technology',
      beta: 0.9,
      peRatio: '32.1',
      eps: '11.78'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      price: 248.42,
      change: -8.34,
      changePercent: -3.25,
      volume: '89.5M',
      marketCap: '789.2B',
      sector: 'Consumer Discretionary',
      beta: 2.1,
      peRatio: '65.4',
      eps: '3.80'
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 155.89,
      change: 1.78,
      changePercent: 1.15,
      volume: '41.3M',
      marketCap: '1.6T',
      sector: 'Consumer Discretionary',
      beta: 1.3,
      peRatio: '45.2',
      eps: '3.45'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 875.28,
      change: 15.67,
      changePercent: 1.82,
      volume: '52.8M',
      marketCap: '2.2T',
      sector: 'Technology',
      beta: 1.7,
      peRatio: '68.9',
      eps: '12.70'
    },
    {
      symbol: 'JPM',
      name: 'JPMorgan Chase & Co.',
      price: 178.45,
      change: -0.89,
      changePercent: -0.50,
      volume: '12.4M',
      marketCap: '523.1B',
      sector: 'Financial Services',
      beta: 1.1,
      peRatio: '12.8',
      eps: '13.95'
    },
    {
      symbol: 'JNJ',
      name: 'Johnson & Johnson',
      price: 162.34,
      change: 0.45,
      changePercent: 0.28,
      volume: '8.9M',
      marketCap: '428.7B',
      sector: 'Healthcare',
      beta: 0.7,
      peRatio: '15.6',
      eps: '10.40'
    },
    {
      symbol: 'V',
      name: 'Visa Inc.',
      price: 267.89,
      change: 3.21,
      changePercent: 1.21,
      volume: '6.7M',
      marketCap: '567.8B',
      sector: 'Financial Services',
      beta: 1.0,
      peRatio: '32.4',
      eps: '8.27'
    },
    {
      symbol: 'WMT',
      name: 'Walmart Inc.',
      price: 165.42,
      change: -1.12,
      changePercent: -0.67,
      volume: '15.3M',
      marketCap: '534.2B',
      sector: 'Consumer Staples',
      beta: 0.5,
      peRatio: '26.8',
      eps: '6.18'
    }
  ];

  async getQuote(symbol: string): Promise<AlphaVantageQuote | null> {
    try {
      console.log(`Fetching quote for ${symbol} with API key: ${this.API_KEY.substring(0, 8)}...`);
      const response = await fetch(
        `${this.BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.API_KEY}`
      );
      
      if (!response.ok) {
        console.error(`HTTP error for ${symbol}: ${response.status} ${response.statusText}`);
        return null;
      }
      
      const data = await response.json();
      
      // Check for API error messages
      if (data['Error Message']) {
        console.error(`API error for ${symbol}:`, data['Error Message']);
        return null;
      }
      
      if (data['Note']) {
        console.warn(`API rate limit for ${symbol}:`, data['Note']);
        return null;
      }
      
      if (data['Global Quote']) {
        console.log(`Successfully fetched quote for ${symbol}: $${data['Global Quote']['05. price']}`);
        return data['Global Quote'];
      }
      
      console.warn(`No quote data in response for ${symbol}:`, data);
      return null;
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
      return null;
    }
  }

  async getCompanyOverview(symbol: string): Promise<AlphaVantageOverview | null> {
    try {
      const response = await fetch(
        `${this.BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${this.API_KEY}`
      );
      const data = await response.json();
      
      if (data.Symbol) {
        return data;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching overview for ${symbol}:`, error);
      return null;
    }
  }

  async getStockData(symbol: string): Promise<StockData | null> {
    try {
      const [quote, overview] = await Promise.all([
        this.getQuote(symbol),
        this.getCompanyOverview(symbol)
      ]);

      if (!quote) {
        console.warn(`No quote data received for ${symbol}`);
        return null;
      }

      // If overview fails, use fallback data but still process the quote
      const fallbackOverview = {
        Name: this.getCompanyName(symbol),
        MarketCapitalization: '0',
        Sector: 'Unknown',
        Beta: '1.0',
        PERatio: 'N/A',
        EPS: 'N/A'
      };

      const companyData = overview || fallbackOverview;

      return {
        symbol: quote['01. symbol'],
        name: companyData.Name || symbol,
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: this.formatVolume(quote['06. volume']),
        marketCap: this.formatMarketCap(companyData.MarketCapitalization),
        sector: companyData.Sector || 'Unknown',
        beta: parseFloat(companyData.Beta) || 1.0,
        peRatio: companyData.PERatio || 'N/A',
        eps: companyData.EPS || 'N/A'
      };
    } catch (error) {
      console.error(`Error processing stock data for ${symbol}:`, error);
      return null;
    }
  }

  async getAllStocks(): Promise<StockData[]> {
    try {
      // Try to fetch real data first
      const promises = this.STOCK_SYMBOLS.map(symbol => this.getStockData(symbol));
      const results = await Promise.all(promises);
      const validResults = results.filter((stock): stock is StockData => stock !== null);
      
      // If we got some real data, return it
      if (validResults.length > 0) {
        console.log(`Successfully fetched ${validResults.length} real stock prices`);
        return validResults;
      }
      
      // If no real data, return mock data with slight randomization
      console.warn('No real stock data received - API may be rate limited or unavailable');
      return this.getMockDataWithVariation();
    } catch (error) {
      console.error('Error fetching stock data, using mock data:', error);
      return this.getMockDataWithVariation();
    }
  }

  private getMockDataWithVariation(): StockData[] {
    // Add slight random variations to mock data to simulate real-time changes
    return this.MOCK_STOCKS.map(stock => ({
      ...stock,
      price: stock.price + (Math.random() - 0.5) * 10, // ±$5 variation
      change: (Math.random() - 0.5) * 8, // ±$4 change
      changePercent: (Math.random() - 0.5) * 4, // ±2% change
    }));
  }

  private formatVolume(volume: string): string {
    const num = parseInt(volume);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return volume;
  }

  private formatMarketCap(marketCap: string): string {
    const num = parseInt(marketCap);
    if (num >= 1000000000000) {
      return `${(num / 1000000000000).toFixed(2)}T`;
    } else if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    return marketCap;
  }

  // Generate AI-powered recommendations based on real data
  generateRecommendation(stock: StockData): {
    recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
    suggestedInvestment: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    analystRating: number;
  } {
    let score = 0;
    let riskScore = 0;

    // Price momentum analysis
    if (stock.changePercent > 2) score += 2;
    else if (stock.changePercent > 0) score += 1;
    else if (stock.changePercent < -2) score -= 2;
    else if (stock.changePercent < 0) score -= 1;

    // Beta analysis (volatility)
    if (stock.beta > 1.5) {
      riskScore += 2;
      score -= 0.5; // High volatility reduces score slightly
    } else if (stock.beta > 1.2) {
      riskScore += 1;
    } else if (stock.beta < 0.8) {
      score += 0.5; // Low volatility is good
    }

    // Sector-based scoring
    const techSectors = ['Technology', 'Communication Services'];
    const defensiveSectors = ['Healthcare', 'Consumer Staples', 'Utilities'];
    
    if (techSectors.includes(stock.sector)) {
      score += 1;
      riskScore += 1;
    } else if (defensiveSectors.includes(stock.sector)) {
      score += 0.5;
      riskScore -= 0.5;
    }

    // Market cap stability
    const marketCapNum = this.parseMarketCap(stock.marketCap);
    if (marketCapNum > 1000000000000) { // > 1T
      score += 1;
      riskScore -= 1;
    } else if (marketCapNum > 100000000000) { // > 100B
      score += 0.5;
    }

    // Determine recommendation
    let recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
    if (score >= 3) recommendation = 'Strong Buy';
    else if (score >= 1.5) recommendation = 'Buy';
    else if (score >= -1) recommendation = 'Hold';
    else if (score >= -2.5) recommendation = 'Sell';
    else recommendation = 'Strong Sell';

    // Determine risk level
    let riskLevel: 'Low' | 'Medium' | 'High';
    if (riskScore <= 0) riskLevel = 'Low';
    else if (riskScore <= 2) riskLevel = 'Medium';
    else riskLevel = 'High';

    // Calculate suggested investment based on recommendation and risk
    let baseInvestment = 2000;
    if (recommendation === 'Strong Buy') baseInvestment = 3500;
    else if (recommendation === 'Buy') baseInvestment = 2500;
    else if (recommendation === 'Hold') baseInvestment = 1500;
    else if (recommendation === 'Sell') baseInvestment = 500;
    else baseInvestment = 0;

    // Adjust for risk
    if (riskLevel === 'High') baseInvestment *= 0.8;
    else if (riskLevel === 'Low') baseInvestment *= 1.2;

    // Generate analyst rating (1-5 scale)
    const analystRating = Math.max(1, Math.min(5, 3 + (score * 0.5)));

    return {
      recommendation,
      suggestedInvestment: Math.round(baseInvestment),
      riskLevel,
      analystRating: Math.round(analystRating * 10) / 10
    };
  }

  private parseMarketCap(marketCap: string): number {
    const num = parseFloat(marketCap);
    if (marketCap.includes('T')) return num * 1000000000000;
    if (marketCap.includes('B')) return num * 1000000000;
    if (marketCap.includes('M')) return num * 1000000;
    return num;
  }

  // Get market indices data
  async getMarketIndices() {
    try {
      // If using demo key or no API key, skip API calls and use mock data
      if (this.isUsingMockData()) {
        console.warn('Using mock market indices data - no valid API key configured');
        return this.getMockIndicesData();
      }
      
      // Try to fetch real indices data with timeout
      const indices = ['SPY', 'QQQ', 'DIA'];
      const promises = indices.map(symbol => 
        Promise.race([
          this.getQuote(symbol),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 5000)
          )
        ])
      );
      
      const results = await Promise.allSettled(promises);
      const validResults = results
        .map((result, index) => {
          if (result.status === 'rejected' || !result.value) return null;
          
          const quote = result.value;
          const names = ['S&P 500', 'NASDAQ', 'DOW JONES'];
          return {
            name: names[index],
            value: parseFloat(quote['05. price']).toFixed(2),
            change: quote['09. change'],
            changePercent: quote['10. change percent'],
            isPositive: parseFloat(quote['09. change']) >= 0
          };
        })
        .filter(Boolean);
      
      // If we got some real data, return it
      if (validResults.length > 0) {
        return validResults;
      }
      
      // If no real data, fall back to mock data
      console.warn('No valid market indices data received, using mock data');
      return this.getMockIndicesData();
    } catch (error) {
      console.error('Error fetching market indices:', error);
      return this.getMockIndicesData();
    }
  }

  private getMockIndicesData() {
    const baseData = [
      { name: 'S&P 500', value: 4567.89, change: 23.45 },
      { name: 'NASDAQ', value: 14234.56, change: 89.12 },
      { name: 'DOW JONES', value: 34789.23, change: -45.67 }
    ];
    
    return baseData.map(index => {
      const variation = (Math.random() - 0.5) * 100;
      const newValue = index.value + variation;
      const newChange = index.change + (Math.random() - 0.5) * 20;
      const changePercent = (newChange / newValue) * 100;
      
      return {
        name: index.name,
        value: newValue.toFixed(2),
        change: newChange > 0 ? `+${newChange.toFixed(2)}` : newChange.toFixed(2),
        changePercent: `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
        isPositive: newChange >= 0
      };
    });
  }

  // Check if using real API or mock data
  isUsingMockData(): boolean {
    return this.API_KEY === 'demo' || !this.API_KEY || this.API_KEY === 'your-alpha-vantage-api-key-here';
  }

  // Get company name fallback
  private getCompanyName(symbol: string): string {
    const companyNames: { [key: string]: string } = {
      'AAPL': 'Apple Inc.',
      'GOOGL': 'Alphabet Inc.',
      'MSFT': 'Microsoft Corporation',
      'TSLA': 'Tesla, Inc.',
      'AMZN': 'Amazon.com Inc.',
      'NVDA': 'NVIDIA Corporation',
      'JPM': 'JPMorgan Chase & Co.',
      'JNJ': 'Johnson & Johnson',
      'V': 'Visa Inc.',
      'WMT': 'Walmart Inc.'
    };
    return companyNames[symbol] || symbol;
  }
}

export const stockApi = new StockApiService();
export type { StockData };