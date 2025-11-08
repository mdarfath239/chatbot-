# 🤖 AI-Powered Chatbot with Web Search

A modern, full-stack chatbot application that combines the power of Groq's LLM with real-time web search capabilities using Tavily API. The project features both a command-line interface and a beautiful web interface with ChatGPT-style design.

## 🌟 Features

- **AI-Powered Conversations**: Built with Groq's Llama 3.1 8B instant model
- **Real-time Web Search**: Integrated with Tavily API for current information
- **Dual Interface**: Both CLI and web-based chat interfaces
- **Modern UI**: ChatGPT-inspired design with Tailwind CSS
- **Conversation Memory**: Built-in caching system for context retention
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** with ES6 modules
- **Groq SDK** for AI model integration
- **Tavily API** for web search functionality
- **Express.js** for web server
- **Node-cache** for conversation memory

### Frontend
- **HTML5** with modern semantic markup
- **Tailwind CSS** via CDN for styling
- **Vanilla JavaScript** for interactivity
- **Fetch API** for backend communication

### Development Tools
- **dotenv** for environment variable management
- **CORS** for cross-origin resource sharing

## 📁 Project Structure

```
chatbot/
├── app.js                    # Standalone CLI chatbot
├── server.js                 # CLI chatbot with readline interface
├── package.json              # Main project dependencies
├── .env                      # Environment variables (API keys)
├── frontend/                 # Web interface
│   ├── index.html           # Main HTML structure
│   ├── app.js               # Frontend JavaScript logic
│   ├── chatbot.js           # Backend logic for web interface
│   ├── server.js            # Express server for web interface
│   ├── package.json         # Frontend dependencies
│   └── .env                 # Frontend environment variables
└── README.md                # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Groq API key
- Tavily API key

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd chatbot
```

### 2. Install Dependencies

For the main project:
```bash
npm install
```

For the frontend:
```bash
cd frontend
npm install
```

### 3. Environment Configuration

Create `.env` files in both root and frontend directories:

**Root directory (.env):**
```
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

**Frontend directory (frontend/.env):**
```
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

## 💻 Usage

### Command Line Interface

**Option 1 - Simple CLI (app.js):**
```bash
node app.js
```

**Option 2 - Interactive CLI (server.js):**
```bash
node server.js
```
Type "exit" to quit the interactive chat.

### Web Interface

**Start the frontend server:**
```bash
cd frontend
node server.js
```

**Open your browser and navigate to:**
```
http://localhost:3000
```

The web interface provides:
- ChatGPT-style messaging UI
- Real-time message sending/receiving
- Loading indicators during AI processing
- Responsive design for all devices

## 🔧 API Endpoints

### Web Interface API

**POST /chat**
- **Description**: Send a message to the chatbot
- **Request Body**:
```json
{
  "message": "Your message here"
}
```
- **Response**:
```json
{
  "message": "AI response here"
}
```

## 🎯 Key Features Explained

### Web Search Integration
The chatbot automatically determines when to use web search based on your queries. It can fetch current information about:
- Weather and current events
- Recent news and updates
- Factual information that requires real-time data
- Product information and reviews

### Conversation Memory
The system maintains conversation context using Node-cache, allowing for:
- Contextual follow-up questions
- Personalized responses based on chat history
- Session-based memory (24-hour TTL)

### Error Handling
Both interfaces include comprehensive error handling for:
- API connection issues
- Invalid user inputs
- Network failures
- Rate limiting

## 🔐 Security Considerations

- API keys are stored in environment variables
- CORS is properly configured for the web interface
- Input validation is implemented on both client and server sides
- No sensitive data is logged or stored permanently

## 🚀 Deployment

### Local Development
Both interfaces can run simultaneously on different ports for development and testing.

### Production Deployment
Consider using:
- PM2 for process management
- Nginx for reverse proxy
- Environment-specific configuration
- SSL certificates for HTTPS

## 📝 API Documentation

### Groq API
- **Model**: llama-3.1-8b-instant
- **Features**: Function calling, streaming support
- **Documentation**: [Groq Docs](https://groq.com/docs)

### Tavily API
- **Purpose**: Real-time web search
- **Features**: Structured search results, multiple result formats
- **Documentation**: [Tavily Docs](https://tavily.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

**API Key Errors:**
- Ensure your `.env` files contain valid API keys
- Check that keys have proper permissions

**Port Conflicts:**
- Default ports: 3000 (web interface)
- Change ports in server files if needed

**CORS Issues:**
- Verify CORS configuration in Express server
- Check browser console for specific errors

**Module Import Errors:**
- Ensure Node.js version supports ES6 modules
- Check that all dependencies are installed

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

## 🙏 Acknowledgments

- [Groq](https://groq.com) for providing the AI model
- [Tavily](https://tavily.com) for web search capabilities
- [Tailwind CSS](https://tailwindcss.com) for the beautiful UI framework

---

**Happy Chatting!** 💬✨

For questions or support, please open an issue in the repository.