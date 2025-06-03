# Meta Business Integration Prototype

This prototype was developed to explore seamless messaging integrations across **Facebook**, **Instagram**, and **WhatsApp** using **Meta's Graph API**. Built with **Node.js** and **Express** for the backend and **React** for the frontend, it handles webhook verification, message sending, and event logging for each platform. Environment secrets are securely managed with dotenv.

The project demonstrates real-time two-way communication and is ideal for businesses aiming to unify social messaging workflows. It supports webhook subscriptions and message dispatch via each platform’s Graph API endpoint.

This prototype was tested with a connected **Instagram Business Account**, a **Facebook Page**, and **WhatsApp Business API**, configured through **Meta for Developers**.

> This project was built for experimental and learning purposes around Meta's unified messaging platform.

## How to Set Up

### 1. Clone the Repository

```bash
git clone https://github.com/RadithSandeepa/meta-business-integration-prototype.git
```

### 2. Backend Setup

- Navigate to the backend directory:
  
  ```bash
  cd backend
  ```

- Create a .env file based on .env.example:

  ```bash
  cp .env.example .env
  ```

- Fill in the following variables in your .env file:

  ```bash
  PORT=5000
  FB_PAGE_ID=your_facebook_page_id
  FB_ACCESS_TOKEN=your_facebook_page_access_token
  
  IG_BUSINESS_ID=your_instagram_business_account_id
  IG_ACCESS_TOKEN=your_instagram_access_token
  
  PHONE_NUMBER_ID=your_whatsapp_phone_number_id
  ACCESS_TOKEN=your_whatsapp_access_token
  
  VERIFY_TOKEN=your_custom_webhook_verify_token
  ```

- Install dependencies and start the server:

  ```bash
  npm install
  npm start
  ```

### 3. Setup Ngrok (for Webhook Testing)

- Install ngrok from https://ngrok.com/download
- Start ngrok on your backend port:

  ```bash
  ngrok http 5000
  ```

- Copy the HTTPS forwarding URL shown by ngrok (e.g., https://random-id.ngrok-free.app) and use it to register webhook URLs in the Meta Developer portal.

### 4. Meta Business Platform Setup  

- Go to [Meta for Developers](https://developers.facebook.com/)
- Create a new App or use an existing one
- Add **Messenger, Instagram Graph API, and WhatsApp Business** API under "Add Products"
- Link your Facebook Page and ensure your Instagram Business Account is connected to that page via Instagram settings
- Under Messenger, Instagram, and WhatsApp, configure Webhooks:
  
  ```
  Use your ngrok URL + appropriate route (e.g., https://your-ngrok-url/webhook/facebook)
  ```

- Verify your webhook using the VERIFY_TOKEN in your .env
- Subscribe to the following fields:
  
  ```
  Messenger: messages, messaging_postbacks
  Instagram: messages
  WhatsApp : messages
  ```

- Generate Long-Lived Access Tokens via the Graph API Explorer or Business Settings
- Test messaging from Facebook/Instagram DMs or WhatsApp to see webhook data in logs. Also, set up your frontend accordingly to send messages too.

















