# Gemini Username & Password Generator (Gemini Credentia)

A simple PWA that generates a unique username and a strong 12-character password using the Gemini API.

## Features

- Generates a unique username and a strong password with one click
- Copy-to-clipboard functionality for both username and password
- Clean, responsive UI
- Works offline as a Progressive Web App (PWA)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/ai-gemini-pwa.git
   cd ai-gemini-pwa
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up your API key:**

   - Create a `.env` file in the root directory (if not present).
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your-own-api-key-here
     ```

   **Note:** You must use your own Gemini API key for the app to work.

4. **Start the server:**
   ```sh
   npm start
   ```

5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.env
package.json
server.js
public/
  app.js
  icon.png
  index.html
  manifest.json
  service-worker.js
  style.css
```

- `server.js`: Express backend that proxies requests to the Gemini API.
- `public/`: Frontend assets and PWA files.

