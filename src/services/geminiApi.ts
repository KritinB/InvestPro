import { GoogleGenerativeAI } from '@google/generative-ai';
import { stockApi } from './stockApi';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private apiKeyConfigured: boolean = false;

  constructor() {
    // Try to get API key from environment variables
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (API_KEY && API_KEY !== 'your-api-key-here') {
      this.genAI = new GoogleGenerativeAI(API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      this.apiKeyConfigured = true;
    } else {
      console.warn('Gemini API key not configured. Using fallback responses.');
      this.apiKeyConfigured = false;
    }
  }

  async generateResponse(userMessage: string, stockData: any[]): Promise<string> {
    // If API key is not configured, use fallback immediately
    if (!this.apiKeyConfigured) {
      return this.getFallbackResponse(userMessage, stockData);
    }

    try {
      // Create context with current stock data
      const stockContext = stockData.map(stock => {
        const rec = stockApi.generateRecommendation(stock);
        return `${stock.symbol} (${stock.name}): $${stock.price.toFixed(2)}, ${stock.changePercent > 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%, Sector: ${stock.sector}, Recommendation: ${rec.recommendation}, Risk: ${rec.riskLevel}`;
      }).join('\n');

      const prompt = `
You are an expert AI investment advisor with access to real-time stock market data. Provide professional, accurate, and helpful investment advice.

Current Market Data:
${stockContext}

User Question: ${userMessage}

Guidelines:
- Provide specific, actionable investment advice
- Reference actual stock prices and data when relevant
- Explain your reasoning clearly
- Consider risk tolerance and diversification
- Be professional but conversational
- If asked about specific stocks, use the real data provided
- Always include appropriate disclaimers about investment risks
- Keep responses concise but informative (max 200 words)

Respond as a knowledgeable investment advisor would.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.getFallbackResponse(userMessage, stockData);
    }
  }

  private getFallbackResponse(userMessage: string, stockData: any[]): string {
    const message = userMessage.toLowerCase();
    
    // Fallback responses when Gemini API is unavailable
    if (message.includes('price') || message.includes('current')) {
      const randomStock = stockData[Math.floor(Math.random() * stockData.length)];
      if (randomStock) {
        return `I'm currently experiencing connectivity issues with my AI model, but I can tell you that ${randomStock.symbol} is trading at $${randomStock.price.toFixed(2)} with a ${randomStock.changePercent > 0 ? 'gain' : 'loss'} of ${Math.abs(randomStock.changePercent).toFixed(2)}%. Please try your question again in a moment.`;
      }
    }

    if (message.includes('invest') || message.includes('buy')) {
      const topStocks = stockData
        .map(stock => ({ ...stock, rec: stockApi.generateRecommendation(stock) }))
        .filter(stock => stock.rec.recommendation === 'Strong Buy' || stock.rec.recommendation === 'Buy')
        .slice(0, 3);
      
      if (topStocks.length > 0) {
        const stockList = topStocks.map(s => s.symbol).join(', ');
        return `I'm temporarily using backup analysis. Based on current market data, consider diversifying across: ${stockList}. These show strong fundamentals. Always consult with a financial advisor and consider your risk tolerance. My AI model will be back online shortly.`;
      }
    }

    return "I'm experiencing temporary connectivity issues with my advanced AI model. Please try your question again in a moment, or ask about specific stock prices which I can provide from our real-time data feed.";
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return this.apiKeyConfigured;
  }
}

export const geminiService = new GeminiService();