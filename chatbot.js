/**
 * Skillpath.ai - Chatbot Component
 * Author: Augment Agent
 * Version: 1.0
 *
 * This script creates a collapsible chatbot that connects to an n8n webhook
 */

// Add console log for debugging
console.log('Chatbot script loaded');

class SkillpathChatbot {
    constructor(options = {}) {
        console.log('Initializing chatbot with options:', options);

        // Default options
        this.options = {
            position: 'bottom-right',
            title: 'Skillpath Assistant',
            placeholder: 'Type your message here...',
            welcomeMessage: 'Hi there! 👋 How can I help you with your professional development today?',
            webhookUrl: options.webhookUrl || '',
            primaryColor: '#00b3b0',
            secondaryColor: '#1a3c6e',
            ...options
        };

        // Create the chatbot elements
        this.createChatbotElements();

        // Initialize event listeners
        this.initEventListeners();
    }

    createChatbotElements() {
        console.log('Creating chatbot elements');

        // Create main container
        this.container = document.createElement('div');
        this.container.className = `skillpath-chatbot ${this.options.position}`;

        // Create toggle button
        this.toggleButton = document.createElement('button');
        this.toggleButton.className = 'chat-toggle-btn';
        this.toggleButton.innerHTML = '<i class="fas fa-comments"></i>';
        this.toggleButton.style.backgroundColor = this.options.primaryColor;

        // Create chat window
        this.chatWindow = document.createElement('div');
        this.chatWindow.className = 'chat-window';
        this.chatWindow.style.display = 'none';

        // Create chat header
        this.chatHeader = document.createElement('div');
        this.chatHeader.className = 'chat-header';
        this.chatHeader.style.backgroundColor = this.options.primaryColor;

        const chatTitle = document.createElement('h3');
        chatTitle.textContent = this.options.title;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'chat-close-btn';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';

        this.chatHeader.appendChild(chatTitle);
        this.chatHeader.appendChild(closeBtn);

        // Create chat body
        this.chatBody = document.createElement('div');
        this.chatBody.className = 'chat-body';

        // Create chat messages container
        this.messagesContainer = document.createElement('div');
        this.messagesContainer.className = 'chat-messages';

        // Add welcome message
        if (this.options.welcomeMessage) {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'chat-message received';
            welcomeMsg.innerHTML = `<p>${this.options.welcomeMessage}</p>`;
            this.messagesContainer.appendChild(welcomeMsg);
        }

        // Create chat input area
        this.chatInputArea = document.createElement('div');
        this.chatInputArea.className = 'chat-input-area';

        this.chatInput = document.createElement('input');
        this.chatInput.type = 'text';
        this.chatInput.placeholder = this.options.placeholder;

        this.sendButton = document.createElement('button');
        this.sendButton.className = 'chat-send-btn';
        this.sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
        this.sendButton.style.backgroundColor = this.options.primaryColor;

        this.chatInputArea.appendChild(this.chatInput);
        this.chatInputArea.appendChild(this.sendButton);

        // Assemble the chat window
        this.chatBody.appendChild(this.messagesContainer);
        this.chatWindow.appendChild(this.chatHeader);
        this.chatWindow.appendChild(this.chatBody);
        this.chatWindow.appendChild(this.chatInputArea);

        // Add elements to the container
        this.container.appendChild(this.toggleButton);
        this.container.appendChild(this.chatWindow);

        // Add the container to the document
        document.body.appendChild(this.container);

        // Add the necessary styles
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .skillpath-chatbot {
                position: fixed;
                z-index: 1000;
                font-family: var(--body-font, 'Open Sans', sans-serif);
            }

            .skillpath-chatbot.bottom-right {
                bottom: 20px;
                right: 20px;
            }

            .skillpath-chatbot.bottom-left {
                bottom: 20px;
                left: 20px;
            }

            .chat-toggle-btn {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease;
            }

            .chat-toggle-btn:hover {
                transform: scale(1.1);
            }

            .chat-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                background-color: white;
                display: flex;
                flex-direction: column;
            }

            .skillpath-chatbot.bottom-left .chat-window {
                right: auto;
                left: 0;
            }

