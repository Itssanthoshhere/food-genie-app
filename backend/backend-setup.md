# Food Genie App Backend — Initial Setup

## Initialize Node.js Project

```bash
npm init -y
```

---

## Install Production Dependencies

### Express & Core Packages

```bash
npm i express dotenv mongoose cors crypto jsonwebtoken bcryptjs nodemailer validator html-to-text cloudinary stripe
```

**Packages Installed**

- Express — Web framework
- Dotenv — Environment variable management
- Mongoose — MongoDB ODM
- CORS — Cross-Origin Resource Sharing
- Crypto — Built-in cryptography module
- JSON Web Token — Authentication & authorization
- bcryptjs — Password hashing
- Nodemailer — Email sending service
- Validator — String validation and sanitization
- html-to-text — Convert HTML to plain text
- Cloudinary — Cloud image and video management
- Stripe — Payment processing

---

## Configure Scripts

Add the following scripts inside `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Recommended (Better DX)

Install:

```bash
npm i -D nodemon
```

---

## Create Source Directory

```bash
touch server.js app.js
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=
```

---

## Run Application

### Development Mode

```bash
npm run dev
```

### Production Mode

Start:

```bash
npm start
```

---

## Current Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- Dotenv

---

## Verify Installation

```bash
node -v
npm -v
```
