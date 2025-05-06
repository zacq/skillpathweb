# Skillpath.ai Chatbot - n8n Webhook Setup Guide

This guide explains how to set up an n8n webhook to connect with the Skillpath.ai chatbot.

## Prerequisites

1. An n8n instance running (either self-hosted or using n8n.cloud)
2. Basic knowledge of n8n workflows
3. Access to the Skillpath.ai website codebase

## Setting Up the n8n Webhook

### Step 1: Create a New Workflow in n8n

1. Log in to your n8n instance
2. Click on "Workflows" in the sidebar
3. Click the "+ Create Workflow" button
4. Name your workflow (e.g., "Skillpath Chatbot Handler")

### Step 2: Add a Webhook Trigger Node

1. Click the "+" button to add a node
2. Search for "Webhook" and select it
3. Configure the Webhook node:
   - Method: POST
   - Path: /skillpath-chatbot (or any path you prefer)
   - Authentication: Optional (you can add Basic Auth for security)
   - Response Mode: Last Node

4. Click "Execute Node" to activate the webhook
5. Copy the webhook URL (you'll need this for the chatbot configuration)

### Step 3: Process the Incoming Message

1. Add a "Function" node after the Webhook node
2. Connect the Webhook node to the Function node
3. In the Function node, add code to process the incoming message:

```javascript
// Example function to process the incoming message
return [
  {
    json: {
      // Extract the message from the incoming webhook data
      receivedMessage: $input.item.json.message,
      sessionId: $input.item.json.sessionId,
      timestamp: $input.item.json.timestamp,
      
      // Generate a response (this is where you can add your custom logic)
      response: processMessage($input.item.json.message)
    }
  }
];

// Simple function to generate responses based on keywords
function processMessage(message) {
  message = message.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi')) {
    return "Hello! How can I help you with your professional development today?";
  }
  else if (message.includes('coaching') || message.includes('coach')) {
    return "Our AI-powered coaching platform provides personalized guidance to help you develop your professional skills. Would you like to learn more about our coaching approach?";
  }
  else if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
    return "We offer flexible pricing plans for individuals, teams, and organizations. Would you like me to provide more details about our pricing options?";
  }
  else if (message.includes('skill') || message.includes('learn') || message.includes('develop')) {
    return "Skillpath.ai offers personalized skill development pathways based on your current abilities and career goals. Our AI assessment identifies your strengths and areas for improvement.";
  }
  else if (message.includes('demo') || message.includes('try')) {
    return "I'd be happy to arrange a demo for you! Please provide your email address, and our team will contact you to schedule a personalized demonstration.";
  }
  else {
    return "Thank you for your message. How else can I assist you with your professional development journey?";
  }
}
```

### Step 4: Return the Response

1. Add a "Respond to Webhook" node after the Function node
2. Connect the Function node to the Respond to Webhook node
3. Configure the Respond to Webhook node:
   - Response Code: 200
   - Response Data: JSON
   - Property Name: json

### Step 5: Save and Activate the Workflow

1. Click the "Save" button to save your workflow
2. Make sure the workflow is active (toggle the activation switch if needed)

## Connecting the Webhook to the Chatbot

1. Open your website codebase
2. Locate the chatbot initialization code in your HTML files
3. Replace the placeholder webhook URL with your actual n8n webhook URL:

```javascript
const chatbot = new SkillpathChatbot({
    // Other options...
    webhookUrl: 'https://your-n8n-instance.com/webhook/skillpath-chatbot',
    // Other options...
});
```

## Advanced Configuration (Optional)

### Adding Authentication to Your Webhook

For added security, you can add authentication to your webhook:

1. In the Webhook node settings, enable "Authentication"
2. Choose "Basic Auth" and set a username and password
3. Update your chatbot code to include these credentials:

```javascript
sendToWebhook(message) {
    // ...
    fetch(this.options.webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('username:password')
        },
        body: JSON.stringify({
            message: message,
            timestamp: new Date().toISOString(),
            sessionId: this.getSessionId()
        })
    })
    // ...
}
```

### Integrating with External Services

You can enhance your chatbot by connecting your n8n workflow to external services:

1. **AI Services**: Connect to OpenAI or other AI services for more sophisticated responses
2. **CRM Systems**: Log conversations in your CRM
3. **Email Services**: Send follow-up emails based on chat interactions
4. **Database**: Store conversation history for analytics

## Troubleshooting

### Common Issues

1. **Webhook Not Receiving Data**:
   - Verify the webhook URL is correct
   - Check for CORS issues (you may need to add CORS headers to your n8n setup)
   - Ensure your n8n instance is accessible from the internet

2. **Error Responses**:
   - Check the browser console for error messages
   - Verify the JSON structure being sent to the webhook
   - Check n8n execution logs for errors

3. **Webhook Timeout**:
   - Ensure your n8n workflow executes efficiently
   - Consider adding a timeout handler in the chatbot code

## Support

For additional help, contact your development team or refer to the n8n documentation at [https://docs.n8n.io/](https://docs.n8n.io/).
