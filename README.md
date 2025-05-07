# Skillpath.ai Website

This repository contains the code for the Skillpath.ai website, a professional coaching platform that uses AI to provide personalized coaching pathways.

## Chatbot Webhook Integration

The website includes a chatbot component that integrates with an n8n webhook to process user messages. The webhook URL is:

```
https://primary-production-3b968.up.railway.app/webhook-test/1ba9063c-4576-4874-9000-20d44594127f
```

### CORS Solution

The chatbot implementation includes a solution for handling CORS (Cross-Origin Resource Sharing) issues when connecting to the webhook. The solution uses a series of public CORS proxies to route the webhook requests.

#### How it works

1. When a user sends a message through the chatbot, the code attempts to send the message through a series of public CORS proxies.
2. If one proxy fails, it automatically tries the next one.
3. If all proxies fail, it attempts a direct request as a last resort.

#### Long-term solutions

For a production environment, consider implementing one of these more robust solutions:

1. **Configure CORS on the webhook server** (recommended): Ask the webhook provider to enable CORS for your domain.
2. **Create a server-side proxy**: Implement your own proxy server that forwards requests to the webhook.
3. **Use a serverless function**: Deploy a serverless function that acts as a proxy.

See the `cors-solution.html` page for more detailed information about these options.

## Testing the Webhook Integration

Several test pages are included to help test and debug the webhook integration:

- `webhook-test.html`: A simple test page for sending messages to the webhook
- `webhook-diagnostics.html`: A more advanced diagnostic tool for testing different request configurations
- `webhook-proxy.html`: A test page that demonstrates using different CORS proxies
- `minimal-webhook-test.html`: A minimal implementation for testing the webhook
- `cors-solution.html`: Documentation about the CORS issue and solutions

## Running the Website Locally

To run the website locally, you can use any simple HTTP server. For example:

### Using Python

```bash
python -m http.server 8000
```

Then open your browser and navigate to `http://localhost:8000`.

### Using Node.js

First, install the http-server package:

```bash
npm install -g http-server
```

Then run the server:

```bash
http-server -p 8000
```

## Website Structure

- `index.html`: Main landing page
- `solutions.html`: Solutions page
- `how-it-works.html`: How It Works page
- `chatbot.js`: Chatbot implementation
- `main.js`: Main JavaScript file for the website
- `styles.css`: CSS styles for the website

## Chatbot Configuration

The chatbot is initialized with the following configuration:

```javascript
const chatbot = new SkillpathChatbot({
    position: 'bottom-right',
    title: 'Skillpath Assistant',
    welcomeMessage: 'Hello! 👋 I\'m your AI coaching assistant. How can I help with your professional development today?',
    webhookUrl: 'https://primary-production-3b968.up.railway.app/webhook-test/1ba9063c-4576-4874-9000-20d44594127f',
    primaryColor: '#00b3b0',
    secondaryColor: '#1a3c6e'
});
```

You can customize these options as needed.

## Webhook Data Format

The chatbot sends the following data to the webhook:

```json
{
  "message": "User's message",
  "timestamp": "2023-07-20T12:34:56.789Z",
  "sessionId": "unique_session_id",
  "source": "page_url",
  "userAgent": "browser_user_agent"
}
```

The webhook is expected to return a response in the following format:

```json
{
  "response": "Response message to display to the user"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
