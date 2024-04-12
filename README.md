<h1 align="center">Ugurly</h1>
<p align="center">Shorten Your URL, Expand Your Possibilities (LOL)</p>

<p align="center">
    <a href="#-features"><kbd>🔥 Features</kbd></a>
    <a href="#-getting-started"><kbd>🚀 Getting Started</kbd></a>
</p>

## ⚡ Introduction

**Ugurly** (available at [ugurly.vercel.app](https://ugurly.vercel.app)) is a free, open-source URL shortening service. It offers URL statistics, a versatile API, and customization features such as custom slugs, password protection, and link lifespan management.

## 🔥 Features

- **Custom Slugs**: Create personalized slugs for your URLs 🎯
- **Emoji Slugs**: Use emojis as slugs for fun and uniqueness 😃
- **Password Protection**: Secure your URLs with passwords 🔒
- **Click Limit**: Control the maximum number of clicks on your URLs 📈
- **URL Statistics**: Access detailed statistics for your shortened URLs 📊
- **API**: Utilize a free and open-source API for URL shortening and analytics 🛠️
- **Open Source**: Ugurly is open-source and free to use 📖
- **Ad-Free**: No ads, no tracking, no distractions 🚫
- **Completely Free**: No hidden costs, premium plans, or restrictions 💸
- **Self-Hosting**: Deploy Ugurly on your own server for complete control 🏠

## 📌 Endpoints

To access a shortened URL, use the basic structure: `https://ugurly.vercel.app/r/:short-code`

Example: `https://ugurly.vercel.app/r/google`

### 🔐 Accessing Password-Protected URLs

For password-protected URLs, follow the same structure. You'll be redirected to a password entry page.

Example: `https://ugurly.vercel.app/r/google-protected`
Password: `1234`

To bypass the password entry page, append the password as a URL parameter:
- `https://ugurly.vercel.app/r/<short_code>?password=<password>`
- `https://ugurly.vercel.app/r/google-protected?password=1234`

## 🛠️ API Documentation

**Note:** All API routes are protected. Obtain your API key from [Ugurly Settings](https://ugurly.vercel.app/dashboard/settings).

Base URL: `https://ugurly.vercel.app/api/v1`
Required Headers:
| Header        | Description            | Required |
| ------------- | ---------------------- | -------- |
| Authorization | Your API key (Bearer API_KEY) | Yes      |

### Create a Short URL

Endpoint: `https://ugurly.vercel.app/api/v1/url/create`
Method: POST

| Payload   | Data Type | Description                          | Required |
| --------- | --------- | ------------------------------------ | -------- |
| url       | String    | Long URL to be shortened              | Yes      |
| slug      | String    | Custom alias for the shortened URL    | No       |
| password  | String    | Password for accessing the URL         | No       |
| maxClicks | Number    | Maximum allowed clicks for the URL    | No       |

### Get URL Stats & Info

Endpoint: `https://ugurly.vercel.app/api/v1/url/:url-id` (Use ID, not slug)
Method: GET

### Delete URL

Endpoint: `https://ugurly.vercel.app/api/v1/url/delete/:url-id` (Use ID, not slug)
Method: DELETE

### Get All URLs Created by the User

Endpoint: `https://ugurly.vercel.app/api/v1/urls`
Method: GET

| URLQueryParam | Data Type | Description                   | Required |
| ------------- | --------- | ----------------------------- | -------- |
| limit         | Number    | Page size for results          | No       |
| cursor        | String    | Starting cursor for pagination | No       |

## 🚀 How to Self-Host

### 📋 Prerequisites

- [TursoDB](https://turso.tech/app) 🌿

### 📂 Clone the Repository

### 📦 Install Dependencies

```bash
npm install
```

### Rename `.env.example` to `.env`

```bash
mv .env.example .env
```

### ➕ Add Environment Variables to `.env` File

```bash
TURSO_DATABASE_URL="libsql://db-name-user.turso.io"
TURSO_AUTH_TOKEN="longtoken"

# Next Auth
# Generate a new secret:
# openssl rand -base64 32
# NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```

### 🚀 Start the Server

```bash
npm run dev
```

### 🌐 Access the Server

Open your browser and go to `http://localhost:3000` to use your self-hosted **Ugurly** URL shortener.

---

<h6 align="center">
© ugurly.vercel.app . 2024
All Rights Reserved</h6>
