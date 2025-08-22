# InvestPro - Real-Time Stock Advisory Platform

A professional stock advisory platform built with React, TypeScript, and Tailwind CSS that provides real-time stock data, AI-powered investment analysis, and intelligent chatbot assistance for investment guidance.

## 🚀 Features

### Real-Time Stock Data
- Live stock prices from Alpha Vantage API
- Real-time market indices (S&P 500, NASDAQ, DOW JONES)
- Automatic data refresh every 5 minutes
- Volume, market cap, and sector information

### AI-Powered Investment Analysis
- Intelligent stock recommendations (Strong Buy, Buy, Hold, Sell, Strong Sell)
- Risk assessment (Low, Medium, High)
- Suggested allocation amounts based on market analysis
- Analyst ratings calculated from multiple factors

### Interactive Features
- Advanced stock filtering and sorting
- Search functionality across stocks and companies
- Detailed stock information modals
- Responsive design for all devices

### AI Investment Chatbot
- **Powered by Google's Gemini AI** for intelligent responses
- Real-time stock analysis with AI-driven insights
- Personalized investment advice and guidance
- Advanced market sentiment analysis
- Natural language processing for complex queries
- Context-aware responses using live market data

### Advisory Focus
- **Educational and informational purposes only**
- **No actual trading or investment execution**
- **Professional analysis and recommendations**
- **Guidance for informed decision-making**

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Alpha Vantage (real-time stock data)
- **Build Tool**: Vite
- **HTTP Client**: Fetch API

## 📊 Stock Analysis Algorithm

The platform uses a sophisticated algorithm that considers:

- **Price Momentum**: Recent price changes and trends
- **Volatility (Beta)**: Stock volatility compared to market
- **Sector Analysis**: Technology, healthcare, financial sectors
- **Market Capitalization**: Company size and stability
- **Risk Assessment**: Comprehensive risk scoring

## 🔧 Setup Instructions

### 1. Get API Keys

**Alpha Vantage (Stock Data):**
1. Visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Sign up for a free API key
3. Replace `'demo'` in `src/services/stockApi.ts` with your API key:

```typescript
private readonly API_KEY = 'YOUR_API_KEY_HERE';
```

**Google Gemini AI (Chatbot):**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini
3. Replace the demo key in `src/services/geminiApi.ts`:

```typescript
const API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
- to stop the server type (control + "c")

## 📈 Tracked Stocks

The platform currently tracks these major stocks:
- **AAPL** - Apple Inc.
- **GOOGL** - Alphabet Inc.
- **MSFT** - Microsoft Corporation
- **TSLA** - Tesla, Inc.
- **AMZN** - Amazon.com Inc.
- **NVDA** - NVIDIA Corporation
- **JPM** - JPMorgan Chase & Co.
- **JNJ** - Johnson & Johnson
- **V** - Visa Inc.
- **WMT** - Walmart Inc.

## 🤖 AI Chatbot Capabilities

The Gemini AI-powered chatbot provides:
- **Advanced AI Analysis**: Powered by Google's Gemini model
- **Real-time Market Intelligence**: Live data integration
- **Personalized Advice**: Tailored to your investment goals
- **Complex Query Handling**: Natural language understanding
- **Risk Assessment**: AI-driven risk analysis
- **Portfolio Optimization**: Smart diversification strategies

### Example Queries:
- "Analyze Tesla's performance and give me your recommendation"
- "What's the best investment strategy for a conservative portfolio?"
- "How do current market conditions affect tech stocks?"
- "Should I buy Apple now or wait for a better entry point?"
- "Explain the risks of investing in NVIDIA right now"

## 🔄 Data Refresh

- **Stock Data**: Refreshes every 5 minutes
- **Market Indices**: Refreshes every 2 minutes
- **Manual Refresh**: Available via retry button on errors

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## ⚠️ Important Notes

- **API Limits**: Free Alpha Vantage accounts have rate limits
- **Demo Mode**: Uses 'demo' key by default with limited data
- **Investment Disclaimer**: All recommendations are for educational purposes only
- **Real-Time Data**: Actual real-time data requires valid API key

## 🚀 Production Deployment

For production deployment:
1. Obtain a premium Alpha Vantage API key
2. Update the API key in the configuration
3. Build the project: `npm run build`
4. Deploy the `dist` folder to your hosting provider

## 📄 License

This project is for educational and demonstration purposes. Please ensure compliance with Alpha Vantage's terms of service when using their API.