<h3 align="center">Ugurly</h3>
<p align="center">Shorten Your Url not Your Possibilities (LOL)</p>

<p align="center">
    <a href="#-features"><kbd>🔥 Features</kbd></a>
    <a href="#-getting-started"><kbd>🚀 Getting Started</kbd></a>
</p>

# ⚡ Introduction

**ugurly.vercel.app** is a free, open-source service for shortening URLs. It offers URL statistics, a free API, and customization options. You can create custom `slugs`, add `password protection`, and manage `link lifespans`.

# 🔥 Features

- `Custom Slugs` - Create custom slugs for your URLs 🎯
- `Emoji Slugs` - Use emojis as slugs for your URLs 😃
- `Password Protection` - Protect your URLs with a password 🔒
- `Link Max Clicks` - Set a maximum number of clicks for your URLs 📈
- `URL Statistics` - View detailed statistics for your URLs 📊
- `Open Source` - ugurly.vercel.app is open-sourced and free to use 📖
- `No Ads` - No ads, no tracking, no nonsense 🚫
- `Absolutely Free` - No hidden costs, no premium plans, no limitations 💸
- `Self Hosting` - You can host spoo.me on your own server 🏠

# 🚀 Getting Started

### 📋 Prerequisites

- [TursoDB]([https://www.mongodb.com/try/download/community](https://turso.tech/app)) 🌿

### 📂 Clone the repository

### 📦 Install dependencies

```bash
bun install
```

### Rename .env.example to .env

```bash
mv .env.example .env
```

### ➕ Adding environment variables to .env file

```bash
TURSO_DATABASE_URL="libsql://db-name-user.turso.io"
TURSO_AUTH_TOKEN="longtoken"


# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
# NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```

### 🚀 Starting the server

```bash
bun dev
```

### 🌐 Access the server

Open your browser and go to `http://localhost:3000` to access the **ugurly** URL shortener.

---

<h6 align="center">
© ugurly.vercel.app . 2024
All Rights Reserved</h6>