            .chat-header {
                padding: 15px;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .chat-header h3 {
                margin: 0;
                font-size: 16px;
            }

            .chat-close-btn {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 16px;
            }

            .chat-body {
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 15px;
            }

            .chat-message {
                margin-bottom: 15px;
                max-width: 80%;
                padding: 10px 15px;
                border-radius: 18px;
                position: relative;
                clear: both;
            }

            .chat-message p {
                margin: 0;
                word-wrap: break-word;
            }

            .chat-message.sent {
                background-color: ${this.options.primaryColor};
                color: white;
                float: right;
                border-bottom-right-radius: 5px;
            }

            .chat-message.received {
                background-color: #f1f1f1;
                color: #333;
                float: left;
                border-bottom-left-radius: 5px;
            }

            .chat-input-area {
                display: flex;
                padding: 10px;
                border-top: 1px solid #eee;
            }

            .chat-input-area input {
                flex: 1;
                padding: 10px 15px;
                border: 1px solid #ddd;
                border-radius: 20px;
                outline: none;
                font-size: 14px;
            }

            .chat-send-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: none;
                color: white;
                margin-left: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .typing-indicator {
                display: inline-block;
                padding: 10px 15px;
                background-color: #f1f1f1;
                border-radius: 18px;
                margin-bottom: 15px;
                float: left;
                border-bottom-left-radius: 5px;
            }

            .typing-indicator span {
                height: 8px;
                width: 8px;
                background-color: #999;
                display: inline-block;
                border-radius: 50%;
                margin-right: 5px;
                animation: typing 1.3s infinite;
            }

            .typing-indicator span:nth-child(2) {
                animation-delay: 0.2s;
            }

            .typing-indicator span:nth-child(3) {
                animation-delay: 0.4s;
                margin-right: 0;
            }

            @keyframes typing {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
                100% { transform: translateY(0px); }
            }
        `;
        document.head.appendChild(style);
    }

    initEventListeners() {
        // Toggle chat window
        this.toggleButton.addEventListener('click', () => {
            this.toggleChatWindow();
        });

        // Close chat window
        this.chatHeader.querySelector('.chat-close-btn').addEventListener('click', () => {
            this.closeChatWindow();
        });

        // Send message on button click
        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        // Send message on Enter key
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChatWindow() {
        if (this.chatWindow.style.display === 'none') {
            this.chatWindow.style.display = 'flex';
            this.chatInput.focus();
        } else {
            this.chatWindow.style.display = 'none';
        }
    }

    closeChatWindow() {
        this.chatWindow.style.display = 'none';
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'sent');

        // Clear input
        this.chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Track this message in conversation history
        this.trackMessageInHistory(message, 'user');

        // Send message to webhook
        this.sendToWebhook(message);
    }

    trackMessageInHistory(message, sender) {
        try {
            // Get current session data
            const sessionData = localStorage.getItem('skillpath_chat_session');

            if (sessionData) {
                const parsedData = JSON.parse(sessionData);

                // Initialize conversation array if it doesn't exist
                if (!parsedData.conversation) {
                    parsedData.conversation = [];
                }

                // Add message to conversation history
                parsedData.conversation.push({
                    sender: sender,
                    message: message,
                    timestamp: new Date().toISOString()
                });

                // Limit conversation history to last 20 messages to prevent localStorage from getting too large
                if (parsedData.conversation.length > 20) {
                    parsedData.conversation = parsedData.conversation.slice(-20);
                }

                // Update last activity
                parsedData.lastActivity = Date.now();

                // Save updated session data
                localStorage.setItem('skillpath_chat_session', JSON.stringify(parsedData));

                console.log('Added message to conversation history');
            }
        } catch (error) {
            console.error('Error tracking message in history:', error);
            // Non-critical error, don't disrupt the user experience
        }
    }

    addMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${type}`;
        messageElement.innerHTML = `<p>${message}</p>`;

        this.messagesContainer.appendChild(messageElement);

        // Scroll to bottom
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';

        this.messagesContainer.appendChild(typingIndicator);
        this.scrollToBottom();

        return typingIndicator;
    }

    removeTypingIndicator() {
        const typingIndicator = this.messagesContainer.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    sendToWebhook(message) {
        if (!this.options.webhookUrl) {
            console.error('Webhook URL is not provided');
            this.removeTypingIndicator();
            this.addMessage('Sorry, I cannot process your request at the moment. Please try again later.', 'received');
            return;
        }

        // List of CORS proxies to try (in order of preference)
        const corsProxies = [
            'https://corsproxy.io/?',
            'https://cors-anywhere.herokuapp.com/',
            'https://api.allorigins.win/raw?url='
        ];

        // Start with the first proxy
        this.sendWithProxy(message, 0, corsProxies);
    }

    sendWithProxy(message, proxyIndex, corsProxies) {
        // If we've tried all proxies, try direct request as last resort
        if (proxyIndex >= corsProxies.length) {
            console.log('All proxies failed, trying direct request');
            this.sendDirectRequest(message);
            return;
        }

        const corsProxyUrl = corsProxies[proxyIndex];
        const targetUrl = encodeURIComponent(this.options.webhookUrl);
        const proxyUrl = corsProxyUrl + targetUrl;

        console.log(`Using CORS proxy (${proxyIndex + 1}/${corsProxies.length}):`, proxyUrl);

        // Get session information
        const sessionId = this.getSessionId();

        // Get conversation history if available
        let conversationHistory = [];
        try {
            const sessionData = localStorage.getItem('skillpath_chat_session');
            if (sessionData) {
                const parsedData = JSON.parse(sessionData);
                if (parsedData.conversation && Array.isArray(parsedData.conversation)) {
                    // Get the last 5 messages for context (or fewer if there aren't 5 yet)
                    conversationHistory = parsedData.conversation.slice(-5);
                }
            }
        } catch (error) {
            console.error('Error retrieving conversation history:', error);
        }

        // Prepare the payload with enhanced session data
        const payload = {
            message: message,
            timestamp: new Date().toISOString(),
            session: {
                id: sessionId,
                isNew: sessionId.startsWith('temp_session_') || sessionId.includes('_' + Date.now().toString().substring(0, 8)),
                type: sessionId.startsWith('temp_session_') ? 'temporary' : 'persistent'
            },
            conversation: {
                history: conversationHistory,
                messageCount: conversationHistory.length
            },
            source: window.location.href,
            userAgent: navigator.userAgent,
            pageTitle: document.title,
            referrer: document.referrer || null
        };

        fetch(proxyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest' // Required by some CORS proxies
            },
            mode: 'cors', // Add CORS mode
            credentials: 'omit', // Don't send credentials through proxy
            body: JSON.stringify(payload)
        })
        .then(response => {
            console.log(`Webhook response status: ${response.status} ${response.statusText}`);

            if (!response.ok) {
                // Get the response text to include in the error message
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${text}`);
                });
            }

            // Try to parse as JSON
            return response.json().catch(error => {
                console.error('Error parsing response as JSON:', error);
                throw new Error('Invalid JSON response from webhook');
            });
        })
        .then(data => {
            this.removeTypingIndicator();
            const botResponse = data.response || 'Thank you for your message!';
            this.addMessage(botResponse, 'received');

            // Track bot response in conversation history
            this.trackMessageInHistory(botResponse, 'bot');
        })
        .catch(error => {
            console.error(`Error with proxy ${proxyIndex + 1}/${corsProxies.length}:`, error);

            // Try the next proxy
            this.sendWithProxy(message, proxyIndex + 1, corsProxies);
        });
    }

    sendDirectRequest(message) {
        // Get session information
        const sessionId = this.getSessionId();

        // Get conversation history if available
        let conversationHistory = [];
        try {
            const sessionData = localStorage.getItem('skillpath_chat_session');
            if (sessionData) {
                const parsedData = JSON.parse(sessionData);
                if (parsedData.conversation && Array.isArray(parsedData.conversation)) {
                    // Get the last 5 messages for context (or fewer if there aren't 5 yet)
                    conversationHistory = parsedData.conversation.slice(-5);
                }
            }
        } catch (error) {
            console.error('Error retrieving conversation history:', error);
        }

        // Prepare the payload with enhanced session data
        const payload = {
            message: message,
            timestamp: new Date().toISOString(),
            session: {
                id: sessionId,
                isNew: sessionId.startsWith('temp_session_') || sessionId.includes('_' + Date.now().toString().substring(0, 8)),
                type: sessionId.startsWith('temp_session_') ? 'temporary' : 'persistent'
            },
            conversation: {
                history: conversationHistory,
                messageCount: conversationHistory.length
            },
            source: window.location.href,
            userAgent: navigator.userAgent,
            pageTitle: document.title,
            referrer: document.referrer || null
        };

        fetch(this.options.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors', // Try with CORS mode
            body: JSON.stringify(payload)
        })
        .then(response => {
            console.log(`Direct webhook response status: ${response.status} ${response.statusText}`);

            if (!response.ok) {
                // Get the response text to include in the error message
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${text}`);
                });
            }

            // Try to parse as JSON
            return response.json().catch(error => {
                console.error('Error parsing response as JSON:', error);
                throw new Error('Invalid JSON response from webhook');
            });
        })
        .then(data => {
            this.removeTypingIndicator();
            const botResponse = data.response || 'Thank you for your message!';
            this.addMessage(botResponse, 'received');

            // Track bot response in conversation history
            this.trackMessageInHistory(botResponse, 'bot');
        })
        .catch(error => {
            console.error('All request methods failed:', error);
            this.removeTypingIndicator();

            // Provide more specific error message based on the error type
            let errorMessage = 'Sorry, I cannot process your request at the moment. Please try again later.';

            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                errorMessage = 'Network error: Unable to connect to the server. Please check your internet connection and try again.';
            } else if (error.message.includes('Timeout')) {
                errorMessage = 'Request timed out. The server took too long to respond. Please try again later.';
            } else if (error.message.includes('not ok')) {
                errorMessage = 'The server returned an error. Our team has been notified and is working on a fix.';
            } else if (error.message.includes('CORS')) {
                errorMessage = 'Cross-origin request blocked. Our team has been notified of this issue.';
            }

            this.addMessage(errorMessage, 'received');

            // Track error message in conversation history
            this.trackMessageInHistory(errorMessage, 'error');
        });
    }

    getSessionId() {
        // Generate or retrieve a session ID for conversation tracking
        let sessionId;
        const sessionExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        try {
            // Try to get existing session data from localStorage
            const sessionData = localStorage.getItem('skillpath_chat_session');

            if (sessionData) {
                try {
                    // Parse the session data
                    const parsedData = JSON.parse(sessionData);

                    // Check if session is valid and not expired
                    if (parsedData &&
                        parsedData.id &&
                        parsedData.id.startsWith('session_') &&
                        parsedData.created &&
                        (Date.now() - parsedData.created < sessionExpiry)) {

                        // Valid session found
                        sessionId = parsedData.id;

                        // Update the last activity timestamp
                        parsedData.lastActivity = Date.now();
                        localStorage.setItem('skillpath_chat_session', JSON.stringify(parsedData));

                        console.log('Using existing session:', sessionId);
                    } else {
                        // Session expired or invalid format
                        console.log('Session expired or invalid, creating new session');
                        sessionId = this.createNewSession();
                    }
                } catch (parseError) {
                    // Error parsing JSON, create new session
                    console.error('Error parsing session data:', parseError);
                    sessionId = this.createNewSession();
                }
            } else {
                // No existing session, create new one
                sessionId = this.createNewSession();
            }
        } catch (storageError) {
            // localStorage not available (e.g., private browsing mode)
            console.error('localStorage not available:', storageError);

            // Generate a temporary session ID (won't persist)
            sessionId = 'temp_session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            console.log('Created temporary session (not persistent):', sessionId);
        }

        return sessionId;
    }

    createNewSession() {
        // Generate a new session ID
        const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        // Create session data object
        const sessionData = {
            id: sessionId,
            created: Date.now(),
            lastActivity: Date.now()
        };

        try {
            // Store in localStorage
            localStorage.setItem('skillpath_chat_session', JSON.stringify(sessionData));
            console.log('Created new session:', sessionId);
        } catch (error) {
            console.error('Error storing session data:', error);
        }

        return sessionId;
    }
}

// Export the class
window.SkillpathChatbot = SkillpathChatbot;
